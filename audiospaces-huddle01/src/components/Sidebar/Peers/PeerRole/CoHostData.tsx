import React from 'react';
import Strip from './Strip';
import { useAcl } from '@/components/hooks/useAcl';
import useSpaces from '@/components/hooks/useSpaces';
import useStore from '@/store/slices';

type CoHostDataProps = {
  peerId: string;
};

const CoHostData: React.FC<CoHostDataProps> = ({ peerId }) => {
  const { createListener, kickPeer } = useAcl();

  const me = useStore((state) => state.me);

  const { leaveSpace } = useSpaces();

  return (
    <>
      {me.role === 'host' && (
        <div>
          <Strip
            type="remove"
            title="Remove as Co-Host"
            variant="danger"
            onClick={() => {
              if (me.role === 'host' || me.role === 'coHost') {
                createListener(peerId);
              }
            }}
          />
          <Strip
            type="leave"
            title="Remove from spaces"
            variant="danger"
            onClick={() => {
              if (me.role === 'host') {
                kickPeer(peerId);
              }
            }}
          />
        </div>
      )}
      {me.role === 'coHost' && (
        <div>
          <Strip
            type="leave"
            title="Leave the spaces"
            variant="danger"
            onClick={leaveSpace}
          />
          <Strip
            type="leave"
            title="Leave co-host role"
            variant="danger"
            onClick={() => {
              createListener(peerId);
            }}
          />
        </div>
      )}
    </>
  );
};
export default CoHostData;
