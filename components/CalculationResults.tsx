import { BoundState, useBoundStoreBase } from '@/store/boundStore'
import { HAND_SIZE } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'

const CalculationResults = () => {
  const initialState = useBoundStoreBase.getState()
  const [calcData, setCalcData] = useState<Partial<BoundState>>(initialState)

  useEffect(() => {
    const unsubscribe = useBoundStoreBase.subscribe(
      state => state,
      (currentState, prevState) => {
        const isLastTileToHand =
          prevState.tiles.length < HAND_SIZE &&
          currentState.tiles.length === HAND_SIZE &&
          currentState.winningTile !== ''
        const isLastTileWinningTile =
          currentState.tiles.length === HAND_SIZE &&
          prevState.winningTile === '' &&
          currentState.winningTile !== ''

        const isRemovingTileFromHand = currentState.tiles.length < HAND_SIZE
        const isRemovingWinningTile = currentState.winningTile === ''

        if (isLastTileToHand || isLastTileWinningTile) {
          setCalcData(currentState)
        } else if (isRemovingTileFromHand || isRemovingWinningTile) {
          setCalcData({})
        }
      },
      {
        equalityFn: shallow,
        fireImmediately: true,
      }
    )

    return unsubscribe
  }, [])

  return <div></div>
}

export default CalculationResults
