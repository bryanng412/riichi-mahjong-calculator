import { StateCreator } from 'zustand'
import { BoundState } from './boundStore'

const initialOptionsValues = {
  showHanScoring: false,
  showJapaneseYakuNames: false,
  showTileHelpers: false,
  showNumberOfTilesInHand: true,
}

export type OptionsNames = keyof typeof initialOptionsValues

type OptionsActions = {
  setOptionsValue: (yakuState: OptionsNames, value: boolean) => void
}

export type OptionsSlice = typeof initialOptionsValues & OptionsActions

export const createOptionsSlice: StateCreator<
  BoundState,
  [],
  [],
  OptionsSlice
> = set => ({
  ...initialOptionsValues,
  setOptionsValue: (optionName, value) => set(() => ({ [optionName]: value })),
})
