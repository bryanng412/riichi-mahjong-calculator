import { StateCreator } from 'zustand'
import { BoundState } from './boundStore'

const initialYakuValues = {
  isRiichi: false,
  isIppatsu: false,
  isDoubleRiichi: false,
  isTsumo: false,
  isHaiteiHotei: false,
  isChankan: false,
  isRinshan: false,
  isHandOpen: false,
}

type YakuFlagNames = keyof typeof initialYakuValues

type YakuActions = {
  setYakuFlag: (yakuState: YakuFlagNames, value: boolean) => void
  resetYakuFlags: () => void
}

export type YakuSlice = typeof initialYakuValues & YakuActions

export const createYakuSlice: StateCreator<
  BoundState,
  [],
  [],
  YakuSlice
> = set => ({
  ...initialYakuValues,
  setYakuFlag: (yakuFlagName, value) => set(() => ({ [yakuFlagName]: value })),
  resetYakuFlags: () => set(() => initialYakuValues),
})
