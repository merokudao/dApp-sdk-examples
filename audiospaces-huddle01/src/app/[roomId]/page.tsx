'use client';

import React, { useEffect, useState } from 'react';

// Components
import BottomBar from '@/components/BottomBar/BottomBar';
import Sidebar from '@/components/Sidebar/Sidebar';
import GridLayout from '@/components/GridLayout/GridLayout';
import Prompts from '@/components/common/Prompts';
import { useRouter } from 'next/navigation';
import AcceptRequest from '@/components/Modals/AcceptRequest';
import useStore from '@/store/slices';
import { useAppUtils } from '@/components/hooks/useAppUtils';
import { useAcl } from '@/components/hooks/useAcl';

const Home = ({ params }: { params: { roomId: string } }) => {
  const { push } = useRouter();
  const { createSpeaker } = useAcl();

  const [showAcceptRequest, setShowAcceptRequest] = useState(false);

  const me = useStore((state) => state.me);
  const removeRequestedPeers = useStore((state) => state.removeRequestedPeers);
  const requestedPeers = useStore((state) => state.requestedPeers);
  const avatarUrl = useStore((state) => state.avatarUrl);
  const userDisplayName = useStore((state) => state.userDisplayName);
  const isRoomJoined = useStore((state) => state.isRoomJoined);
  const setMeValue = useStore((state) => state.setMeValue);

  const { setAvatar, setDisplayName } = useAppUtils();

  useEffect(() => {
    if (!isRoomJoined) {
      push(`/${params.roomId}/lobby`);
      return;
    }
  }, []);

  useEffect(() => {
    setAvatar(avatarUrl);
    setMeValue('avatarUrl', avatarUrl);
  }, [avatarUrl]);

  useEffect(() => {
    setDisplayName(userDisplayName);
    setMeValue('displayName', userDisplayName);
  }, [userDisplayName]);

  const handleAccept = (pId: string) => {
    if (me.role == 'host' || me.role == 'coHost') {
      createSpeaker(pId);
      setShowAcceptRequest(false);
      removeRequestedPeers(pId);
    }
  };

  return (
    <section className="bg-audio flex h-screen items-center justify-center w-full relative  text-slate-100">
      <div className="flex items-center justify-center w-full">
        <GridLayout />
        <Sidebar />
        <div className="absolute right-4 bottom-20">
          {showAcceptRequest &&
            requestedPeers.map((pId) => (
              <AcceptRequest
                key={pId}
                peerId={pId}
                onAccept={() => handleAccept(pId)}
                onDeny={() => {
                  setShowAcceptRequest(false);
                  removeRequestedPeers(pId);
                }}
              />
            ))}
        </div>
      </div>
      <BottomBar />
      <Prompts />
    </section>
  );
};
export default Home;
