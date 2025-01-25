import { Wind } from '@/store/windSlice'

export const MAX_HAND_SIZE = 14
export const MAX_NUMBER_OF_SINGLE_TILE = 4
export const MAX_NUMBER_OF_5_TILE = 3

export const convertStringTileToNumber = (tile: string): number =>
  Number(tile.replace(/[^0-9]/g, ''))

//Man, Pin, and Sou tiles are 0-27
export const is5Tile = (tile: string): boolean => {
  const numTile = convertStringTileToNumber(tile)
  return numTile % 9 === 4 && numTile < 27
}

export const generateAllTiles = (): string[] => {
  const tiles = []
  for (let i = 0; i < 34; i++) {
    tiles.push(i.toString())
    if (is5Tile(i.toString())) {
      tiles.push(`${i}-dora`)
    }
  }

  return tiles
}

export const sortTiles = (tiles: string[]) =>
  [...tiles].sort((a, b) => {
    const numA = convertStringTileToNumber(a)
    const numB = convertStringTileToNumber(b)

    if (numA === numB) {
      return a.localeCompare(b)
    }
    return numA - numB
  })

export const canAddTile = (tiles: string[], t: string): boolean => {
  const tilesUsed = tiles.reduce(
    (count, tile) => (tile === t ? count + 1 : count),
    0
  )
  const isDoraAlreadyUsed = t.includes('dora')
    ? tiles.some(tile => tile === t)
    : false
  const maxNumberOfTiles = is5Tile(t)
    ? MAX_NUMBER_OF_5_TILE
    : MAX_NUMBER_OF_SINGLE_TILE

  return tilesUsed < maxNumberOfTiles && !isDoraAlreadyUsed
}

export const isWindTile = (tile: string): boolean =>
  Object.values(Wind).includes(tile as Wind)
