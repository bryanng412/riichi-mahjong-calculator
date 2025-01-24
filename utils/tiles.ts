import { Wind } from '@/store/windSlice'

export const MAX_HAND_SIZE = 14
export const MAX_NUMBER_OF_SINGLE_TILE = 4

//Man, Pin, and Sou tiles are 0-27
export const is5Tile = (tile: number): boolean => tile % 9 === 4 && tile < 27

export const generateAllTiles = (): string[] => {
  const tiles = []
  for (let i = 0; i < 34; i++) {
    tiles.push(i.toString())
    if (is5Tile(i)) {
      tiles.push(`${i}-dora`)
    }
  }

  return tiles
}

export const sortTiles = (tiles: string[]) =>
  [...tiles].sort((a, b) => {
    const numA = parseFloat(a)
    const numB = parseFloat(b)
    return numA - numB
  })

export const canAddTile = (tiles: string[], t: string): boolean => {
  const tilesUsed = tiles.reduce(
    (count, tile) => (tile === t ? count + 1 : count),
    0
  )
  const isDoraAlreadyTaken = t.includes('dora')
    ? tiles.some(tile => tile === t)
    : false

  return tilesUsed < MAX_NUMBER_OF_SINGLE_TILE && !isDoraAlreadyTaken
}

export const isWindTile = (tile: string): boolean =>
  Object.values(Wind).includes(tile as Wind)
