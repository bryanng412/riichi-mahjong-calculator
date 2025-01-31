import { BoundState } from '@/store/boundStore'
import { calculateHand, getHanName, numberToPrefix } from '@/utils/tiles'
import { YakuInfo } from '@/utils/tooltips'
import { Separator, Table, Text } from '@chakra-ui/react'
import { Fragment, memo } from 'react'
import CalculationTileDisplay from './CalculationTileDisplay'
import { InfoTip } from './ui/toggle-tip'

interface CalculationsProps {
  calcData: BoundState
}

const Calculations = ({ calcData }: CalculationsProps) => {
  const results = calculateHand(calcData)

  return results.map(
    ({ result: { error, yaku, han, ten, yakuman, fu }, hand }, i) => {
      const hanName = getHanName(han, fu)

      return (
        !error &&
        ten > 0 &&
        (yakuman === 0 ? (
          <Fragment key={i}>
            <Table.Root width={['100%', null, '70%']} size="lg" marginY="3">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader fontWeight="semibold">
                    Yaku
                  </Table.ColumnHeader>
                  <Table.ColumnHeader fontWeight="semibold" textAlign="end">
                    Han
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {Object.keys(yaku).map((y, i) => (
                  <Table.Row key={`${y}-${i}`}>
                    <Table.Cell>
                      {YakuInfo[y as keyof typeof YakuInfo].en}
                      <InfoTip
                        content={YakuInfo[y as keyof typeof YakuInfo].tooltipEN}
                      />
                    </Table.Cell>
                    <Table.Cell textAlign="end">{yaku[y]}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
            <CalculationTileDisplay hand={hand} />
            <Text textStyle="xl" fontWeight="medium" textAlign="center">
              {han} Han{fu > 0 && ` ${fu} Fu`}
              {hanName && ` - ${hanName}`}
            </Text>
            <Text textStyle="xl" fontWeight="medium" textAlign="center">
              {ten}
            </Text>
          </Fragment>
        ) : (
          <Fragment key={i}>
            <Text textStyle="xl" fontWeight="medium" textAlign="center">
              Yakuman
            </Text>
            <Separator size="md" width={['100%', null, '60%']} />
            {Object.keys(yaku).map((y, i) => (
              <Text
                key={`${y}-${i}`}
                textStyle="xl"
                fontWeight="medium"
                textAlign="center"
              >
                {YakuInfo[y as keyof typeof YakuInfo].en}
                <InfoTip
                  content={YakuInfo[y as keyof typeof YakuInfo].tooltipEN}
                />
              </Text>
            ))}
            <Separator size="md" width={['100%', null, '60%']} />
            <CalculationTileDisplay hand={hand} />
            {yakuman > 1 && (
              <Text textStyle="xl" fontWeight="medium" textAlign="center">
                {numberToPrefix(yakuman)} Yakuman
              </Text>
            )}
            <Text textStyle="xl" fontWeight="medium" textAlign="center">
              {ten}
            </Text>
          </Fragment>
        ))
      )
    }
  )
}

export default memo(Calculations)
