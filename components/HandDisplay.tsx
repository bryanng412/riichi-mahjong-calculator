import { ActiveField } from '@/store/activeFieldSlice'
import { useBoundStore } from '@/store/boundStore'
import { Flex } from '@chakra-ui/react'
import Tile from './Tile'
import WinningTile from './WinningTile'

const HandDisplay = () => {
  const { setActiveField, tiles, removeTile, activeField } = useBoundStore()
  const getHandTileOnClick = (i: number) => () => {
    removeTile(i)
    setActiveField(ActiveField.Hand)
  }
  const displayOnClick = () => setActiveField(ActiveField.Hand)
  const handDisplayBorderColor =
    activeField === ActiveField.Hand
      ? 'colorPalette.focusRing'
      : 'colorPalette.border'

  return (
    <Flex
      width={['100%', null, '55%']}
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
      borderColor={handDisplayBorderColor}
    >
      {tiles.map((t, i) => (
        <Tile tileId={t} key={`${t}-${i}`} onClick={getHandTileOnClick(i)} />
      ))}
      <WinningTile />
    </Flex>
  )
}

export default HandDisplay
