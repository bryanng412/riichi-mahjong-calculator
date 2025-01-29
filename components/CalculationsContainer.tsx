import { useBoundStore, useBoundStoreBase } from '@/store/boundStore'
import { MIN_HAND_SIZE } from '@/utils/constants'
import { Spinner } from '@chakra-ui/react'
import { lazy, Suspense, useDeferredValue, useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'
const Calculations = lazy(() => import('./Calculations'))

const CalculationsContainer = () => {
  const boundState = useBoundStore()
  const shouldShowCalcDataOnMount =
    boundState.tiles.length === MIN_HAND_SIZE && boundState.winningTile !== ''
  const [showCalcData, setShowCalcData] = useState(shouldShowCalcDataOnMount)
  const deferredCalcData = useDeferredValue(boundState)

  useEffect(() => {
    const unsubscribe = useBoundStoreBase.subscribe(
      state => state,
      (currentState, prevState) => {
        const isLastTileToHand =
          prevState.tiles.length < MIN_HAND_SIZE &&
          currentState.tiles.length === MIN_HAND_SIZE &&
          currentState.winningTile !== ''
        const isLastTileWinningTile =
          currentState.tiles.length === MIN_HAND_SIZE &&
          prevState.winningTile === '' &&
          currentState.winningTile !== ''
        const isWinningTileChanging =
          currentState.winningTile !== '' &&
          prevState.winningTile !== currentState.winningTile

        const isRemovingTileFromHand = currentState.tiles.length < MIN_HAND_SIZE
        const isRemovingWinningTile = currentState.winningTile === ''

        if (
          isLastTileToHand ||
          isLastTileWinningTile ||
          isWinningTileChanging
        ) {
          setShowCalcData(true)
        } else if (isRemovingTileFromHand || isRemovingWinningTile) {
          setShowCalcData(false)
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
    showCalcData && (
      <Suspense fallback={<Spinner />}>
        <Calculations calcData={deferredCalcData} />
      </Suspense>
    )
  )
}

export default CalculationsContainer
