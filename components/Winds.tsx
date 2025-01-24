import { Flex } from '@chakra-ui/react'
import Tile from './Tile'
import { useBoundStore } from '@/store/boundStore'
import { ActiveField } from '@/store/activeFieldSlice'

const Winds = () => {
  const { roundWind, seatWind, setActiveField } = useBoundStore()

  const roundWindOnClick = () => setActiveField(ActiveField.RoundWind)
  const seatWindOnClick = () => setActiveField(ActiveField.SeatWind)

  return (
    <Flex
      justifyContent="space-around"
      alignItems="center"
      width={['100%', null, '50%']}
      minHeight={170}
    >
      <Tile tileId={roundWind} onClick={roundWindOnClick} />
      <Tile tileId={seatWind} onClick={seatWindOnClick} />
    </Flex>
  )
}

export default Winds
