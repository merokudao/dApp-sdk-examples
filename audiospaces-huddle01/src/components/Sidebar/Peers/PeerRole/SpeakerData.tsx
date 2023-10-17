import React from 'react';
import Strip from './Strip';
import { useAcl } from '@/components/hooks/useAcl';
import useSpaces from '@/components/hooks/useSpaces';
import useStore from '@/store/slices';

type SpeakerDataProps = {
  peerId: string;
};

const Speaker: React.FC<SpeakerDataProps> = ({ peerId }) => {
  const { createCohost, createListener, kickPeer } = useAcl();
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
      {['host', 'coHost'].includes(me.role) && (
        <div>
          <Strip
            type="speaker"
            title="Remove as Speaker"
            variant="danger"
            onClick={() => {
              createListener(peerId);
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
      )}

      {me.role === 'speaker' && (
        <div>
          <Strip
            type="leave"
            title="Leave speaker role"
            variant="danger"
            onClick={() => {
              createListener(peerId);
            }}
          />
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
export default Speaker;
