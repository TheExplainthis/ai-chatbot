import { QueryClient } from '@tanstack/react-query'
import { nanoid } from 'nanoid'
import { QueryKeys } from '@/request/keys'
import { Message, ChatHistoryResponse } from '@/request/types'

type UpdateChatHistoryInput = {
  queryClient: QueryClient
  content: string
}

type StreamUpdateChatHistoryInput = UpdateChatHistoryInput & {
  newMesssageId: string
}

export function optimisticUpdateChatHistory({
  queryClient,
  content
}: UpdateChatHistoryInput) {
  queryClient.setQueriesData<ChatHistoryResponse>(
    [QueryKeys.CHAT_HISTORY],
    cache => {
      if (!cache) return cache

      const newData: Message = {
        id: nanoid(),
        content,
        role: 'user'
      }

      return {
        ...cache,
        messages: [...cache.messages, newData]
      }
    }
  )
}

export function streamUpdateChatHistory({
  newMesssageId,
  content,
  queryClient
}: StreamUpdateChatHistoryInput) {
  queryClient.setQueriesData<ChatHistoryResponse>(
    [QueryKeys.CHAT_HISTORY],
    cache => {
      if (!cache) return cache

      const hasSameLatestMessage =
        cache.messages.findIndex(msg => msg.id === newMesssageId) !== -1

      const newMessage: Message = {
        id: newMesssageId,
        content,
        role: 'assistant'
      }

      return {
        ...cache,
        messages: hasSameLatestMessage
          ? cache.messages.map(msg => {
              if (msg.id === newMesssageId) {
                return newMessage
              } else {
                return msg
              }
            })
          : [...cache.messages, newMessage]
      }
    }
  )
}
