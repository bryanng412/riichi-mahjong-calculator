import { useBoundStore } from '@/store/boundStore'
import { Flex } from '@chakra-ui/react'
import { CheckboxCard } from './ui/checkbox-card'

const YakuOptions = () => {
  const {
    isRiichi,
    isIppatsu,
    isMenzenTsumo,
    isHandOpen,
    isHaiteiHotei,
    isRinshan,
    toggleYakuFlag,
  } = useBoundStore()

  return (
    <Flex gap={2} justifyContent="center" alignItems="center" wrap="wrap">
      <CheckboxCard
        label="Riichi"
        checked={isRiichi}
        onChange={() => toggleYakuFlag('isRiichi')}
      />
      <CheckboxCard
        label="Ippatsu"
        checked={isIppatsu}
        onChange={() => toggleYakuFlag('isIppatsu')}
      />
      <CheckboxCard
        label="Tsumo"
        checked={isMenzenTsumo}
        onChange={() => toggleYakuFlag('isMenzenTsumo')}
      />
      <CheckboxCard
        label="Hand Open"
        checked={isHandOpen}
        onChange={() => toggleYakuFlag('isHandOpen')}
      />
      <CheckboxCard
        label="Haitei/Hotei"
        checked={isHaiteiHotei}
        onChange={() => toggleYakuFlag('isHaiteiHotei')}
      />
      <CheckboxCard
        label="Rinshan/Chankan"
        checked={isRinshan}
        onChange={() => toggleYakuFlag('isRinshan')}
      />
    </Flex>
  )
}

export default YakuOptions
