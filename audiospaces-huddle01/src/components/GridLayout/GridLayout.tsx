'use client';
import { IPeer } from '@dapp-sdk/audiospace-huddle01';
import GridCard from './GridCard/GridCard';
import useStore from '@/store/slices';
import useSpaces from '../hooks/useSpaces';

type GridLayoutProps = {};

const GridLayout: React.FC<GridLayoutProps> = () => {
  const Blacklist = ['peer', 'listener'];

  const peers = useStore((state) => state.peerMap);
  const me = useStore((state) => state.me);

  console.log(peers, Array.from(peers.values()));

  const { client } = useSpaces();

  return (
    <div className="w-full h-full ml-10 flex items-center justify-center flex-col py-20">
      <div className="flex-wrap flex items-center justify-center gap-4 w-full">
        {!Blacklist.includes(me.role) && (
          <GridCard
            displayName={me.displayName}
            peerId={me.peerId}
            role={me.role}
            avatarUrl={me.avatarUrl}
          />
        )}
        {Array.from(peers.values())
          .filter((peer: IPeer) => !Blacklist.includes(peer.role))
          .map(({ displayName, peerId, role, avatarUrl }: IPeer) => (
            <GridCard
              key={peerId}
              displayName={displayName}
              peerId={peerId}
              role={role}
              avatarUrl={avatarUrl}
              mic={client.getPeerTracks(peerId)?.audio}
            />
          ))}
      </div>
      <div className="mt-10">
        <div className="text-custom-6 text-base font-normal text-center mb-5">
          Listeners -{' '}
          {Array.from(peers.values()).filter(({ role }) => role === 'listener')
            .length + (me.role == 'listener' ? 1 : 0)}
        </div>
        <div className="flex-wrap flex items-center justify-center gap-4 w-full">
          {Blacklist.includes(me.role) && (
            <GridCard
              displayName={me.displayName}
              peerId={me.peerId}
              role={me.role}
              avatarUrl={me.avatarUrl}
            />
          )}
          {Array.from(peers.values())
            .filter((peer: IPeer) => Blacklist.includes(peer.role))
            .map(({ displayName, peerId, role, avatarUrl }: IPeer) => (
              <GridCard
                key={peerId}
                displayName={displayName}
                peerId={peerId}
                role={role}
                avatarUrl={avatarUrl}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
export default GridLayout;
