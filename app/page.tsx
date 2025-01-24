'use client'

import { VStack } from '@chakra-ui/react'
import HandDisplay from '@/components/HandDisplay'
import TileGrid from '@/components/TileGrid'
import DoraIndicators from '@/components/DoraIndicators'
import Winds from '@/components/Winds'
import YakuOptions from '@/components/YakuOptions'

export default function Home() {
  return (
    <VStack padding="2">
      <HandDisplay />
      <DoraIndicators />
      <Winds />
      <YakuOptions />
      <TileGrid />
      {/* <CalculationResults /> */}
    </VStack>
  )
}
