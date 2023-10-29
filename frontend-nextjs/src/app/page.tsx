import Link from 'next/link'
import * as React from 'react'
import BankAccountCard from '../components/BankAccountCard'
import Layout from '../components/Layout'
import Title from '../components/Title'
import { BankAccount } from '../model'
import { bankHttp } from '@/utils/http'

const BankAccountsList = async () => {
  let bankAccounts: BankAccount[] = []
  let error = null

  try {
    const { data } = await bankHttp.get<BankAccount[]>('bank-accounts')
    bankAccounts = data
  } catch (e) {
    error = e
  }

  if (error) {
    return (
      <div>
        <Title>Erro ao carregar contas bancárias</Title>
      </div>
    )
  }

  return (
    // TODO: update layout to use selected bank account
    <Layout bankAccount={bankAccounts[0]}>
      <Title>Contas bancárias</Title>
      <div className="row">
        {bankAccounts.map((b, key) => (
          <Link
            key={key}
            href="/bank-accounts/[id]"
            as={`/bank-accounts/${b.id}`}
          >
            <a className="col-12 col-sm-6 col-md4">
              <BankAccountCard bankAccount={b} />
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default BankAccountsList
