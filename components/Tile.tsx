import { Box } from '@chakra-ui/react'
import Image from 'next/image'

const TILE_WIDTH = 75
const TILE_HEIGHT = 100

interface TileProps {
  tileId: number
  isDora?: boolean
}

const Tile = ({ tileId, isDora = false }: TileProps) => {
  const imagePath = `/tiles/regular/${tileId}${isDora ? '-dora' : ''}.svg`

  return (
    <Box
      maxW="sm"
      shadow="md"
      borderRadius="lg"
      padding="2"
      as="button"
      cursor="pointer"
    >
      <Image
        src={imagePath}
        alt="test"
        width={TILE_WIDTH}
        height={TILE_HEIGHT}
      />
    </Box>
  )
}

export default Tile
