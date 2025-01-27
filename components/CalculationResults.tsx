import { BoundState, useBoundStoreBase } from '@/store/boundStore'
import { CALC_HAND_SIZE_THRESHOLD } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'

const CalculationResults = () => {
  const initialState = useBoundStoreBase.getState()
  const [calcData, setCalcData] = useState<Partial<BoundState>>(initialState)

  useEffect(() => {
    const unsubscribe = useBoundStoreBase.subscribe(
      state => state,
      (currentState, prevState) => {
        if (
          prevState.tiles.length < CALC_HAND_SIZE_THRESHOLD &&
          currentState.tiles.length >= CALC_HAND_SIZE_THRESHOLD
        ) {
          setCalcData(currentState)
        } else if (
          prevState.tiles.length >= CALC_HAND_SIZE_THRESHOLD &&
          currentState.tiles.length < CALC_HAND_SIZE_THRESHOLD
        ) {
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
