import React, { useEffect, useState, useRef } from "react";
import { SocketCamProps } from "types/interview/interview-type";


const SocketVideo: React.FC<SocketCamProps> = ({ webSocketUrl, showing, recordedChunks }) => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [items, setItems] = useState([]);
  const [socketImg, setSocketImg] = useState('');
    // const [showOrNot, setShowOrNot] = useState(false);
  // const [recordedChunks, setRecordedChunks] = useState<string[]>([]);
  let ws = useRef(null);

  const [endInterview, setEndInterview] = useState(false);

  const endSocket = () => {
    setEndInterview(true);
    ws.current.close();
  }

  const getNewSocket = () => {
    const socket = new WebSocket(webSocketUrl);
    socket.onopen = () => {
        console.log("connected to " + webSocketUrl);
        setSocketConnected(true);
        ws.current.send(showing);
      };
      socket.onclose = (error: Event) => {
        console.log("disconnect from " + webSocketUrl);
        console.log(error);
        setSocketConnected(false);
      };
      socket.onerror = (error: Event) => {
        console.log("connection error " + webSocketUrl);
        console.log(error);
      };
      socket.onmessage = (evt: MessageEvent) => {
        var msg = evt.data;
        var blobUrl = URL.createObjectURL(new Blob([msg]));
        setSocketImg(blobUrl);
      };
      return socket;
  }

  // 소켓 객체 생성
  useEffect(() => {
    if (!ws.current) {
        ws.current = getNewSocket();
    //   ws.current = new WebSocket(webSocketUrl);
    //   console.log(webSocketUrl);
    //   ws.current.onopen = () => {
    //     console.log("connected to " + webSocketUrl);
    //     setSocketConnected(true);
    //   };
    //   ws.current.onclose = (error: Event) => {
    //     console.log("disconnect from " + webSocketUrl);
    //     console.log(error);
    //     setSocketConnected(false);
    //   };
    //   ws.current.onerror = (error: Event) => {
    //     console.log("connection error " + webSocketUrl);
    //     console.log(error);
    //   };
    //   ws.current.onmessage = (evt: MessageEvent) => {
    //     var msg = evt.data;
    //     var blobUrl = URL.createObjectURL(new Blob([msg]));
    //     setSocketImg(blobUrl);
    //   };
    }
    return () => {
      console.log("clean up");
      ws.current.close();
    };
  }, []);

  // 소켓이 연결되었을 시에 send 메소드
  useEffect(() => {
    if (!socketConnected && !endInterview) {
        console.log('socket retry...')
       ws.current = getNewSocket();
    }
  }, [socketConnected]);

  useEffect(() => {
      if (socketImg) {
          recordedChunks.push(socketImg);
      }
  }, [socketImg])

//   useEffect(() => {
//     if (sendMsg) {
       
//     }
//   }, [sendMsg]);

  useEffect(() => {
    if (socketConnected) {
       ws.current.send(showing);
       console.log('send ', showing);
    }
  }, [showing]);

  return (
    <div>
        <img style={{ width:'100%' }} src={ socketImg }/>
    </div>
  );
};

export default SocketVideo;