'use client'

import { ColorModeProvider } from '@/components/ui/color-mode'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <ColorModeProvider>{props.children}</ColorModeProvider>
      </ThemeProvider>
    </ChakraProvider>
  )
}
