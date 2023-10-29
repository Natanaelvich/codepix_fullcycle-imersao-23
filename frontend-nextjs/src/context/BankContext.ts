'use client'
import { createContext } from 'react'

type BankContextType = {
  name: string
  code: string
  cssCode: string
}

const BankContext = createContext<BankContextType>({} as BankContextType)

export default BankContext
