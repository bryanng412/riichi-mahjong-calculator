import { Flex } from '@chakra-ui/react'
import Tile from './Tile'
import { useBoundStore } from '@/store/boundStore'
import { ActiveField } from '@/store/activeFieldSlice'

const Winds = () => {
  const { roundWind, seatWind, setActiveField, activeField } = useBoundStore()

  const roundWindOnClick = () => setActiveField(ActiveField.RoundWind)
  const seatWindOnClick = () => setActiveField(ActiveField.SeatWind)
  const showRoundWindBorder = activeField === ActiveField.RoundWind
  const showSeatWindBorder = activeField === ActiveField.SeatWind

  return (
    <Flex
      justifyContent="space-around"
      alignItems="center"
      width={['100%', null, '50%']}
      minHeight={[50, null, 170]}
    >
      <Tile
        tileId={roundWind}
        onClick={roundWindOnClick}
        showBorder={showRoundWindBorder}
      />
      <Tile
        tileId={seatWind}
        onClick={seatWindOnClick}
        showBorder={showSeatWindBorder}
      />
    </Flex>
  )
}

export default Winds
