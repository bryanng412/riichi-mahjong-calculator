import { BoundState, useBoundStoreBase } from '@/store/boundStore'
import { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'

const HAND_SIZE_THRESHOLD = 14

const CalculationResults = () => {
  const initialState = useBoundStoreBase.getState()
  const [calcData, setCalcData] = useState<Partial<BoundState>>(initialState)
  console.log(calcData)

  useEffect(() => {
    const unsubscribe = useBoundStoreBase.subscribe(
      state => state,
      (currentState, prevState) => {
        if (
          prevState.tiles.length < HAND_SIZE_THRESHOLD &&
          currentState.tiles.length >= HAND_SIZE_THRESHOLD
        ) {
          setCalcData(currentState)
        } else if (
          prevState.tiles.length >= HAND_SIZE_THRESHOLD &&
          currentState.tiles.length < HAND_SIZE_THRESHOLD
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
