import { Box, BoxProps } from '@chakra-ui/react'
import Image from 'next/image'

const TILE_WIDTH = 75
const TILE_HEIGHT = 100

interface TileProps {
  tileId: string
  onClick?: () => void
  showBorder?: boolean
}

const Tile = ({ tileId, onClick, showBorder = false }: TileProps) => {
  const imagePath = `/tiles/regular/${tileId}.svg`

  const buttonProps: BoxProps = onClick
    ? {
        as: 'button',
        cursor: 'pointer',
        _active: {
          bg: 'colorPalette.subtle',
          transform: 'scale(0.98)',
        },
        _hover: {
          bg: 'colorPalette.subtle',
        },
        onClick,
      }
    : {}

  const borderProps = showBorder
    ? {
        border: '1px solid',
        borderColor: 'colorPalette.focusRing',
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
      {...borderProps}
    >
      <Image
        src={imagePath}
        alt="test"
        width={TILE_WIDTH}
        height={TILE_HEIGHT}
        draggable="false"
      />
    </Box>
  )
}

export default Tile
