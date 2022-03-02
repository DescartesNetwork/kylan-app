import { useState, useEffect, useCallback } from 'react'
import { AccountData } from '@senswap/sen-js'

import { Row, Col, Input, Button } from 'antd'
import IonIcon from './ionicon'

import { useAccount, useMint } from 'providers'

const KEY_SIZE = 2

const Search = ({
  onChange,
}: {
  onChange: (account: Record<string, AccountData>) => void
}) => {
  const [keyword, setKeyword] = useState('')
  const { accounts } = useAccount()
  const { tokenProvider } = useMint()

  const onSearch = useCallback(async () => {
    const accountFilter: Record<string, AccountData> = {}
    for (const accAddr in accounts) {
      const account = accounts[accAddr]
      if (keyword && keyword.length > KEY_SIZE) {
        const tokens = await tokenProvider.find(keyword)
        const mints = tokens.map((token) => token.address)
        if (!mints.includes(account.mint)) continue
      }
      accountFilter[accAddr] = account
    }
    return onChange(accountFilter)
  }, [accounts, keyword, onChange, tokenProvider])

  useEffect(() => {
    onSearch()
  }, [onSearch])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Input
          placeholder="Search"
          value={keyword}
          size="large"
          style={{ background: 'transparent' }}
          prefix={
            <Button
              type="text"
              style={{ marginLeft: -7 }}
              size="small"
              onClick={keyword ? () => setKeyword('') : () => {}}
              icon={
                <IonIcon name={keyword ? 'close-outline' : 'search-outline'} />
              }
            />
          }
          onChange={(e) => setKeyword(e.target.value)}
        />
      </Col>
    </Row>
  )
}

export default Search
