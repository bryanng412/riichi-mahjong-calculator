import { ActiveField } from '@/store/activeFieldSlice'
import { MAX_HAND_SIZE, MIN_HAND_SIZE } from '@/utils/constants'
import { canAddTile, sortTiles } from '@/utils/tiles'
import { StateCreator } from 'zustand'
import { BoundState } from './boundStore'

export type TileSlice = {
  tiles: string[]
  winningTile: string
  addTile: (t: string) => void
  removeTile: (idx: number) => void
  setWinningTile: (t: string) => void
  clearTiles: () => void
}

export const createTileSlice: StateCreator<BoundState, [], [], TileSlice> = (
  set,
  get
) => ({
  tiles: [],
  winningTile: '',
  addTile: t => {
    set(({ tiles, dora, winningTile }) =>
      tiles.length < MAX_HAND_SIZE &&
      canAddTile([...tiles, ...dora, winningTile], t)
        ? { tiles: sortTiles([...tiles, t]) }
        : { tiles: sortTiles(tiles) }
    )

    const numTiles = get().tiles.length
    if (numTiles === MIN_HAND_SIZE || numTiles === MAX_HAND_SIZE) {
      set({ activeField: ActiveField.WinningTile })
    }
  },
  removeTile: idx => {
    set(({ tiles }) => ({
      tiles: sortTiles(tiles.filter((_t, i) => i !== idx)),
    }))

    if (get().tiles.length < MIN_HAND_SIZE) {
      set({ winningTile: '' })
    }
  },
  setWinningTile: t =>
    set(({ tiles, dora, winningTile }) => ({
      winningTile: canAddTile([...tiles, ...dora], t) ? t : winningTile,
    })),
  clearTiles: () => set(() => ({ tiles: [] })),
})
