'use client'

import * as React from 'react'

interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

interface ToastState {
  toasts: Toast[]
}

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

let listeners: Array<(state: ToastState) => void> = []
let memoryState: ToastState = { toasts: [] }

function dispatch(toast: Omit<Toast, 'id'>) {
  const id = Math.random().toString(36).slice(2)
  const newToast = { id, ...toast }
  
  memoryState = {
    toasts: [newToast, ...memoryState.toasts].slice(0, TOAST_LIMIT),
  }
  
  listeners.forEach((listener) => {
    listener(memoryState)
  })

  setTimeout(() => {
    memoryState = {
      toasts: memoryState.toasts.filter((t) => t.id !== id),
    }
    listeners.forEach((listener) => {
      listener(memoryState)
    })
  }, TOAST_REMOVE_DELAY)

  return id
}

export function useToast() {
  const [state, setState] = React.useState<ToastState>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      listeners = listeners.filter((l) => l !== setState)
    }
  }, [])

  return {
    ...state,
    toast: (props: Omit<Toast, 'id'>) => dispatch(props),
    dismiss: (toastId?: string) => {
      memoryState = {
        toasts: toastId 
          ? memoryState.toasts.filter((t) => t.id !== toastId)
          : [],
      }
      listeners.forEach((listener) => {
        listener(memoryState)
      })
    },
  }
}

export type { Toast }
