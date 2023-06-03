# Nobel laureate face search application

The application takes the user's photo with a webcam and outputs the top three past Nobel Prize winners that resemble the user's face.

## Run application

First, copy docker files and env file.

```shell
cp docker/Dockerfile.back .
cp docker/Dockerfile.front .

cp ./front.env.default ./front.env
```

Fill environment variables with appropriate values and then build the services.

```shell
docker compose build
```

Run services.

```shell
docker compose up
```

## Usage

When activated, a button appears to start the camera.
![start](https://github.com/ken2403/face_search/blob/feature/image/image/img1.png)

When the camera is activated, the camera image appears in the center of the screen. Align your face with the center of the camera and press the shoot button.
![camera](https://github.com/ken2403/face_search/blob/feature/image/image/img2.png)

After pressing the shoot button, the camera stops and the photo taken appears in the center of the screen. After checking, if you are not satisfied, you can reshoot. Press the Search button to search for similar faces.
![photo](https://github.com/ken2403/face_search/blob/feature/image/image/img3.png)

After the search, the top three past Nobel Prize winners whose faces are similar as judged by the AI are displayed.
![result](https://github.com/ken2403/face_search/blob/feature/image/image/img4.png)

