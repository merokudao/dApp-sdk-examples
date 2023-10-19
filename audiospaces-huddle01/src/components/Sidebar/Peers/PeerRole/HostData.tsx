import React from 'react';
import Strip from './Strip';
import useSpaces from '@/components/hooks/useSpaces';
import useStore from '@/store/slices';

type HostDataProps = {
  peerId: string;
};

const HostData: React.FC<HostDataProps> = ({ peerId }) => {
  const { leaveSpace, endSpace } = useSpaces();

  const me = useStore((state) => state.me);

  return (
    <>
      {me.role === 'host' && (
        <div>
          <Strip
            type="close"
            title="End spaces for all"
            variant="danger"
            onClick={() => {
              endSpace();
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
export default React.memo(HostData);
