import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { Box, Divider } from '@mui/material'
import Friend from '../components/Friend'
import UserAdd from '../components/UserAdd'

type Props = {}

const Root = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  width: 50%;
`

const Title = styled.div`
  font-size: larger;
  font-weight: 600;
`

const Empty = styled.div`
  padding: 10px;
`

const StyledFriendContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
`

const People = (props: Props) => {
  const { token } = useAppSelector((state) => state.user)
  const { user } = useAppSelector((state) => state.user)
  const [People, SetPeople] = useState([])
  const getFriends = async () => {
    const response = await fetch(`http://localhost:3001/users/all`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json()
    SetPeople(data)
  }

  useEffect(() => {
    getFriends()
  }, [])

  return (
    <Root>
      <Title>Все друзья</Title>
      <Box display="flex" flexDirection="column">
        {user.friends.length === 0 && <Empty>пусто(</Empty>}
        {user.friends?.map((user, index) => (
          <StyledFriendContainer key={index}>
            <Friend {...user} />
          </StyledFriendContainer>
        ))}
        <Divider />
        <Title>Все люди</Title>
        {People?.map((user, index) => (
          <StyledFriendContainer key={index}>
            <UserAdd {...user} />
          </StyledFriendContainer>
        ))}
      </Box>
    </Root>
  )
}

export default People
