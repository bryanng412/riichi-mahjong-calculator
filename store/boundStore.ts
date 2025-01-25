import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createTrackedSelector } from 'react-tracked'
import merge from 'lodash/merge'
import { createYakuSlice, YakuSlice } from './yakuSlice'
import { createDoraSlice, DoraSlice } from './doraSlice'
import { createTileSlice, TileSlice } from './tileSlice'
import { createWindSlice, WindSlice } from './windSlice'
import { createActiveFieldSlice, ActiveFieldSlice } from './activeFieldSlice'

export type BoundState = YakuSlice &
  DoraSlice &
  TileSlice &
  WindSlice &
  ActiveFieldSlice

export const useBoundStoreBase = create<BoundState>()(
  devtools(
    subscribeWithSelector(
      persist(
        immer((...args) => ({
          ...createYakuSlice(...args),
          ...createDoraSlice(...args),
          ...createTileSlice(...args),
          ...createWindSlice(...args),
          ...createActiveFieldSlice(...args),
        })),
        {
          name: 'riichi-store',
          merge: (persistedState, currentState) =>
            merge(currentState, persistedState),
        }
      )
    )
  )
)

export const useBoundStore = createTrackedSelector(useBoundStoreBase)
