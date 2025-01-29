import { useBoundStore } from '@/store/boundStore'
import { Flex } from '@chakra-ui/react'
import { CheckboxCard } from './ui/checkbox-card'

const YakuOptions = () => {
  const {
    isRiichi,
    isIppatsu,
    isTsumo,
    isHandOpen,
    isHaiteiHotei,
    isRinshan,
    setYakuFlag,
  } = useBoundStore()

  return (
    <Flex gap={2} justifyContent="center" alignItems="center" wrap="wrap">
      <CheckboxCard
        label="Riichi"
        checked={isRiichi}
        inputProps={{
          onClick: () => {
            if (isHandOpen) {
              setYakuFlag('isHandOpen', false)
            }
            setYakuFlag('isRiichi', !isRiichi)
          },
        }}
      />
      <CheckboxCard
        label="Ippatsu"
        checked={isIppatsu}
        inputProps={{
          onClick: () => {
            if (!isRiichi && !isIppatsu) {
              setYakuFlag('isRiichi', true)
            }
            if (isHandOpen) {
              setYakuFlag('isHandOpen', false)
            }
            setYakuFlag('isIppatsu', !isIppatsu)
          },
        }}
      />
      <CheckboxCard
        label="Tsumo"
        checked={isTsumo}
        inputProps={{
          onClick: () => setYakuFlag('isTsumo', !isTsumo),
        }}
      />
      <CheckboxCard
        label="Hand Open"
        checked={isHandOpen}
        inputProps={{
          onClick: () => {
            if (isRiichi) {
              setYakuFlag('isRiichi', false)
            }
            if (isIppatsu) {
              setYakuFlag('isIppatsu', false)
            }
            setYakuFlag('isHandOpen', !isHandOpen)
          },
        }}
      />
      <CheckboxCard
        label="Haitei/Hotei"
        checked={isHaiteiHotei}
        inputProps={{
          onClick: () => setYakuFlag('isHaiteiHotei', !isHaiteiHotei),
        }}
      />
      <CheckboxCard
        label="Rinshan/Chankan"
        checked={isRinshan}
        inputProps={{
          onClick: () => setYakuFlag('isRinshan', !isRinshan),
        }}
      />
    </Flex>
  )
}

export default YakuOptions
