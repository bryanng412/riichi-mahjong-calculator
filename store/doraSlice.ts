import { StateCreator } from 'zustand'
import { BoundState } from './boundStore'

const MAX_DORA_INDICATOR_LENGTH = 8

export type DoraSlice = {
  dora: string[]
  addDora: (d: string) => void
  removeDora: (idx: number) => void
  clearDora: () => void
}

export const createDoraSlice: StateCreator<
  BoundState,
  [],
  [],
  DoraSlice
> = set => ({
  dora: [],
  addDora: d =>
    set(({ dora }) =>
      dora.length < MAX_DORA_INDICATOR_LENGTH
        ? { dora: [...dora, d] }
        : { dora }
    ),
  removeDora: idx =>
    set(({ dora }) => ({
      dora: dora.filter((_d, i) => i !== idx),
    })),
  clearDora: () => set(() => ({ dora: [] })),
})
