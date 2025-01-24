import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createTrackedSelector } from 'react-tracked'
import merge from 'lodash/merge'
import { createYakuSlice, YakuSlice } from './yakuSlice'
import { createDoraSlice, DoraSlice } from './doraSlice'
import { createTileSlice, TileSlice } from './tileSlice'

export type BoundState = YakuSlice & DoraSlice & TileSlice

const useBoundStoreBase = create<BoundState>()(
  devtools(
    persist(
      immer((...args) => ({
        ...createYakuSlice(...args),
        ...createDoraSlice(...args),
        ...createTileSlice(...args),
      })),
      {
        name: 'riichi-store',
        merge: (persistedState, currentState) =>
          merge(currentState, persistedState),
      }
    )
  )
)

export const useBoundStore = createTrackedSelector(useBoundStoreBase)
