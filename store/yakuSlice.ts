import { StateCreator } from 'zustand'
import { BoundState } from './boundStore'

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

export type YakuSlice = typeof initialYakuValues & YakuActions

export const createYakuSlice: StateCreator<
  BoundState,
  [],
  [],
  YakuSlice
> = set => ({
  ...initialYakuValues,
  toggleYakuFlag: yakuFlagName =>
    set(state => ({ [yakuFlagName]: !state[yakuFlagName] })),
  setYakuFlag: (yakuFlagName, value) => set(() => ({ [yakuFlagName]: value })),
})
