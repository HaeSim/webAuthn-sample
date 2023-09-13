import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { CounterSlice } from './createCounterSlice';
import createCounterSlice from './createCounterSlice';

export type MyState = CounterSlice;

const useStore = create<MyState>()(
  devtools((...a) => ({
    ...createCounterSlice(...a),
  }))
);

export default useStore;
