import { UseChatHelpers } from '@/request/types'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'

export interface ChatPanelProps
  extends Pick<UseChatHelpers, 'isLoading' | 'input' | 'setInput'> {
  handleSubmit: () => void
}

export function ChatPanel({
  isLoading,
  input,
  setInput,
  handleSubmit
}: ChatPanelProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <div className="flex w-full justify-center">
        <div className="relative w-full space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:w-4/5 sm:rounded-t-xl sm:border md:py-4 xl:w-1/2">
          <ButtonScrollToBottom />
          <PromptForm
            onSubmit={handleSubmit}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
