import { BoundState } from '@/store/boundStore'
import { calculateHand } from '@/utils/tiles'
import { memo } from 'react'

interface CalculationsProps {
  calcData: BoundState
}

const Calculations = ({ calcData }: CalculationsProps) => {
  const riichiResult = calculateHand(calcData)

  return (
    !riichiResult.error && (
      <div>
        {Math.random()}
        HAN
        {riichiResult.han}
      </div>
    )
  )
}

export default memo(Calculations)
