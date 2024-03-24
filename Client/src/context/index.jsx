import React from 'react'
import { ComponentUserContext } from './User'

export function GlobalContext({children}) {
  return (
    <ComponentUserContext>
        {children}
    </ComponentUserContext>
  )
}
