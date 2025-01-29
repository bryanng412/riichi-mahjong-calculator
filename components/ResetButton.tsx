import { ActiveField } from '@/store/activeFieldSlice'
import { useBoundStore } from '@/store/boundStore'
import { Button } from '@chakra-ui/react'

const ResetButton = () => {
  const {
    setActiveField,
    resetYakuFlags,
    clearTiles,
    clearDora,
    setWinningTile,
  } = useBoundStore()

  const onClick = () => {
    setActiveField(ActiveField.Hand)
    resetYakuFlags()
    clearTiles()
    clearDora()
    setWinningTile('')
  }

  return (
    <Button
      onClick={onClick}
      paddingX={4}
      rounded="l2"
      bg="red.600"
      _hover={{ bg: 'red.700' }}
      _active={{
        bg: 'red.700',
        transform: 'scale(0.98)',
      }}
    >
      Reset
    </Button>
  )
}

export default ResetButton
