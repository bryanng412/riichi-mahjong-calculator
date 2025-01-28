import { ActiveField } from '@/store/activeFieldSlice'
import { useBoundStore } from '@/store/boundStore'
import { Flex, Text } from '@chakra-ui/react'
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
    activeField === ActiveField.Hand ? 'secondary' : 'border'

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
        <WinningTile />
      </Flex>
    </Flex>
  )
}

export default HandDisplay
