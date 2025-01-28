'use client'

import CalculationsContainer from '@/components/CalculationsContainer'
import DoraIndicators from '@/components/DoraIndicators'
import HandDisplay from '@/components/HandDisplay'
import TileGrid from '@/components/TileGrid'
import Winds from '@/components/Winds'
import YakuOptions from '@/components/YakuOptions'
import { VStack } from '@chakra-ui/react'

export default function Home() {
  return (
    <VStack padding="2">
      <HandDisplay />
      <DoraIndicators />
      <Winds />
      <YakuOptions />
      <TileGrid />
      <CalculationsContainer />
    </VStack>
  )
}
