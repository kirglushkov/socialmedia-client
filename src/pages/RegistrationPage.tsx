import React from 'react'
import Register from '../components/registration/Register'
import styled from '@emotion/styled'

type Props = {}

const Title = styled.div`
  padding: 10px;
  font-size: large;
  font-weight: bold;
  text-align: center;
`

const Root = styled.div`
  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: 0 auto;
`

const RegistrationPage = (props: Props) => {
  return (
    <Root>
      <Title>Зарегистрируйтесь</Title>
      <Register />
    </Root>
  )
}

export default RegistrationPage
