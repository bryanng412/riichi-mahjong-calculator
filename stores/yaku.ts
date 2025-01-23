import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing

const initialYakuValues = {
  isRiichi: false,
  isIppatsu: false,
  isDoubleRiichi: false,
  isMenzenTsumo: false,
  isHaiteiHotei: false,
  isChankan: false,
  isRinshan: false,
}

type YakuFlagNames = keyof typeof initialYakuValues

type YakuActions = {
  toggleYakuFlag: (yakuState: YakuFlagNames) => void
  setYakuFlag: (yakuState: YakuFlagNames, value: boolean) => void
}

export const useYakuStore = create<typeof initialYakuValues & YakuActions>()(
  devtools(
    persist(
      set => ({
        ...initialYakuValues,
        toggleYakuFlag: yakuFlagName =>
          set(state => ({ [yakuFlagName]: !state[yakuFlagName] })),
        setYakuFlag: (yakuFlagName, value) =>
          set(() => ({ [yakuFlagName]: value })),
      }),
      {
        name: 'yaku-storage',
      }
    )
  )
)
