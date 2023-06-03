import React, { useRef, useState } from 'react';

import { URLs } from '../api/urls';
import { Button } from '../components/button';
import { BaseContainer } from '../components/basecontainer';
import { NobelData, NobelPrizeWinner } from './nobel_show';


const NobelPrizeWinners: React.FC<{ nobelData: NobelData[] }> = ({ nobelData }) => {
  const sizes = ['300px', '200px', '150px', '100px', '100px']
  const message = [1, 2, 3, 4, 5]
  return (
    <div>
      {nobelData.map((winner, index) => (
        <NobelPrizeWinner key={winner.item} winner={winner} size={sizes[index]} message={message[index]} />
      ))}
    </div>
  );
};

export const CameraComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cameraInitial, setCameraInitial] = useState(true);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [nobelData, setNobelData] = useState<NobelData[]>([]);

  const startCamera = async () => {
    try {
      // ユーザーのメディアデバイスのカメラにアクセス
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

      // ビデオ要素にメディアストリームを割り当て
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCameraStarted(true);
      setCapturedImage(null);

      // カメラの初期化の場合は、カメラの初期化フラグをfalseにする
      setCameraInitial(false);

    } catch (error) {
      console.error('カメラの起動に失敗しました:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const mediaStream = videoRef.current.srcObject as MediaStream;
      const tracks = mediaStream.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      videoRef.current.srcObject = null;
      setCameraStarted(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      const imageDataURL = canvas.toDataURL();
      setCapturedImage(imageDataURL);

      stopCamera();
    }
  };

  const resetView = () => {
    setCameraInitial(true);
    setCapturedImage(null);
    setNobelData([]);
  }

  const sendImageToAPI = async (capturedImage: string) => {
    try {
      const json_body = { 'url': capturedImage }
      const response = await fetch(`${URLs.searchFace}`, {
        method: 'POST',
        body: JSON.stringify(json_body),
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('サーバーからのレスポンスが正常ではありません')
      } else {
        const jsonResponse = await response.json();
        setNobelData(jsonResponse.nobel_data)
      }
    } catch (error) {
      console.error('リクエストの送信に失敗しました:', error);
    }
  };

  if (nobelData.length === 0) {
      return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '20px',
          }}
        >
          {!cameraStarted ? (
            cameraInitial ? (
            <BaseContainer>
              <Button onClick={startCamera} text='カメラを起動' caption='Camera start'/>
            </BaseContainer>
            ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', flexDirection: 'row'}}>
                <BaseContainer>
                    <Button onClick={startCamera} text='再撮影' caption='Retake' />
                </BaseContainer>
                <BaseContainer>
                  <Button onClick={resetView} text='戻る' caption='Return' />
                </BaseContainer>
              </div>
              {capturedImage &&
                <BaseContainer>
                  <Button onClick={()=>{sendImageToAPI(capturedImage)}} text='検索' caption='Face Search' backColor='#cf5d41' />
                </BaseContainer>
              }
            </div>
            ) 
          ) : (
              <BaseContainer>
                <Button onClick={captureImage} text='撮影' caption='Take' />
              </BaseContainer>
          )}
          {capturedImage && <img src={capturedImage} alt="Captured" style={{ maxWidth: '90%', margin: '20px'}} />}
          <video ref={videoRef} autoPlay={true} style={{ margin: '20px'}}/>
          <canvas ref={canvasRef} style={{ display: 'none', margin: '20px' }} />
        </div>
      );
    } else {
      return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '20px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row'}}>
            <BaseContainer>
              <Button onClick={resetView} text='戻る' caption='Return' />
            </BaseContainer>
          </div>
          <NobelPrizeWinners nobelData={nobelData} />
        </div>
      );
    }
};
