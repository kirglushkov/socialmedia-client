import { Link, useNavigate } from '@tanstack/react-location'
import React from 'react'
import { useAppSelector } from '../store/hooks'
import styled from '@emotion/styled'
import NavBar from '../components/NavBar'
import Divider from '@mui/material/Divider'
import People from '../assets/people'
type Props = {}

const StyledLink = styled(Link)`
  display: flex;
  flex: 0 0 auto;
  width: 200px;
  padding: 5px 20px;
  background-color: #97daff;
  border-radius: 50px;
  color: white;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  &:hover {
    background-color: #4bd1fa;
  }

  &:active {
    background-color: #4bd1fa;
  }
  font-size: 0.6rem;

  h2 {
    margin: 0;
    padding: 0;
  }
`
const OffSet = styled.div`
  height: 64px;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

const Greeting = styled.div`
  font-size: 2rem;
  font-weight: bold;
  padding: 10px;
`
const SubGreeting = styled.div`
  display: flex;
  justify-content: center;
  > span {
    font-size: 0.7rem;
    color: grey;
    max-width: 200px;
  }
`

const PictureContainer = styled.div`
  max-width: 200px;
  width: 100%;
`

const TextContainer = styled.div`
  text-align: center;
`

const SomePicture = () => {
  return (
    <PictureContainer>
      <People />
    </PictureContainer>
  )
}

const Home = (props: Props) => {
  const navigate = useNavigate()
  const { login } = useAppSelector((state) => state)
  //   console.log(login.value)
  return (
    <div>
      <NavBar />
      <OffSet />
      {!login.value && (
        <Content>
          <TextContainer>
            <Greeting>Добро пожаловать!</Greeting>
            <SubGreeting>
              <span>
                Здесь вы можете найти свою работу, друзей, себя и вторую
                половинку
              </span>
            </SubGreeting>
          </TextContainer>

          <SomePicture />

          <StyledLink to={'/signup'}>
            <h2>Зарегистроваться</h2>
          </StyledLink>
          <StyledLink to={'/login'}>
            <h2>Войти</h2>
          </StyledLink>
        </Content>
      )}
    </div>
  )
}

export default Home
