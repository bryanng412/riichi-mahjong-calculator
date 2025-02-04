import { describe, expect, test } from 'vitest'
import { convertStringTileToNumber, is5Tile } from '../tiles'

describe('convertStringTileToNumber', () => {
  test('converts a string tile to a number', () => {
    expect(convertStringTileToNumber('27')).toBe(27)
    expect(convertStringTileToNumber('0')).toBe(0)
  })
  test('converts a string dora tile to a number', () => {
    expect(convertStringTileToNumber('4-dora')).toBe(4)
  })
})

describe('is5Tile', () => {
  test('returns true if the tile is a 5', () => {
    expect(is5Tile('4')).toBeTruthy()
    expect(is5Tile('4-dora')).toBeTruthy()
    expect(is5Tile('13')).toBeTruthy()
  })
  test('returns false if the tile is not a 5', () => {
    expect(is5Tile('0')).toBeFalsy()
    expect(is5Tile('27')).toBeFalsy()
    expect(is5Tile('31')).toBeFalsy()
  })
})
