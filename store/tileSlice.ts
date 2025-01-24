import { StateCreator } from 'zustand'
import { BoundState } from './boundStore'
import { sortTiles, canAddTile, MAX_HAND_SIZE } from '@/utils/tiles'

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
  addTile: t =>
    set(({ tiles, dora }) =>
      tiles.length < MAX_HAND_SIZE && canAddTile([...tiles, ...dora], t)
        ? { tiles: sortTiles([...tiles, t]) }
        : { tiles: sortTiles(tiles) }
    ),
  removeTile: idx =>
    set(({ tiles }) => ({
      tiles: sortTiles(tiles.filter((_t, i) => i !== idx)),
    })),
  clearTiles: () => set(() => ({ tiles: [] })),
})
