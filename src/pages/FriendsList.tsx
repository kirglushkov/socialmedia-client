import styled from '@emotion/styled'
import React from 'react'
import { useAppSelector } from '../store/hooks'

type Props = {}

const Root = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
`

const Title = styled.div`
  font-size: larger;
  font-weight: 600;
`

const FriendsList = (props: Props) => {
  const { user } = useAppSelector((state) => state)
  const FriendsList = user.user.friends
  console.log(FriendsList)
  return (
    <Root>
      <Title>Друзья</Title>
    </Root>
  )
}

export default FriendsList
