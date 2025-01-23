import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import merge from 'lodash/merge'
import { createYakuSlice, YakuSlice } from './yakuSlice'

type BoundState = YakuSlice

export const useBoundSore = create<BoundState>()(
  devtools(
    persist(
      immer((...args) => createYakuSlice(...args)),
      {
        name: 'riichi-store',
        merge: (persistedState, currentState) =>
          merge(currentState, persistedState),
      }
    )
  )
)
