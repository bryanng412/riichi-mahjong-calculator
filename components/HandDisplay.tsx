import { Flex } from '@chakra-ui/react'
import { useBoundStore } from '@/store/boundStore'
import { ActiveField } from '@/store/activeFieldSlice'
import Tile from './Tile'

const HandDisplay = () => {
  const { setActiveField, tiles, removeTile } = useBoundStore()
  const getTileOnClick = (i: number) => () => () => {
    removeTile(i)
    setActiveField(ActiveField.Hand)
  }
  const displayOnClick = () => setActiveField(ActiveField.Hand)

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
      cursor="pointer"
      onClick={displayOnClick}
    >
      {tiles.map((t, i) => (
        <Tile tileId={t} key={`${t}-${i}`} getOnClick={getTileOnClick(i)} />
      ))}
    </Flex>
  )
}

export default HandDisplay
