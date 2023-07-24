import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

const decoder = new TextDecoder()

export function decodeAIStreamChunk(chunk: Uint8Array): string {
  if (!chunk) return ''
  return decoder.decode(chunk)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
