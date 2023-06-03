from __future__ import annotations

import base64
from io import BytesIO
from typing import Any
import pathlib
import requests
import time

# from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
import faiss
import face_recognition
import numpy as np
import pandas as pd

from search.errors import BaseFaceError, MultipleFaceError, NoFaceError

# Create your views here.

N_RETURN_DATA = 3
Face_index = faiss.read_index("./face_index.bin")
Labels = np.load("./labels.npy")
Df = pd.read_csv("./query.csv")


def download_image(url: str, fs: FileSystemStorage, save_name: str) -> str:
    response = requests.get(url)
    if response.status_code == 200:
        if not pathlib.Path("./temp").exists():
            pathlib.Path("./temp").mkdir()
        with open("temp/" + save_name, "wb") as f:
            f.write(response.content)
        with open("temp/" + save_name, "rb") as f:
            return fs.save(save_name, f)


def img2vec(path: str) -> np.ndarray:
    # load img
    img = face_recognition.load_image_file("temp/" + path)

    # crop img
    face_location = face_recognition.face_locations(img)

    # only one face in img
    if len(face_location) > 1:
        raise MultipleFaceError("Please upload a photo with only one face")
    if len(face_location) <= 0:
        raise NoFaceError("Please upload a photo with at least one face")

    # get feature vector
    face_encode = face_recognition.face_encodings(img, face_location)[0]
    face_encode = face_encode.reshape(-1, 128).astype("float32")
    return face_encode


def label2data(labels: list[int]) -> dict[str, list[dict[str, Any]]]:
    data_list: list[dict[str, Any]] = []
    for _, data in Df.iloc[labels].iterrows():
        # fill nan
        data = data.fillna(-100)
        data_list.append(data.to_dict())

    return {
        "nobel_data": data_list,
    }


@api_view(["POST"])
def search(request):
    if request.method != "POST":
        return JsonResponse(
            {"message": "Please upload a file with POST"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # FILEがあればそれを処理
    if len(request.FILES) >= 1:
        fs = FileSystemStorage(location="temp/")
        file = request.FILES.getlist("image")

        # load file
        if len(file) != 1:
            return JsonResponse(
                {"message": "Please upload only one file"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        filename = fs.save(file[0].name, file[0])
        img_pth = fs.url(filename).split("/")[-1]

    # URLがあればそれを処理
    else:
        img_base64 = request.data.get("url")
        if img_base64 is None:
            return JsonResponse(
                {"message": "Please upload a file or url"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        # データ部分のみ抽出
        image_data = img_base64.split(",")[1]

        # Base64デコード
        decoded_image_data = base64.b64decode(image_data)

        # 画像データをBytesIOオブジェクトに読み込む
        image_buffer = BytesIO(decoded_image_data)

        fs = FileSystemStorage(location="temp/")
        img_pth = fs.save(f"tmp_{time.time()}.png", image_buffer)

    # crop face and get feature vector
    try:
        query = img2vec(img_pth)
    except BaseFaceError as e:
        return JsonResponse({"messgage": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(e)
        return JsonResponse(
            {"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    # search face from index
    _, ids = Face_index.search(query, k=N_RETURN_DATA)
    labels = [Labels[i] for i in ids[0]]

    # get data row from img index
    data = label2data(labels)

    return JsonResponse(data, status=status.HTTP_200_OK)
