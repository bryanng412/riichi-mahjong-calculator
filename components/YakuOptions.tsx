import { useBoundStore } from '@/store/boundStore'
import { Flex } from '@chakra-ui/react'
import { CheckboxCard } from './ui/checkbox-card'

const YakuOptions = () => {
  const {
    isRiichi,
    isIppatsu,
    isMenzenTsumo,
    isHandOpen,
    isDoubleRiichi,
    isHaiteiHotei,
    isChankan,
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
        label="Menzen Tsumo"
        checked={isMenzenTsumo}
        onChange={() => toggleYakuFlag('isMenzenTsumo')}
      />
      <CheckboxCard
        label="Hand Open"
        checked={isHandOpen}
        onChange={() => toggleYakuFlag('isHandOpen')}
      />
      <CheckboxCard
        label="Double Riichi"
        checked={isDoubleRiichi}
        onChange={() => toggleYakuFlag('isDoubleRiichi')}
      />
      <CheckboxCard
        label="Haitei/Hotei"
        checked={isHaiteiHotei}
        onChange={() => toggleYakuFlag('isHaiteiHotei')}
      />
      <CheckboxCard
        label="Chankan"
        checked={isChankan}
        onChange={() => toggleYakuFlag('isChankan')}
      />
      <CheckboxCard
        label="Rinshan Kaihou"
        checked={isRinshan}
        onChange={() => toggleYakuFlag('isRinshan')}
      />
    </Flex>
  )
}

export default YakuOptions
