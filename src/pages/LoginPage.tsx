import React from 'react'
import Login from '../components/login/Login'
import styled from '@emotion/styled'

const Title = styled.div`
  padding: 10px;
  font-size: large;
  font-weight: bold;
`

const Root = styled.div`
  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: 0 auto;
`

type Props = {}

const LoginPage = (props: Props) => {
  return (
    <Root>
      <Title>Войдите</Title>
      <Login />
    </Root>
  )
}

export default LoginPage
