import { Link, useNavigate } from '@tanstack/react-location'
import React from 'react'
import { useAppSelector } from '../store/hooks'
import styled from '@emotion/styled'
import NavBar from '../components/NavBar'
import Divider from '@mui/material/Divider'
import People from '../assets/people'
import AvatarElement from '../components/AvatarElement'
import FireUpload from '../components/fireUpload'
type Props = {}

import { useState, useEffect } from 'react'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import ProfilePage from './ProfilePage'
import PostPage from './PostPage'
import FriendsList from './FriendsList'

const StyledLink = styled(Link)`
  display: flex;
  flex: 0 0 auto;
  width: 100%;
  max-width: 260px;
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

  h2 {
    margin: 0;
    padding: 0;
    font-size: clamp(0.6rem, 1.4rem, 1.8rem);
  }
`
const OffSet = styled.div`
  height: 84px;
  width: 100%;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: calc(100%);
`

const Greeting = styled.div`
  font-size: clamp(2rem, 2.5rem, 3rem);
  font-weight: bold;
`
const SubGreeting = styled.div`
  display: flex;
  justify-content: center;
  > span {
    font-size: clamp(0.5rem, 0.9rem, 1.3rem);
    color: grey;
    max-width: 300px;
  }
`

const PictureContainer = styled.div`
  max-width: 300px;
  width: 100%;
`

const TextContainer = styled.div`
  text-align: center;
`

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  const { user } = useAppSelector((state) => state)

  return (
    <Root>
      <NavBar />
      <OffSet />
      {user.user != null && (
        <>
          <ProfilePage />
          <PostPage />
          <FriendsList />
        </>
      )}

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
          <StyledLink to={'/login'}>
            <h2>Войти</h2>
          </StyledLink>
          <StyledLink to={'/signup'}>
            <h2>Зарегистроваться</h2>
          </StyledLink>
        </Content>
      )}
    </Root>
  )
}

export default Home
