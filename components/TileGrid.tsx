import { SimpleGrid } from '@chakra-ui/react'
import Tile from './Tile'
import { generateAllTiles, isWindTile } from '@/utils/tiles'
import { useBoundStore } from '@/store/boundStore'
import { ActiveField } from '@/store/activeFieldSlice'
import { Wind } from '@/store/windSlice'

const TileGrid = () => {
  const { activeField, addTile, addDora, setRoundWind, setSeatWind } =
    useBoundStore()

  const getTileOnClick = (tileId: string) => () => {
    if (activeField === ActiveField.Hand) {
      addTile(tileId)
    } else if (activeField === ActiveField.Dora) {
      addDora(tileId)
    } else if (isWindTile(tileId)) {
      if (activeField === ActiveField.RoundWind) {
        setRoundWind(tileId as Wind)
      } else if (activeField === ActiveField.SeatWind) {
        setSeatWind(tileId as Wind)
      }
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
