import { useEffect } from 'react'

export const useKeyBinding = (keyCode: number, handler: (event: KeyboardEvent) => unknown) => {
  useEffect(() => {
    const filter = (event: KeyboardEvent) => {
      if (event.which === keyCode) {
        handler(event)
      }
    }

    document.addEventListener('keypress', filter)

    return () => {
      document.removeEventListener('keypress', filter)
    }
  })
}
