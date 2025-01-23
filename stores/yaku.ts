import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing

type YakuFlags = {
  isRiichi: boolean
  isIppatsu: boolean
  isDoubleRiichi: boolean
  isMenzenTsumo: boolean
  isHaiteiHotei: boolean
  isChankan: boolean
  isRinshan: boolean
}

type YakuFlagNames = keyof YakuFlags

type YakuSetter = {
  toggleYakuFlag: (yakuState: YakuFlagNames) => void
  setYakuFlag: (yakuState: YakuFlagNames, value: boolean) => void
}

type YakuState = YakuFlags & YakuSetter

export const useYakuStore = create<YakuState>()(
  devtools(
    persist(
      set => ({
        isRiichi: false,
        isIppatsu: false,
        isDoubleRiichi: false,
        isMenzenTsumo: false,
        isHaiteiHotei: false,
        isChankan: false,
        isRinshan: false,
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
