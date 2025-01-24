'use client'

import { VStack } from '@chakra-ui/react'
import TileGrid from '@/components/TileGrid'
import HandDisplay from '@/components/HandDisplay'

export default function Home() {
  return (
    <VStack padding="2">
      <HandDisplay />
      {/* <DoraIndicators /> */}
      {/* <Winds /> */}
      {/* <YakuOptions /> */}
      <TileGrid />
      {/* <CalculationResults /> */}
    </VStack>
  )
}
