import { ActiveField } from '@/store/activeFieldSlice'
import { useBoundStore } from '@/store/boundStore'
import { Flex } from '@chakra-ui/react'
import Tile from './Tile'

const WinningTile = () => {
  const { activeField, setActiveField, winningTile, setWinningTile } =
    useBoundStore()

  const getWinningTileOnClick: React.MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation()
    setWinningTile('')
  }
  const winningTileDisplayOnClick: React.MouseEventHandler<
    HTMLDivElement
  > = e => {
    e.stopPropagation()
    setActiveField(ActiveField.WinningTile)
  }
  const winningTileBorderColor =
    activeField === ActiveField.WinningTile
      ? 'colorPalette.focusRing'
      : 'colorPalette.border'

  return (
    <Flex
      width={[85, null, 145]}
      minHeight={['90px', null, 170]}
      borderWidth="2px"
      borderRadius="lg"
      borderColor={winningTileBorderColor}
      onClick={winningTileDisplayOnClick}
      cursor="pointer"
      margin={[0, null, 1]}
      padding={[2, null, 3]}
      position="relative"
    >
      {winningTile !== '' && (
        <Tile tileId={winningTile} onClick={getWinningTileOnClick} />
      )}
    </Flex>
  )
}

export default WinningTile
