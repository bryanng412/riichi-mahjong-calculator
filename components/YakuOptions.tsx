import { useBoundStore } from '@/store/boundStore'
import { YakuInfo } from '@/utils/tooltips'
import { Flex, Text } from '@chakra-ui/react'
import { CheckboxCard } from './ui/checkbox-card'
import { InfoTip } from './ui/toggle-tip'

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
        label={
          <>
            Riichi <InfoTip content={YakuInfo['riichi'].tooltipEN} />
          </>
        }
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
        label={
          <>
            Ippatsu <InfoTip content={YakuInfo['ippatsu'].tooltipEN} />
          </>
        }
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
        label={
          <>
            Haitei/Hotei
            <InfoTip
              content={
                <>
                  <Text>Haitei: {YakuInfo['haitei'].tooltipEN}</Text>
                  <Text marginTop={2}>
                    Houtei: {YakuInfo['houtei'].tooltipEN}
                  </Text>
                </>
              }
            />
          </>
        }
        checked={isHaiteiHotei}
        inputProps={{
          onClick: () => setYakuFlag('isHaiteiHotei', !isHaiteiHotei),
        }}
      />
      <CheckboxCard
        label={
          <>
            Rinshan/Chankan
            <InfoTip
              content={
                <>
                  <Text>Rinshan: {YakuInfo['rinshan'].tooltipEN}</Text>
                  <Text marginTop={2}>
                    Chankan: {YakuInfo['chankan'].tooltipEN}
                  </Text>
                </>
              }
            />
          </>
        }
        checked={isRinshan}
        inputProps={{
          onClick: () => setYakuFlag('isRinshan', !isRinshan),
        }}
      />
    </Flex>
  )
}

export default YakuOptions
