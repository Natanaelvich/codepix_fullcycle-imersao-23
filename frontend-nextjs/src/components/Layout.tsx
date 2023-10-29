// @flow
import * as React from 'react'
import { BankAccount } from '../model'
import Footer from './Footer'
import MainContent from './MainContent'
import Navbar from './Navbar'

type Props = {
  bankAccount: BankAccount
  children: React.ReactNode
}

const Layout = (props: Props) => {
  const { bankAccount } = props
  return (
    <>
      <Navbar bankAccount={bankAccount} />
      <MainContent>{props.children}</MainContent>
      <Footer />
    </>
  )
}

export default Layout
