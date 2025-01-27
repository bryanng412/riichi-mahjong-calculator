import { MAX_DORA_INDICATOR_LENGTH } from '@/utils/constants'
import { canAddTile } from '@/utils/tiles'
import { StateCreator } from 'zustand'
import { BoundState } from './boundStore'

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
    set(({ dora, tiles, winningTile }) =>
      dora.length < MAX_DORA_INDICATOR_LENGTH &&
      canAddTile([...dora, ...tiles, winningTile], d)
        ? { dora: [...dora, d] }
        : { dora }
    ),
  removeDora: idx =>
    set(({ dora }) => ({
      dora: dora.filter((_d, i) => i !== idx),
    })),
  clearDora: () => set(() => ({ dora: [] })),
})
