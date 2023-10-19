import { StateCreator } from 'zustand';
import { ISidebarState } from '../slices/createHandlerSlice';
import { IPeerSliceState } from '../slices/createPeerSlice';

export type IState = ISidebarState & IPeerSliceState;

export type StoreSlice<T> = StateCreator<
  IState,
  [['zustand/devtools', never]],
  [],
  T
>;

export type ValueOf<T> = T[keyof T];
