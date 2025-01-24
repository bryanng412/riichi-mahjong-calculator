'use client'

import { VStack } from '@chakra-ui/react'
import HandDisplay from '@/components/HandDisplay'
import TileGrid from '@/components/TileGrid'
import DoraIndicators from '@/components/DoraIndicators'

export default function Home() {
  return (
    <VStack padding="2">
      <HandDisplay />
      <TileGrid />
      <DoraIndicators />
      {/* <Winds /> */}
      {/* <YakuOptions /> */}
      {/* <CalculationResults /> */}
    </VStack>
  )
}
