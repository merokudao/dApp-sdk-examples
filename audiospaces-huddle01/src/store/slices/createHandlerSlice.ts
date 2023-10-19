import { StoreSlice } from '../types';

export type TSidebarView = 'close' | 'peers';
export type TPromptView = 'close' | 'request-to-speak';

import { IPeer } from '@dapp-sdk/audiospaces-huddle01';

export interface ISidebarState {
  isLobbyJoined: boolean;
  isRoomJoined: boolean;

  sidebar: {
    isSidebarOpen: boolean;
    sidebarView: TSidebarView;
  };
  promptView: TPromptView;
  avatarUrl: string;
  isMyHandRaised: boolean;
  myReaction: string;
  requestedPeers: string[];
  userDisplayName: string;

  setIsLobbyJoined: (val: boolean) => void;
  setIsRoomJoined: (val: boolean) => void;
  setPromptView: (val: TPromptView) => void;
  setSidebarView: (val: TSidebarView) => void;
  setAvatarUrl: (va: string) => void;
  setMyHandRaised: (val: boolean) => void;
  setMyReaction: (val: string) => void;
  addRequestedPeers: (val: string) => void;
  removeRequestedPeers: (val: string) => void;
  setUserDisplayName: (val: string) => void;
}

const createHandlerSlice: StoreSlice<ISidebarState> = (set, get) => ({
  isLobbyJoined: false,
  isRoomJoined: false,
  sidebar: {
    isSidebarOpen: false,
    sidebarView: 'close',
  },
  avatarUrl: '/avatars/avatars/0.png',
  promptView: 'close',
  isMyHandRaised: false,
  myReaction: '',
  requestedPeers: [],
  userDisplayName: '',

  setIsLobbyJoined: (val: boolean) => {
    set(() => ({
      isLobbyJoined: val,
    }));
  },
  setIsRoomJoined(val) {
    set(() => ({
      isRoomJoined: val,
    }));
  },
  setSidebarView(sidebarView: TSidebarView) {
    const prevView = get().sidebar.sidebarView;

    if (sidebarView === 'close' || sidebarView === prevView) {
      set(() => ({
        sidebar: {
          isSidebarOpen: false,
          sidebarView: 'close',
        },
      }));
    }

    set(() => ({
      sidebar: {
        isSidebarOpen: true,
        sidebarView,
      },
    }));
  },

  setPromptView: (val: TPromptView) => {
    const prevPromptView = get().promptView;

    if (val === 'close' || val === prevPromptView) {
      set(() => ({
        promptView: 'close',
      }));
    }

    set(() => ({
      promptView: val,
    }));
  },

  setAvatarUrl: (val: string) => {
    set(() => ({
      avatarUrl: val,
    }));
  },

  setMyHandRaised: (val: boolean) => {
    set(() => ({
      isMyHandRaised: val,
    }));
  },

  setMyReaction: (val: string) => {
    set(() => ({
      myReaction: val,
    }));
  },

  addRequestedPeers: (val: string) => {
    set((state) => ({
      requestedPeers: [...state.requestedPeers, val],
    }));

    setTimeout(() => {
      get().removeRequestedPeers(val);
    }, 5000);
  },

  removeRequestedPeers: (val: string) => {
    set((state) => ({
      requestedPeers: state.requestedPeers.filter((peer) => peer !== val),
    }));
  },

  setUserDisplayName: (val: string) => {
    set(() => ({
      userDisplayName: val,
    }));
  },
});

export default createHandlerSlice;
