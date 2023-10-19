'use client';
import { useEffect } from 'react';
import useSpaces from '../hooks/useSpaces';
import useStore from '@/store/slices';
import { useRouter } from 'next/navigation';

const RoomStateHandler = () => {
  const { client } = useSpaces();
  const setIsLobbyJoined = useStore((state) => state.setIsLobbyJoined);
  const setIsRoomJoined = useStore((state) => state.setIsRoomJoined);
  const setPeerMap = useStore((state) => state.setPeerMap);
  const addPeer = useStore((state) => state.addPeer);
  const removePeer = useStore((state) => state.removePeer);
  const addRequestedPeers = useStore((state) => state.addRequestedPeers);
  const me = useStore((state) => state.me);
  const setMeValue = useStore((state) => state.setMeValue);

  const { push } = useRouter();

  useEffect(() => {
    client.on('lobby:joined', () => {
      console.log('lobby:joined');
      setIsLobbyJoined(true);
      setIsRoomJoined(false);
      setMeValue('peerId', client.getMeId());
    });

    client.on('room:joined', (peerMap) => {
      console.log('room:joined');
      setIsLobbyJoined(false);
      setIsRoomJoined(true);
      setPeerMap(peerMap);
      setMeValue('joinStatus', 'joined');
      setMeValue('role', peerMap.size < 1 ? 'host' : 'listener');
    });

    client.on('room:peer-joined', (peer) => {
      console.log('room:peer-joined');
      addPeer(peer);
    });

    client.on('room:me-left', () => {
      console.log('room:me-left');
      setIsLobbyJoined(false);
      setIsRoomJoined(false);
      push('https://huddle01.com/docs/usecase/audio-spaces');
    });

    client.on('room:peer-left', (peerId) => {
      console.log('room:peer-left');
      removePeer(peerId);
    });

    client.on('room:data-received', (data) => {
      if (data.payload['request-to-speak']) {
        addRequestedPeers(data.payload['request-to-speak']);
      }
    });
  }, [client]);

  return null;
};

export default RoomStateHandler;
