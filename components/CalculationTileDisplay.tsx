import { HStack, SimpleGrid } from '@chakra-ui/react'
import Tile from './Tile'

interface CalculationTileDisplayProps {
  hand: number[][]
}

const CalculationTileDisplay = ({ hand }: CalculationTileDisplayProps) => (
  <SimpleGrid
    width={['100%', null, 'auto']}
    columns={[
      hand.filter(meld => meld.length === 4).length > 0 ? 2 : 3,
      null,
      5,
    ]}
    gap={[2, null, 3]}
  >
    {hand.map((meld, i) => (
      <HStack key={i} gap={0}>
        {meld.map((tile, i) => (
          <Tile key={`${tile}-${i}`} tileId={tile.toString()} isSmall />
        ))}
      </HStack>
    ))}
  </SimpleGrid>
)

export default CalculationTileDisplay
