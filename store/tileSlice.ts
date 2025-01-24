import { StateCreator } from 'zustand'
import { BoundState } from './boundStore'
import { sortTiles } from '@/utils/tiles'

const MAX_HAND_SIZE = 14
const MAX_NUMBER_OF_SINGLE_TILE = 4

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
    set(({ tiles, dora }) => {
      const tilesUsed = [...tiles, ...dora].reduce(
        (count, tile) => (tile === t ? count + 1 : count),
        0
      )
      const isDoraAlreadyTaken = t.includes('dora')
        ? [...tiles, ...dora].some(tile => tile === t)
        : false

      if (
        tiles.length >= MAX_HAND_SIZE ||
        tilesUsed >= MAX_NUMBER_OF_SINGLE_TILE ||
        isDoraAlreadyTaken
      ) {
        return { tiles: sortTiles(tiles) }
      }
      return { tiles: sortTiles([...tiles, t]) }
    }),
  removeTile: idx =>
    set(({ tiles }) => ({
      tiles: sortTiles(tiles.filter((_t, i) => i !== idx)),
    })),
  clearTiles: () => set(() => ({ tiles: [] })),
})
