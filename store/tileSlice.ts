import { StateCreator } from 'zustand'
import { BoundState } from './boundStore'

export type TileSlice = {
  tiles: string[]
  addTile: (t: string) => void
  removeTile: (idx: number) => void
  clearTiles: () => void
}

export const createTileSlice: StateCreator<
  BoundState,
  [],
  [],
  TileSlice
> = set => ({
  tiles: [],
  addTile: t => set(({ tiles }) => ({ tiles: [...tiles, t] })),
  removeTile: idx =>
    set(({ tiles }) => ({
      tiles: tiles.filter((_t, i) => i !== idx),
    })),
  clearTiles: () => set(() => ({ tiles: [] })),
})
