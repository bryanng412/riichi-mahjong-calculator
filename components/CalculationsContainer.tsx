import { BoundState, useBoundStoreBase } from '@/store/boundStore'
import { HAND_SIZE } from '@/utils/constants'
import { Spinner } from '@chakra-ui/react'
import { lazy, Suspense, useDeferredValue, useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'
const Calculations = lazy(() => import('./Calculations'))

const CalculationsContainer = () => {
  const initialState = useBoundStoreBase.getState()
  const [calcData, setCalcData] = useState<BoundState | null>(initialState)
  const deferredCalcData = useDeferredValue(calcData)

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
          setCalcData(null)
        }
      },
      {
        equalityFn: shallow,
        fireImmediately: true,
      }
    )

    return unsubscribe
  }, [])

  return (
    deferredCalcData && (
      <Suspense fallback={<Spinner />}>
        <Calculations calcData={deferredCalcData} />
      </Suspense>
    )
  )
}

export default CalculationsContainer
