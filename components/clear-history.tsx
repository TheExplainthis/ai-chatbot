'use client'
import * as React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { QueryKeys } from '@/request/keys'

export default function ClearHistoryButton() {
  const queryClient = useQueryClient()

  return (
    <Button
      onClick={() => {
        queryClient.resetQueries({
          queryKey: [QueryKeys.CHAT_HISTORY],
          exact: true
        })
      }}
    >
      清除對話
    </Button>
  )
}
