'use client'

import { VStack } from '@chakra-ui/react'
import TileGrid from '@/components/TileGrid'

export default function Home() {
  return (
    <VStack paddingX="2">
      {/* <HandDisplay /> */}
      {/* <DoraIndicators /> */}
      {/* <Winds /> */}
      {/* <YakuOptions /> */}
      <TileGrid />
      {/* <CalculationResults /> */}
    </VStack>
  )
}
