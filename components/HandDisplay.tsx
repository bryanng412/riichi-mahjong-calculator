import { ActiveField } from '@/store/activeFieldSlice'
import { useBoundStore } from '@/store/boundStore'
import { MIN_HAND_SIZE } from '@/utils/constants'
import { Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Tile from './Tile'
import WinningTile from './WinningTile'

const HandDisplay = () => {
  const { setActiveField, tiles, removeTile, activeField, setWinningTile } =
    useBoundStore()
  const [showWinningTileField, setShowWinningTileField] = useState(
    tiles.length >= MIN_HAND_SIZE
  )
  const getHandTileOnClick = (i: number) => () => {
    removeTile(i)
    setActiveField(ActiveField.Hand)
  }
  const displayOnClick = () => setActiveField(ActiveField.Hand)
  const handDisplayBorderColor =
    activeField === ActiveField.Hand
      ? 'colorPalette.focusRing'
      : 'colorPalette.border'

  useEffect(() => {
    if (tiles.length >= MIN_HAND_SIZE) {
      setShowWinningTileField(true)
      setActiveField(ActiveField.WinningTile)
    } else {
      setWinningTile('')
      setShowWinningTileField(false)
    }
  }, [tiles.length, setWinningTile, setActiveField])

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minWidth={['100%', null, '65%']}
      position="sticky"
      top="0"
      zIndex={1}
    >
      <Text backgroundColor="bg" width="100%" textAlign="center">
        Hand
      </Text>
      <Flex
        width="100%"
        backgroundColor="bg"
        minHeight={[100, null, 170]}
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
        {showWinningTileField && <WinningTile />}
      </Flex>
    </Flex>
  )
}

export default HandDisplay
