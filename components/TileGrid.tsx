import { Fragment } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import Tile from './Tile'
import { is5Tile } from '@/utils/tiles'

const TileGrid = () => {
  return (
    <SimpleGrid columns={[6, null, 10]}>
      {[...Array(34).keys()].map(i =>
        is5Tile(i) ? (
          <Fragment key={i}>
            <Tile tileId={i} />
            <Tile tileId={i} isDora={true} />
          </Fragment>
        ) : (
          <Tile tileId={i} key={i} />
        )
      )}
    </SimpleGrid>
  )
}

export default TileGrid
