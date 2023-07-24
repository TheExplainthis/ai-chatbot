import { useCallback, useState } from 'react'
import useSendChat from '@/request/query/useSendChat'
import useChatHistory from '@/request/query/useChatHistory'
import { UseChatHelpers } from '@/request/types'

export function useChat(): UseChatHelpers {
  const { handleSendChat, isLoading } = useSendChat()

  const { data } = useChatHistory()
  const messages = data?.messages

  const [input, setInput] = useState('')

  const handleSubmit = useCallback(() => {
    if (!input) return

    handleSendChat({
      content: input
    })
    setInput('')
  }, [input, handleSendChat])

  const handleInputChange = (e: any) => {
    setInput(e.target.value)
  }

  return {
    isLoading,
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit
  }
}
