import { BoundState } from '@/store/boundStore'
import { calculateHand, numberToPrefix } from '@/utils/tiles'
import { Separator, Table, Text } from '@chakra-ui/react'
import { memo } from 'react'

interface CalculationsProps {
  calcData: BoundState
}

const Calculations = ({ calcData }: CalculationsProps) => {
  const results = calculateHand(calcData)

  return results.map(
    ({ error, yaku, han, ten, yakuman }) =>
      !error &&
      ten > 0 &&
      (yakuman === 0 ? (
        <>
          <Table.Root width={['100%', null, '60%']} size="lg" marginY="3">
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
                  <Table.Cell>{y}</Table.Cell>
                  <Table.Cell textAlign="end">{yaku[y]}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
          <Text textStyle="xl" fontWeight="medium" textAlign="center">
            {han} Han
          </Text>
          <Text textStyle="xl" fontWeight="medium" textAlign="center">
            {ten}
          </Text>
        </>
      ) : (
        <>
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
              {y}
            </Text>
          ))}
          <Separator size="md" width={['100%', null, '60%']} />
          {yakuman > 1 && (
            <Text textStyle="xl" fontWeight="medium" textAlign="center">
              {numberToPrefix(yakuman)} Yakuman
            </Text>
          )}
          <Text textStyle="xl" fontWeight="medium" textAlign="center">
            {ten}
          </Text>
        </>
      ))
  )
}

export default memo(Calculations)
