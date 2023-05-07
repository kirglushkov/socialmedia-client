import { Link } from '@tanstack/react-location'
import React from 'react'
import { useAppSelector } from '../store/hooks'
import styled from '@emotion/styled'

type Props = {}

const Title = styled.div`
  position: fixed;
  top: 0;
  padding: 10px;
`

const Home = (props: Props) => {
  const { login } = useAppSelector((state) => state)
  //   console.log(login.value)
  return (
    <div className="App">
      <Title>Домашняя страница</Title>
      {!login.value && (
        <>
          <Link to={`/signup`}>
            <h2>Зарегистроваться</h2>
          </Link>
          <Link to={`/login`}>
            <h2>Войти</h2>
          </Link>
        </>
      )}
    </div>
  )
}

export default Home
