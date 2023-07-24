'use client'

import * as React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

export default function Providers({ children }: { children: React.ReactNode }) {
  const localStoragePersister = createSyncStoragePersister({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  })

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
            retry: false
          }
        }
      })
  )

  persistQueryClient({
    queryClient,
    persister: localStoragePersister,
    maxAge: Infinity
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
