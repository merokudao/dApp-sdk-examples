import React from 'react';
import Strip from './Strip';
import { useAcl } from '@/components/hooks/useAcl';
import useSpaces from '@/components/hooks/useSpaces';
import useStore from '@/store/slices';

type ListenersDataProps = {
  peerId: string;
};

const ListenersData: React.FC<ListenersDataProps> = ({ peerId }) => {
  const { createCohost, createSpeaker, kickPeer } = useAcl();
  const { leaveSpace } = useSpaces();
  const me = useStore((state) => state.me);

  return (
    <>
      {me.role === 'host' && (
        <div>
          <Strip
            type="personNormal"
            title="Invite as Co-Host"
            variant="normal"
            onClick={() => {
              createCohost(peerId);
            }}
          />
        </div>
      )}
      {me.role === 'coHost' || me.role === 'host' ? (
        <div>
          <Strip
            type="personSpeaker"
            title="Invite as Speaker"
            variant="normal"
            onClick={() => {
              createSpeaker(peerId);
            }}
          />
          <Strip
            type="leave"
            title="Remove from spaces"
            variant="danger"
            onClick={() => {
              kickPeer(peerId);
            }}
          />
        </div>
      ) : (
        <div>
          <Strip
            type="leave"
            title="Leave the spaces"
            variant="danger"
            onClick={() => {
              leaveSpace();
            }}
          />
        </div>
      )}
    </>
  );
};
export default ListenersData;
