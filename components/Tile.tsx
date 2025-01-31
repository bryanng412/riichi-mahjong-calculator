import { TILE_IMAGE_HEIGHT, TILE_IMAGE_WIDTH } from '@/utils/constants'
import { Box, BoxProps } from '@chakra-ui/react'
import Image from 'next/image'
import { useColorMode } from './ui/color-mode'

interface TileProps {
  tileId: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
  isSmall?: boolean
}

const Tile = ({
  tileId,
  onClick,
  isSmall = false,
  ...rest
}: TileProps & BoxProps) => {
  const { colorMode } = useColorMode()
  const imagePath = `/tiles/${colorMode === 'light' ? 'regular' : 'dark'}/${tileId}.svg`

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

  const mobileWidth = isSmall ? 45 : 65
  const padding = isSmall ? 1 : 2
  const borderRadius = isSmall ? 'sm' : 'lg'

  return (
    <Box
      width={[mobileWidth, null, 100]}
      maxW="sm"
      shadow="md"
      borderRadius={borderRadius}
      padding={padding}
      margin=".5"
      backgroundColor="bg"
      border="1px solid"
      borderColor="colorPalette.muted"
      {...buttonProps}
      {...rest}
    >
      <Image
        src={imagePath}
        alt="tile"
        width={TILE_IMAGE_WIDTH}
        height={TILE_IMAGE_HEIGHT}
        draggable="false"
      />
    </Box>
  )
}

export default Tile
