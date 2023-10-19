'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSpaces from '@/components/hooks/useSpaces';

type LobbyPageProps = {
  roomId: string;
};

const IntroPage: React.FC<LobbyPageProps> = ({ roomId }) => {
  const { joinLobby } = useSpaces();
  const { push } = useRouter();

  useEffect(() => {
    joinLobby(roomId);
    push(`/${roomId}/lobby`);
  }, []);

  return null;
};
export default IntroPage;
