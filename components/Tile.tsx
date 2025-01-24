import { Box, BoxProps } from '@chakra-ui/react'
import Image from 'next/image'

const TILE_WIDTH = 75
const TILE_HEIGHT = 100

interface TileProps {
  tileId: string
  getOnClick?: (tileId: string) => () => void
}

const Tile = ({ tileId, getOnClick }: TileProps) => {
  const imagePath = `/tiles/regular/${tileId}.svg`

  const buttonProps: BoxProps = getOnClick
    ? {
        as: 'button',
        cursor: 'pointer',
        _active: {
          bg: '#dddfe2',
          transform: 'scale(0.98)',
        },
        onClick: getOnClick(tileId),
      }
    : {}

  return (
    <Box
      maxW="sm"
      shadow="md"
      borderRadius="lg"
      padding="2"
      margin="0.5"
      {...buttonProps}
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
