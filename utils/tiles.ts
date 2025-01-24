export const is5Tile = (tile: number): boolean => tile % 9 === 4 && tile < 27

export const sortTiles = (tiles: string[]) =>
  [...tiles].sort((a, b) => {
    const numA = parseFloat(a)
    const numB = parseFloat(b)
    return numA - numB
  })
