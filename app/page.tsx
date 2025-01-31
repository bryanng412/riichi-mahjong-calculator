'use client'

import CalculationsContainer from '@/components/CalculationsContainer'
import DoraIndicators from '@/components/DoraIndicators'
import HandDisplay from '@/components/HandDisplay'
import Options from '@/components/Options'
import ResetButton from '@/components/ResetButton'
import TileGrid from '@/components/TileGrid'
import Winds from '@/components/Winds'
import YakuOptions from '@/components/YakuOptions'
import { useBoundStoreBase } from '@/store/boundStore'
import { HStack, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export default function Home() {
  const [hasHydrated, setHasHydrated] = useState(false)
  useEffect(() => {
    useBoundStoreBase.persist.rehydrate()
    const unsubHydrate = useBoundStoreBase.persist.onHydrate(() =>
      setHasHydrated(false)
    )
    const unsubFinishHydration = useBoundStoreBase.persist.onFinishHydration(
      () => setHasHydrated(true)
    )
    setHasHydrated(useBoundStoreBase.persist.hasHydrated())

    return () => {
      unsubHydrate()
      unsubFinishHydration()
    }
  }, [])

  if (!hasHydrated) {
    return null
  }

  return (
    <VStack padding="2" height="100vh" paddingBottom="15%" overflow="auto">
      <HandDisplay />
      <DoraIndicators />
      <Winds />
      <YakuOptions />
      <TileGrid />
      <HStack
        justifyContent="space-around"
        alignItems="center"
        gap={[3, null, 10]}
        marginTop={4}
      >
        <ResetButton />
        <Options />
      </HStack>
      <CalculationsContainer />
    </VStack>
  )
}
