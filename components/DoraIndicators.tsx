import { ActiveField } from '@/store/activeFieldSlice'
import { useBoundStore } from '@/store/boundStore'
import { Flex, Text } from '@chakra-ui/react'
import Tile from './Tile'

const DoraIndicators = () => {
  const { setActiveField, dora, removeDora, activeField } = useBoundStore()
  const doraDisplayOnClick = () => setActiveField(ActiveField.Dora)
  const getDoraOnClick = (i: number) => () => {
    removeDora(i)
    setActiveField(ActiveField.Dora)
  }
  const borderColor =
    activeField === ActiveField.Dora
      ? 'colorPalette.focusRing'
      : 'colorPalette.border'

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minWidth={['100%', null, '65%']}
    >
      <Text>Dora Indicators</Text>
      <Flex
        backgroundColor="bg"
        width="100%"
        minHeight={[120, null, 170]}
        borderWidth="2px"
        borderRadius="sm"
        paddingX="3"
        paddingY="3"
        justifyContent="center"
        alignItems="center"
        wrap="wrap"
        cursor="pointer"
        onClick={doraDisplayOnClick}
        borderColor={borderColor}
      >
        {dora.map((t, i) => (
          <Tile tileId={t} key={`${t}-${i}`} onClick={getDoraOnClick(i)} />
        ))}
      </Flex>
    </Flex>
  )
}

export default DoraIndicators
