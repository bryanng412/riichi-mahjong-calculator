import { Flex } from '@chakra-ui/react'
import { useBoundStore } from '@/store/boundStore'
import { ActiveField } from '@/store/activeFieldSlice'
import Tile from './Tile'

const HandDisplay = () => {
  const { setActiveField, tiles, removeTile, activeField } = useBoundStore()
  const getTileOnClick = (i: number) => () => {
    removeTile(i)
    setActiveField(ActiveField.Hand)
  }
  const displayOnClick = () => setActiveField(ActiveField.Hand)
  const borderColor =
    activeField === ActiveField.Hand
      ? 'colorPalette.focusRing'
      : 'colorPalette.border'

  return (
    <Flex
      width={['100%', null, '50%']}
      minHeight={[50, null, 170]}
      borderWidth="2px"
      borderRadius="sm"
      paddingX="3"
      paddingY="3"
      justifyContent="center"
      alignItems="center"
      wrap="wrap"
      cursor="pointer"
      onClick={displayOnClick}
      borderColor={borderColor}
    >
      {tiles.map((t, i) => (
        <Tile tileId={t} key={`${t}-${i}`} onClick={getTileOnClick(i)} />
      ))}
    </Flex>
  )
}

export default HandDisplay
