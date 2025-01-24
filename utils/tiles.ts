export const MAX_HAND_SIZE = 14
export const MAX_NUMBER_OF_SINGLE_TILE = 4

export const is5Tile = (tile: number): boolean => tile % 9 === 4 && tile < 27

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
