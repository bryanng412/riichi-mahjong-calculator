import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Riichi Mahjong Calculator',
    short_name: 'Riichi Mahjong Calculator',
    description: 'A Japanese Mahjong Calculator',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
