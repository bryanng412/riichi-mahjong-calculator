import merge from 'lodash/merge'
import { createTrackedSelector } from 'react-tracked'
import { create } from 'zustand'
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import {
  ActiveField,
  ActiveFieldSlice,
  createActiveFieldSlice,
} from './activeFieldSlice'
import { createDoraSlice, DoraSlice } from './doraSlice'
import { createOptionsSlice, OptionsSlice } from './optionsSlice'
import { createTileSlice, TileSlice } from './tileSlice'
import { createWindSlice, WindSlice } from './windSlice'
import { createYakuSlice, YakuSlice } from './yakuSlice'

export type BoundState = YakuSlice &
  DoraSlice &
  TileSlice &
  WindSlice &
  ActiveFieldSlice &
  OptionsSlice

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
          ...createOptionsSlice(...args),
        })),
        {
          name: 'riichi-store',
          skipHydration: true,
          partialize: state => ({ ...state, activeField: ActiveField.Hand }),
          merge: (persistedState, currentState) =>
            merge(currentState, persistedState),
        }
      )
    )
  )
)

export const useBoundStore = createTrackedSelector(useBoundStoreBase)
