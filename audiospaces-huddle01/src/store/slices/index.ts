import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IState } from '../types';

// Slices
import createHandlerSlice from './createHandlerSlice';
import createPeerSlice from './createPeerSlice';

const useStore = create<IState>()(
  devtools(
    (...a) => ({
      ...createHandlerSlice(...a),
      ...createPeerSlice(...a),
    }),
    { name: 'store' }
  )
);

const { getState, setState } = useStore;

export { getState, setState };

export default useStore;
