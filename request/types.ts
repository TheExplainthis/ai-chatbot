export type Message = {
  id: string
  content: string
  role: 'system' | 'user' | 'assistant' | 'function'
  createdAt?: Date
}

export type UseChatHelpers = {
  messages?: Message[]
  error?: null | undefined | Error
  stop?: () => void
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
  handleInputChange: (e: any) => void
  handleSubmit: () => void
  isLoading: boolean
}

export type ChatHistoryResponse = {
  messages: Message[]
}

export type SendChatRequest = {
  content: string
}
