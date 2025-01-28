import { ActiveField } from '@/store/activeFieldSlice'
import { useBoundStore } from '@/store/boundStore'
import { Flex, Text } from '@chakra-ui/react'
import Tile from './Tile'

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
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Text textWrap="nowrap">Round Wind</Text>
        <Tile
          tileId={roundWind}
          onClick={roundWindOnClick}
          showBorder={showRoundWindBorder}
          tabIndex={-1}
        />
      </Flex>
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Text textWrap="nowrap">Seat Wind</Text>
        <Tile
          tileId={seatWind}
          onClick={seatWindOnClick}
          showBorder={showSeatWindBorder}
          tabIndex={-1}
        />
      </Flex>
    </Flex>
  )
}

export default Winds
