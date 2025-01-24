import { SimpleGrid } from '@chakra-ui/react'
import Tile from './Tile'
import { generateAllTiles } from '@/utils/tiles'
import { useBoundStore } from '@/store/boundStore'
import { ActiveField } from '@/store/activeFieldSlice'

const TileGrid = () => {
  const { activeField, addTile, addDora } = useBoundStore()

  const getTileOnClick = (tileId: string) => () => {
    if (activeField === ActiveField.Hand) {
      addTile(tileId)
    } else if (activeField === ActiveField.Dora) {
      addDora(tileId)
    }
  }

  return (
    <SimpleGrid columns={[6, null, 10]}>
      {generateAllTiles().map((tileId, i) => (
        <Tile
          key={`${tileId}-${i}`}
          tileId={tileId}
          onClick={getTileOnClick(tileId)}
        />
      ))}
    </SimpleGrid>
  )
}

export default TileGrid
