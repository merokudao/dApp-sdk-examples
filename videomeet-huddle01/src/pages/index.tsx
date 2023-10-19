import React, { useEffect, useRef, useState } from 'react';

import { useEventListener, useHuddle01 } from '@huddle01/react';
import { Audio, Video } from '@huddle01/react/components';
/* Uncomment to see the Xstate Inspector */
// import { Inspect } from '@huddle01/react/components';

import {
  useAudio,
  useLobby,
  useMeetingMachine,
  usePeers,
  useRoom,
  useVideo,
  useRecording,
} from '@huddle01/react/hooks';

import { useDisplayName } from '@huddle01/react/app-utils';

import Button from '../components/Button';
import useMeet from '../components/hooks/useMeet';
import { useAudioVideo } from '../components/hooks/useAudioVideo';
import { useAppUtils } from '../components/hooks/useAppUtils';

const App = () => {
  // refs
  const videoRef = useRef<HTMLVideoElement>(null);

  const { client, joinLobby, joinMeet, leaveMeet, leaveLobby } = useMeet();

  const [roomId, setRoomId] = useState('');
  const [displayNameText, setDisplayNameText] = useState('Guest');
  const [projectId, setProjectId] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const {
    fetchAudioStream,
    produceAudio,
    stopAudioStream,
    stopProducingAudio,
  } = useAudioVideo();
  const {
    fetchVideoStream,
    produceVideo,
    stopVideoStream,
    stopProducingVideo,
    enumerateVideoDevices,
  } = useAudioVideo();

  const getCamStream = async () => {
    const devices = await enumerateVideoDevices();
    const camStream = await fetchVideoStream(devices[0].deviceId);
    return camStream;
  };

  const getAudioStream = async () => {
    const devices = await enumerateVideoDevices();
    const audioStream = await fetchAudioStream(devices[0].deviceId);
    return audioStream;
  };

  // Event Listner
  useEffect(() => {
    client.on('lobby:cam-on', async () => {
      const camStream = await getCamStream();
      if (camStream && videoRef.current) videoRef.current.srcObject = camStream;
    });
    client.on('room:joined', () => {
      console.log('room:joined');
    });
    client.on('lobby:joined', () => {
      console.log('lobby:joined');
    });
  }, [client]);

  const { setDisplayName } = useAppUtils();

  return (
    <div className="grid grid-cols-2">
      <div>
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://huddle01.com">
            Huddle01 SDK!
          </a>
        </h1>

        <h2 className="text-2xl">Me Id</h2>
        <div className="break-words">{JSON.stringify(client.getMeId())}</div>
        <h2 className="text-2xl">DisplayName</h2>
        <div className="break-words">{JSON.stringify(displayNameText)}</div>

        <h2 className="text-2xl">Peers</h2>
        <div className="break-words">{JSON.stringify(client.getPeers())}</div>

        <br />
        <br />
        <h2 className="text-3xl text-red-500 font-extrabold">Initialized</h2>
        <input
          type="text"
          placeholder="Your Room Id"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
        />
        <Button
          onClick={() => {
            if (accessToken) joinLobby(roomId);
            else joinLobby(roomId);
          }}
        >
          JOIN_LOBBY
        </Button>
        <br />
        <br />
        <h2 className="text-3xl text-yellow-500 font-extrabold">Lobby</h2>
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Your Room Id"
            value={displayNameText}
            onChange={(e) => setDisplayNameText(e.target.value)}
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
          />
          <Button
            onClick={() => {
              setDisplayName(displayNameText);
            }}
          >
            {`SET_DISPLAY_NAME`}
          </Button>
          <Button onClick={fetchVideoStream}>FETCH_VIDEO_STREAM</Button>

          <Button onClick={fetchAudioStream}>FETCH_AUDIO_STREAM</Button>

          <Button onClick={joinMeet}>JOIN_ROOM</Button>

          <Button onClick={leaveLobby}>LEAVE_LOBBY</Button>

          <Button onClick={stopVideoStream}>STOP_VIDEO_STREAM</Button>
          <Button onClick={stopAudioStream}>STOP_AUDIO_STREAM</Button>
        </div>
        <br />
        <h2 className="text-3xl text-green-600 font-extrabold">Room</h2>
        <div className="flex gap-4 flex-wrap">
          <Button onClick={async () => produceAudio(await getAudioStream())}>
            PRODUCE_MIC
          </Button>

          <Button onClick={async () => produceVideo(await getCamStream())}>
            PRODUCE_CAM
          </Button>

          <Button onClick={() => stopProducingAudio()}>
            STOP_PRODUCING_MIC
          </Button>

          <Button onClick={() => stopProducingVideo()}>
            STOP_PRODUCING_CAM
          </Button>

          <Button onClick={leaveMeet}>LEAVE_ROOM</Button>
        </div>

        {/* Uncomment to see the Xstate Inspector */}
        {/* <Inspect /> */}
      </div>
      <div>
        Me Video:
        <video ref={videoRef} autoPlay muted></video>
        <div className="grid grid-cols-4">
          {Object.values(client.getPeers())
            .filter((peer) => client.getPeerTracks(peer.peerId).video)
            .map((peer) => (
              <>
                role: {peer.role}
                <Video
                  key={peer.peerId}
                  peerId={peer.peerId}
                  track={client.getPeerTracks(peer.peerId).video}
                  debug
                />
              </>
            ))}
          {Object.values(client.getPeers())
            .filter((peer) => client.getPeerTracks(peer.peerId).audio)
            .map((peer) => (
              <Audio
                key={peer.peerId}
                peerId={peer.peerId}
                track={client.getPeerTracks(peer.peerId).audio}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
