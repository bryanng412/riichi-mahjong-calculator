import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import {
  createSelectorHooks,
  ZustandHookSelectors,
} from 'auto-zustand-selectors-hook'
import merge from 'lodash/merge'
import { createYakuSlice, YakuSlice } from './yakuSlice'
import { createDoraSlice, DoraSlice } from './doraSlice'

export type BoundState = YakuSlice & DoraSlice

const useBoundStoreBase = create<BoundState>()(
  devtools(
    persist(
      immer((...args) => ({
        ...createYakuSlice(...args),
        ...createDoraSlice(...args),
      })),
      {
        name: 'riichi-store',
        merge: (persistedState, currentState) =>
          merge(currentState, persistedState),
      }
    )
  )
)

export const useBoundStore = createSelectorHooks(
  useBoundStoreBase
) as typeof useBoundStoreBase & ZustandHookSelectors<BoundState>
