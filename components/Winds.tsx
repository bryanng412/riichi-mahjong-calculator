import { useBoundStore } from '@/store/boundStore'
import { getNextWind } from '@/utils/tiles'
import { Flex, Text } from '@chakra-ui/react'
import Tile from './Tile'

const Winds = () => {
  const { roundWind, seatWind, setRoundWind, setSeatWind } = useBoundStore()
  const roundWindOnClick = () => setRoundWind(getNextWind(roundWind))
  const seatWindOnClick = () => setSeatWind(getNextWind(seatWind))

  return (
    <Flex
      justifyContent="space-around"
      alignItems="center"
      width={['100%', null, '50%']}
      minHeight="auto"
    >
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Text textWrap="nowrap">Round Wind</Text>
        <Tile tileId={roundWind} onClick={roundWindOnClick} />
      </Flex>
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Text textWrap="nowrap">Seat Wind</Text>
        <Tile tileId={seatWind} onClick={seatWindOnClick} />
      </Flex>
    </Flex>
  )
}

export default Winds
