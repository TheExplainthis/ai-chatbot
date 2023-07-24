'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useChat } from '@/request/query/useChat'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { IconSpinner } from '@/components/ui/icons'

export interface ChatProps extends React.ComponentProps<'div'> {}

export function Chat({ className }: ChatProps) {
  const { messages, isLoading, input, setInput, handleSubmit } = useChat()
  const [hasScrollBottomAfterLoad, setScrollBottomAfterLoad] = useState(false)

  useEffect(() => {
    if (!hasScrollBottomAfterLoad && messages !== undefined) {
      window.scrollTo({
        top: document.body.offsetHeight
      })
      setScrollBottomAfterLoad(true)
    }
  }, [messages, hasScrollBottomAfterLoad])

  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages?.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <>
            {messages === undefined ? (
              <div className="flex h-[calc(100vh-200px)] w-screen items-center justify-center">
                <IconSpinner />
              </div>
            ) : (
              <EmptyScreen />
            )}
          </>
        )}
      </div>
      {messages !== undefined && (
        <ChatPanel
          isLoading={isLoading}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  )
}
