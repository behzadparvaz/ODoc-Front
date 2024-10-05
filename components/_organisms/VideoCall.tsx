import React, { forwardRef, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import classNames from 'classnames';
import MobileLayout from '@com/_template/MobileLayout';
import NextImage from '@com/_core/NextImage';
import tapsiLogo from '@static/images/staticImages/tapsi-daroo-logo.png';
import Button from '@com/_atoms/Button';
import { Camera, EndCall, Mic, Speaker } from '@com/icons';
import { useRouter } from 'next/router';

let socket;
const iceServers = {
  iceServers: [
    {
      urls: 'turn:91.92.210.53:3478',
      username: 'username1',
      credential: 'key1'
    }
  ]
};

function VideoCall({ roomId }) {
  const router = useRouter()
  const localStream = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const [connected, setConnected] = useState(false);
  const [isMute, toggleIsMute] = useState(false);
  const [isOnCamera, toggleIsOnCamera] = useState(true);

  useEffect(() => {
    // Connect to the Socket.io server
    socket = io();

    // Join a room for signaling
    socket.emit("join-room", roomId);

    // Get local media stream
    navigator.mediaDevices
      .getUserMedia({ video: { width: 400 }, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        localStream.current = stream;
      })
      .catch((error) => console.error("Error accessing media devices.", error));

    // Socket.io listeners for signaling
    socket.on("user-joined", () => {
      createOffer();
    });

    socket.on("receive-offer", (offer) => {
      handleOffer(offer);
    });

    socket.on("receive-answer", (answer) => {
      handleAnswer(answer);
    });

    socket.on("receive-ice-candidate", (candidate) => {
      addIceCandidate(candidate);
    });

    socket.on("disconnected", () => {
      peerDisconnected()
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const createPeerConnection = () => {
    peerConnection.current = new RTCPeerConnection(iceServers);
    // Handle remote stream
    peerConnection.current.ontrack = (event) => {
      const [stream] = event.streams;
      remoteVideoRef.current.srcObject = stream;
    };

    // ICE candidates handling
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", event.candidate);
      }
    };

    localStream.current?.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream.current);
    });

  };

  const createOffer = async () => {
    createPeerConnection();
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    socket.emit("offer", offer);
  };

  const handleOffer = async (offer) => {
    createPeerConnection();
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);
    socket.emit("answer", answer);
  };

  const handleAnswer = async (answer) => {
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
    setConnected(true);
  };

  const addIceCandidate = (candidate) => {
    const iceCandidate = new RTCIceCandidate(candidate);
    peerConnection.current.addIceCandidate(iceCandidate);
  };

  const peerDisconnected = () => {
    remoteVideoRef.current = null
    setConnected(false)
  };

  const disconnect = () => {
    socket.emit("req-disconnect");
    localVideoRef.current = null
    localStream.current = null
    peerDisconnected()
    router.back()
  }

  const toggleVideo = () => {
    const videoTrack = localStream.current
      ?.getTracks()
      .find((track) => track.kind === "video");
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled; // Toggle video track
      toggleIsOnCamera(videoTrack.enabled); // Update the state to reflect video status
    }
  };

  const toggleAudio = () => {
    const audioTrack = localStream.current
      ?.getTracks()
      .find((track) => track.kind === "audio");
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled; // Toggle audio track (mute/unmute)
      toggleIsMute(audioTrack.enabled); // Update the state to reflect mic status
    }
  };

  return (
    <MobileLayout className="flex flex-col relative">
      <div className="flex items-center p-4">
        <NextImage src={tapsiLogo} height={20} width={100}/>
      </div>
      <div className="relative w-full h-[calc(100vh-128px)]">
        <Video ref={localVideoRef} userInfo={{ name: 'من' }}/>
        <Video ref={remoteVideoRef} userInfo={{ name: 'مخاطب' }} isMini/>
      </div>
      <div className="flex items-center justify-center gap-12 p-4 bg-white absolute bottom-0 w-full z-30">
        <Button handleClick={disconnect} className="!p-3 !h-auto !rounded-full bg-red-100 bg-opacity-50">
          <EndCall width={20} height={20} fill={'red'}/>
        </Button>
        <Button className="shadow shadow-grey-200 !p-3 !h-auto !rounded-full">
          <Speaker width={20} height={20}/>
        </Button>
        <Button handleClick={toggleAudio}
                className={classNames("shadow shadow-grey-200 !p-3 !h-auto !rounded-full", isMute && 'opacity-20')}>
          <Mic width={20} height={20}/>
        </Button>
        <Button handleClick={toggleVideo}
                className={classNames("shadow shadow-grey-200 !p-3 !h-auto !rounded-full", !isOnCamera && 'opacity-20')}>
          <Camera width={20} height={20}/>
        </Button>
      </div>
    </MobileLayout>
  );
}

export default VideoCall;

type VideoProps = {
  userInfo?: { name: string },
  isLocal?: boolean,
  isMini?: boolean
}

const Video = forwardRef(
  (
    { userInfo, isLocal, isMini }: VideoProps,
    ref: React.RefObject<HTMLVideoElement>
  ) => {
    return <div className={classNames("", isMini
      ? 'absolute w-2/3 aspect-2 bottom-2 right-2 z-20 rounded-md overflow-hidden'
      : 'relative w-full h-full'
    )}>
      <p className={classNames(
        "absolute right-4 px-3 py-1 rounded-full bg-opacity-40 bg-grey-800 text-white text-sm",
        isMini ? 'bottom-5' : 'top-5'
      )}>{userInfo?.name}</p>
      <video
        className={classNames(
          'object-cover',
          isMini ? 'w-full' : 'h-full'
        )}
        ref={ref} autoPlay playsInline muted={isLocal}/>
    </div>;
  });
