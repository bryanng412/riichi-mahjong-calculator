import { StateCreator } from 'zustand'
import { BoundState } from './boundStore'

export type WindSlice = {
  roundWind: string
  seatWind: string
  setRoundWind: (w: string) => void
  setSeatWind: (w: string) => void
}

export const createWindSlice: StateCreator<
  BoundState,
  [],
  [],
  WindSlice
> = set => ({
  roundWind: '27', //east wind tile
  seatWind: '27',
  setRoundWind: w => set({ roundWind: w }),
  setSeatWind: w => set({ seatWind: w }),
})
