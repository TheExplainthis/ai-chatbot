import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/request/keys'
import { Message } from '@/request/types'

const useChatHistory = () => {
  return useQuery<{
    messages: Message[]
  }>({
    queryKey: [QueryKeys.CHAT_HISTORY],
    queryFn: () => {
      return new Promise(resolve => resolve({ messages: [] }))
    }
  })
}

export default useChatHistory
