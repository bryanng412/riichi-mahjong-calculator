import { Flex } from '@chakra-ui/react'
import { useBoundStore } from '@/store/boundStore'
import Tile from './Tile'

const HandDisplay = () => {
  const { tiles, removeTile } = useBoundStore()
  const getTileOnClick = (i: number) => () => () => {
    removeTile(i)
  }

  return (
    <Flex
      width={['100%', null, '50%']}
      minHeight={170}
      borderWidth="2px"
      borderRadius="sm"
      paddingX="3"
      paddingY="3"
      justifyContent="center"
      alignItems="center"
      wrap="wrap"
    >
      {tiles.map((t, i) => (
        <Tile tileId={t} key={`${t}-${i}`} getOnClick={getTileOnClick(i)} />
      ))}
    </Flex>
  )
}

export default HandDisplay
