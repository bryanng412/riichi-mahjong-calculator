import { TILE_IMAGE_HEIGHT, TILE_IMAGE_WIDTH } from '@/utils/constants'
import { Box, BoxProps } from '@chakra-ui/react'
import Image from 'next/image'

interface TileProps {
  tileId: string
  onClick?: () => void
  showBorder?: boolean
}

const Tile = ({
  tileId,
  onClick,
  showBorder = false,
  ...rest
}: TileProps & BoxProps) => {
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
      width={[65, null, 100]}
      maxW="sm"
      shadow="md"
      borderRadius="lg"
      padding="2"
      margin="0.5"
      {...buttonProps}
      {...borderProps}
      {...rest}
    >
      <Image
        src={imagePath}
        alt="test"
        width={TILE_IMAGE_WIDTH}
        height={TILE_IMAGE_HEIGHT}
        draggable="false"
      />
    </Box>
  )
}

export default Tile
