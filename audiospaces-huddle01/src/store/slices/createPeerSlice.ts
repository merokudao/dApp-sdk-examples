import { IPeer } from '@dapp-sdk/audiospaces-huddle01';
import { StoreSlice } from '../types';
import { IRoleEnum } from '@/utils/types';

export type IPeerSliceState = {
  me: IPeer;
  peerMap: Map<string, IPeer>;
  setMe: (val: IPeer) => void;
  setMeValue: <TKey extends keyof IPeer>(key: TKey, val: IPeer[TKey]) => void;
  setPeerMap: (val: Map<string, IPeer>) => void;
  addPeer: (val: IPeer) => void;
  removePeer: (val: string) => void;
};

const createPeerSlice: StoreSlice<IPeerSliceState> = (set, get) => ({
  me: {
    peerId: '',
    displayName: '',
    avatarUrl: '/avatars/0.png',
    isHandRaised: false,
    joinStatus: 'disconnected',
    role: IRoleEnum.peer,
  },
  peerMap: new Map(),
  setPeerMap(val) {
    set(() => ({
      peerMap: val,
    }));
  },
  setMe(val) {
    set(() => ({
      me: val,
    }));
  },
  setMeValue(key, val) {
    set((state) => {
      const newMe = { ...state.me };
      newMe[key] = val;
      return {
        me: newMe,
      };
    });
  },
  addPeer(val) {
    set((state) => {
      const newPeerMap = new Map(state.peerMap);
      newPeerMap.set(val.peerId, val);
      return {
        peerMap: newPeerMap,
      };
    });
  },
  removePeer(val) {
    set((state) => {
      const newPeerMap = new Map(state.peerMap);
      newPeerMap.delete(val);
      return {
        peerMap: newPeerMap,
      };
    });
  },
});

export default createPeerSlice;
