import * as React from 'react'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          {process.env.NEXT_PUBLIC_EMPTY_SCREEN_TITLE}
        </h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          {process.env.NEXT_PUBLIC_EMPTY_SCREEN_DESC}
        </p>
      </div>
    </div>
  )
}
