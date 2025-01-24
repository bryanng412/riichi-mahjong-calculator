import { Fragment } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import Tile from './Tile'
import { is5Tile } from '@/utils/tiles'
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
      {[...Array(34).keys()].map(i =>
        is5Tile(i) ? (
          <Fragment key={i}>
            <Tile tileId={i.toString()} getOnClick={getTileOnClick} />
            <Tile tileId={`${i}-dora`} getOnClick={getTileOnClick} />
          </Fragment>
        ) : (
          <Tile tileId={i.toString()} key={i} getOnClick={getTileOnClick} />
        )
      )}
    </SimpleGrid>
  )
}

export default TileGrid
