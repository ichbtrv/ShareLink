import { useState } from 'react'

export function handleStateEvent<T extends typeof useState>(
  _e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  action: T,
) {
  return (e: Event) => {
    e.preventDefault()
    action()
  }
}
