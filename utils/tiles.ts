import { BoundState } from '@/store/boundStore'
import { Wind } from '@/store/windSlice'
import {
  MAX_NUMBER_OF_5_TILE,
  MAX_NUMBER_OF_SINGLE_TILE,
} from '@/utils/constants'
import { Riichi } from 'riichi-ts'

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
  const tilesUsed = tiles
    .filter(tile => tile !== '')
    .reduce((count, tile) => (tile === t ? count + 1 : count), 0)
  const isDoraAlreadyUsed = t.includes('dora')
    ? tiles.some(tile => tile === t)
    : false
  const maxNumberOfTiles = is5Tile(t)
    ? MAX_NUMBER_OF_5_TILE
    : MAX_NUMBER_OF_SINGLE_TILE

  return tilesUsed < maxNumberOfTiles && !isDoraAlreadyUsed
}

export const isWindTile = (tile: string): boolean =>
  ['27', '28', '29', '30'].includes(tile)

export const countAkaDora = (tiles: string[]): number =>
  tiles.reduce((count, t) => (t.includes('dora') ? count + 1 : count), 0)

export const getNextWind = (w: Wind): Wind => {
  const nextWind = getDoraFromIndicators([w])[0]
  return nextWind.toString() as Wind
}

export const getDoraFromIndicators = (indicatorTiles: string[]): number[] => {
  const getNextTile = (tile: number) => {
    // Man suit (0-8)
    if (tile >= 0 && tile < 8) {
      return tile + 1
    } else if (tile === 8) {
      return 0

      // Pin suit (9-17)
    } else if (tile >= 9 && tile < 17) {
      return tile + 1
    } else if (tile === 17) {
      return 9

      // Sou suit (18-26)
    } else if (tile >= 18 && tile < 26) {
      return tile + 1
    } else if (tile === 26) {
      return 18

      // Winds
    } else if (tile >= 27 && tile < 30) {
      return tile + 1
    } else if (tile === 30) {
      return 27

      // Dragons
    } else if (tile >= 31 && tile < 33) {
      return tile + 1
    } else if (tile === 33) {
      return 31
    } else {
      return null
    }
  }

  return indicatorTiles
    .map(convertStringTileToNumber)
    .map(getNextTile)
    .filter(t => t !== null)
}

export const numberToPrefix = (n: number) => {
  const prefixes = [
    'Single',
    'Double',
    'Triple',
    'Quadruple',
    'Quintuple',
    'Sextuple',
  ]

  return prefixes[n - 1] || `(${n}-tuple)`
}

export const calculateHand = (state: BoundState) => {
  const {
    tiles,
    roundWind,
    seatWind,
    dora,
    isMenzenTsumo,
    winningTile,
    isRiichi,
    isIppatsu,
    isDoubleRiichi,
    isChankan,
    isHaiteiHotei,
    isRinshan,
  } = state
  const closedHand = tiles.map(convertStringTileToNumber)
  const akaDoraInHand = countAkaDora([...tiles, winningTile])
  const doraInHand = getDoraFromIndicators(dora)
  const winningTileNum = convertStringTileToNumber(winningTile)
  const ronTile = isMenzenTsumo ? undefined : winningTileNum

  if (isMenzenTsumo) {
    closedHand.push(winningTileNum)
  }

  const hand = new Riichi(
    closedHand,
    [],
    {
      bakaze: convertStringTileToNumber(roundWind),
      jikaze: convertStringTileToNumber(seatWind),
      dora: doraInHand,
    },
    ronTile,
    false,
    isRiichi,
    isIppatsu,
    isDoubleRiichi,
    isHaiteiHotei,
    isChankan || isRinshan,
    akaDoraInHand,
    true,
    true
  )

  hand.disableHairi()

  return hand.calc()
}
