import { Socket } from 'dgram';
import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import io from 'socket.io-client';

function EmbeddedWebcam() {
  const webSocket = useRef(null);
  const [interviewNumber, setInterviewNumber] = useState(0);

  useEffect(() => {
    webSocket.current = io('http://localhost:8000/');
    // webSocket.current.emit('connect');
    webSocket.current.on('connect', () => {
      webSocket.current.emit('interview_start');
    });

    webSocket.current.on('interview_number', (socket: any) => {
      console.log('interview_number', socket)
      setInterviewNumber(socket.data);
    }
    );
  }, []);
  return <Webcam mirrored={true}></Webcam>;
}

export default EmbeddedWebcam;
