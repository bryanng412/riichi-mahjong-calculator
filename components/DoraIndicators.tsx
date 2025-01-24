import { Flex } from '@chakra-ui/react'
import { ActiveField } from '@/store/activeFieldSlice'
import { useBoundStore } from '@/store/boundStore'
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
      onClick={doraDisplayOnClick}
      borderColor={borderColor}
    >
      {dora.map((t, i) => (
        <Tile tileId={t} key={`${t}-${i}`} onClick={getDoraOnClick(i)} />
      ))}
    </Flex>
  )
}

export default DoraIndicators
