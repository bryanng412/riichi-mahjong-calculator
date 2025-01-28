import { StateCreator } from 'zustand'
import { BoundState } from './boundStore'

export type Wind = '27' | '28' | '29' | '30'

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
  roundWind: '27',
  seatWind: '27',
  setRoundWind: w => set({ roundWind: w }),
  setSeatWind: w => set({ seatWind: w }),
})
