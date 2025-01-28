import { ActiveField } from '@/store/activeFieldSlice'
import { useBoundStore } from '@/store/boundStore'
import { generateAllTiles } from '@/utils/tiles'
import { SimpleGrid } from '@chakra-ui/react'
import Tile from './Tile'

const TileGrid = () => {
  const { activeField, addTile, addDora, setWinningTile } = useBoundStore()

  const getTileOnClick = (tileId: string) => () => {
    if (activeField === ActiveField.Hand) {
      addTile(tileId)
    } else if (activeField === ActiveField.Dora) {
      addDora(tileId)
    } else if (activeField === ActiveField.WinningTile) {
      setWinningTile(tileId)
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
