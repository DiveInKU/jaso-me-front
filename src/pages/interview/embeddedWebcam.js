import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { io, Socket } from 'socket.io-client';

function EmbeddedWebcam(props) {
  const webSocket = useRef(null);
  const webcamRef = useRef(null);
  // const [interviewNumber, setInterviewNumber] = useState(0);
  const [startInterviewAnalysis, setStartInterviewAnalysis] = useState(false);
  const intervalHandlerRef = useRef(null);

  useEffect(() => {
    webSocket.current = io("http://localhost:8000", {
      // pingInterval 에 한번씩 ping을 보내서 pingTimeout 안에 응답이 오면 connection이 유지 된다고 판단한다.
      pingInterval: 300000,
      pingTimeout: 300000,
      transports: ['websocket'],
      upgrade: false
    });
    // webSocket.current.emit('connect');
    webSocket.current.on('connect', () => {
      webSocket.current.emit('interview_start');
    });

    webSocket.current.on('disconnect', () => {
      // if(intervalHandlerRef.current){
      //   clearInterval(intervalHandlerRef.current);
      // }
      console.log('disconnected.....')
    });

    webSocket.current.on('interview_number', (msg) => {
      props.setInterviewNumber(msg);
      setStartInterviewAnalysis(true);
    });

    webSocket.current.on('result', (msg) => {
      console.log('result', msg);
    });
  }, []);

  const sendCamImageToServer = () => {
    if(startInterviewAnalysis && webcamRef.current && webSocket.current){
      const imageSrc = webcamRef.current.getScreenshot();
      console.log('sendCamImageToServer')
      webSocket.current.emit('image', {'interviewNumber': props.interviewNumber, 'image':imageSrc});
      setTimeout(sendCamImageToServer, 1000/30); // 30 fps
    }
  };

  useEffect(()=>{
    if(startInterviewAnalysis){
      console.log('emotion cam started...')
      // const imageSrc = webcamRef.current.getScreenshot();
      // console.log(imageSrc)
      // while(webSocket.current && webcamRef){
      //   const imageSrc = webcamRef.current.getScreenshot();
      //   console.log(imageSrc)
      // }
      sendCamImageToServer();
    }
  }, [startInterviewAnalysis]);
  return <Webcam mirrored={true} ref={webcamRef} screenshotFormat="image/jpeg"></Webcam>;
}

export default EmbeddedWebcam;
