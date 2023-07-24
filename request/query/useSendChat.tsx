import { nanoid } from 'nanoid'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { decodeAIStreamChunk } from '@/lib/utils'
import { Message, SendChatRequest } from '@/request/types'
import { QueryKeys } from '@/request/keys'
import {
  optimisticUpdateChatHistory,
  streamUpdateChatHistory
} from '@/request/helper'

export default function useSendChat() {
  const queryClient = useQueryClient()

  const { mutate, data, isLoading, isSuccess, error } = useMutation<
    any,
    Error,
    SendChatRequest
  >({
    mutationFn: async ({ content }) => {
      try {
        const data = queryClient.getQueryData<{ messages: Message[] }>([
          QueryKeys.CHAT_HISTORY
        ])
        const messages = data?.messages ?? []
        const newMessages = [
          ...(messages.map(({ role, content }) => ({
            role,
            content
          })) ?? []),
          { role: 'user', content }
        ]

        let result = ''
        const newMesssageId = nanoid()

        optimisticUpdateChatHistory({ queryClient, content })
        streamUpdateChatHistory({
          newMesssageId,
          queryClient,
          content: result
        })

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/chat`,
          {
            method: 'POST',
            body: JSON.stringify({
              messages: newMessages
            })
          }
        )

        if (!res.body) {
          throw new Error('The response body is empty.')
        }

        const reader = res.body?.getReader()

        while (true) {
          const { done, value } = await reader.read()

          if (done) {
            break
          }
          result += decodeAIStreamChunk(value)
          streamUpdateChatHistory({
            newMesssageId,
            queryClient,
            content: result
          })
        }
      } catch (error) {
        throw error
      }
    },
    onError: (err: any) => {
      console.log('err', err)
    },
    retry: false
  })

  return {
    handleSendChat: mutate,
    data,
    isLoading,
    isSuccess,
    error
  }
}
