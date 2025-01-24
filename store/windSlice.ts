import { StateCreator } from 'zustand'
import { BoundState } from './boundStore'

export enum Wind {
  East = '27',
  South = '28',
  West = '29',
  North = '30',
}

export type WindSlice = {
  roundWind: Wind
  seatWind: Wind
  setRoundWind: (w: Wind) => void
  setSeatWind: (w: Wind) => void
}

export const createWindSlice: StateCreator<
  BoundState,
  [],
  [],
  WindSlice
> = set => ({
  roundWind: Wind.East,
  seatWind: Wind.East,
  setRoundWind: w => set({ roundWind: w }),
  setSeatWind: w => set({ seatWind: w }),
})
