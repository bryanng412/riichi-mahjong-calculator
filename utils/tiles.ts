import { BoundState } from '@/store/boundStore'
import { Wind } from '@/store/windSlice'
import {
  MAX_HAND_SIZE,
  MAX_NUMBER_OF_5_TILE,
  MAX_NUMBER_OF_SINGLE_TILE,
  MIN_HAND_SIZE,
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

export const isThirteenOrphans = (tiles: number[]): boolean => {
  const tileFrequency: { [tile: number]: number } = {}
  const thirteenOrphanTiles = [0, 8, 9, 17, 18, 26, 27, 28, 29, 30, 31, 32, 33]
  thirteenOrphanTiles.forEach(tile => {
    tileFrequency[tile] = 0
  })

  tiles.forEach(tile => {
    if (thirteenOrphanTiles.includes(tile)) {
      tileFrequency[tile]++
    }
  })

  const tileFrequencyValues = Object.values(tileFrequency)
  return (
    tileFrequencyValues.filter(count => count === 1).length === 12 &&
    tileFrequencyValues.filter(count => count === 2).length === 1 &&
    tileFrequencyValues.reduce((total, count) => total + count, 0) === 14
  )
}

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

type TileFrequency = { [tile: number]: number }

export const getTileFrequencyKeys = (
  tileFrequency: TileFrequency
): number[] => {
  return Object.keys(tileFrequency)
    .map(Number)
    .sort((a, b) => a - b)
}

export const isValidChi = (possibleChi: [number, number, number]): boolean => {
  const isNumberTile = possibleChi.every(t => t >= 0 && t <= 26)
  if (!isNumberTile) {
    return false
  }

  const sortedTiles = possibleChi.sort((a, b) => a - b)
  return (
    sortedTiles[1] - sortedTiles[0] === 1 &&
    sortedTiles[2] - sortedTiles[1] === 1
  )
}

export const findAllMeldCombinations = (tiles: number[]): number[][][] => {
  const tileFrequency: TileFrequency = tiles.reduce((freq, tile) => {
    freq[tile] = (freq[tile] ?? 0) + 1
    return freq
  }, {} as TileFrequency)

  const results: Set<string> = new Set()

  const backtrack = (combinations: number[][], hasPair: boolean) => {
    // base case - if no tiles left and we have exactly 1 pair
    const totalTiles = Object.values(tileFrequency).reduce(
      (total, n) => total + n,
      0
    )
    if (totalTiles === 0 && hasPair) {
      const sortedCombination = combinations
        .map(combo => combo.slice().sort((a, b) => a - b))
        .sort((a, b) => b.length - a.length || a[0] - b[0])
      results.add(JSON.stringify(sortedCombination))
      return
    }

    // base case - we already have 5 melds
    if (combinations.length === 5) return

    // try forming a pair if we don't already have one
    if (!hasPair) {
      getTileFrequencyKeys(tileFrequency).forEach(tile => {
        if (tileFrequency[tile] >= 2) {
          // use available pair
          tileFrequency[tile] -= 2
          combinations.push([tile, tile])

          //backtrack
          backtrack(combinations, true)
          combinations.pop()
          tileFrequency[tile] += 2
        }
      })
    }

    // try forming quadruplets (kan)
    getTileFrequencyKeys(tileFrequency).forEach(tile => {
      if (tileFrequency[tile] >= 4) {
        // use available quadruplet
        tileFrequency[tile] -= 4
        combinations.push([tile, tile, tile, tile])

        //backtrack
        backtrack(combinations, hasPair)
        combinations.pop()
        tileFrequency[tile] += 4
      }
    })

    // try forming triplets (pon)
    getTileFrequencyKeys(tileFrequency).forEach(tile => {
      if (tileFrequency[tile] >= 3) {
        // use available triplet
        tileFrequency[tile] -= 3
        combinations.push([tile, tile, tile])

        //backtrack
        backtrack(combinations, hasPair)
        combinations.pop()
        tileFrequency[tile] += 3
      }
    })

    // try forming sequences (chi)
    const uniqueTiles = getTileFrequencyKeys(tileFrequency)
    const chiLength = 3
    for (let i = 0; i < uniqueTiles.length - chiLength + 1; i++) {
      const t1 = uniqueTiles[i]
      const t2 = uniqueTiles[i + 1]
      const t3 = uniqueTiles[i + 2]
      const possibleChi: [number, number, number] = [t1, t2, t3]

      if (
        isValidChi(possibleChi) &&
        tileFrequency[t1] > 0 &&
        tileFrequency[t2] > 0 &&
        tileFrequency[t3] > 0
      ) {
        //use available sequence
        tileFrequency[t1]--
        tileFrequency[t2]--
        tileFrequency[t3]--
        combinations.push(possibleChi)

        //backtrack
        backtrack(combinations, hasPair)
        combinations.pop()
        tileFrequency[t1]++
        tileFrequency[t2]++
        tileFrequency[t3]++
      }
    }
  }

  backtrack([], false)

  return Array.from(results)
    .map(combo => JSON.parse(combo))
    .sort((a, b) => a.length - b.length || a[0] - b[0])
}

type CalcData = {
  hand: number[][]
  result: ReturnType<Riichi['calc']>
}

export const calculateHand = (state: BoundState): CalcData[] => {
  const {
    tiles,
    roundWind,
    seatWind,
    dora,
    isTsumo,
    winningTile,
    isRiichi,
    isIppatsu,
    isDoubleRiichi,
    isChankan,
    isHaiteiHotei,
    isRinshan,
    isHandOpen,
  } = state
  const allTiles = [...tiles, winningTile].map(convertStringTileToNumber)
  if (
    allTiles.length < MIN_HAND_SIZE + 1 ||
    allTiles.length > MAX_HAND_SIZE + 1 ||
    winningTile === ''
  ) {
    return []
  }

  const allPossibleHands = isThirteenOrphans(allTiles)
    ? [[allTiles]]
    : findAllMeldCombinations(allTiles)
  if (allPossibleHands.length === 0) {
    return []
  }

  const akaDoraInHand = countAkaDora([...tiles, winningTile])
  const doraInHand = getDoraFromIndicators(dora)
  const winningTileNum = convertStringTileToNumber(winningTile)
  const results: CalcData[] = []

  for (let i = 0; i < allPossibleHands.length; i++) {
    const hand = allPossibleHands[i]
    let closedHand: number[] = []
    const openHand: { open: boolean; tiles: number[] }[] = []
    const kans = hand.filter(meld => meld.length === 4)
    const pair = hand.filter(meld => meld.length === 2)[0]
    const meldsWithWinningTile = hand.filter(
      meld => meld.includes(winningTileNum) && meld.length === 3
    )
    let meldsWithoutWinningTile = hand.filter(
      meld => !meld.includes(winningTileNum) && meld.length === 3
    )

    // build open hand
    if (isHandOpen) {
      // might need for sanankou (3 closed triplets)
      // const openMeldIndex = meldsWithoutWinningTile.findIndex(
      //   meld => meld.length === 3
      // )

      // if (openMeldIndex !== -1) {
      //   const openMeld = meldsWithoutWinningTile.splice(openMeldIndex, 1)[0]
      //   openHand.push({ open: true, tiles: openMeld })
      // }
      meldsWithoutWinningTile.forEach(meld =>
        openHand.push({ open: true, tiles: meld })
      )
      meldsWithoutWinningTile = []
    }

    kans.forEach(kan => openHand.push({ open: isHandOpen, tiles: kan }))

    // build closed hand
    const allMelds = [
      ...meldsWithWinningTile,
      ...meldsWithoutWinningTile,
      pair,
    ].flat()

    if (isTsumo) {
      closedHand = allMelds
        .filter(tile => tile !== winningTileNum)
        .concat(allMelds.filter(tile => tile === winningTileNum))
    } else {
      allMelds.splice(allMelds.indexOf(winningTileNum), 1)
      closedHand = allMelds
    }

    if (hand[0].length === 14) {
      closedHand = isTsumo ? hand[0] : tiles.map(convertStringTileToNumber)
    }
    const ronTile = isTsumo ? undefined : winningTileNum

    const riichiHand = new Riichi(
      closedHand,
      openHand,
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

    riichiHand.disableHairi()
    results.push({
      hand,
      result: riichiHand.calc(),
    })
  }

  return results.sort((a, b) => b.result.ten - a.result.ten)
}
