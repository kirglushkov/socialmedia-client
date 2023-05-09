import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setFriends } from '../store/userSlice'
import { Box, Divider } from '@mui/material'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import Friend from '../components/Friend'

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

const StyledFriendContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`

const FriendsList = (props: Props) => {
  const { token } = useAppSelector((state) => state.user)
  const { user } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const [Friends, SetFriends] = useState([])

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${user._id}/friends`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const data = await response.json()
    dispatch(setFriends({ friends: data }))
    SetFriends(data)
  }

  useEffect(() => {
    getFriends()
  }, [])

  return (
    <Root>
      <Title>Друзья</Title>
      <Box display="flex" flexDirection="column">
        {user.friends.map((user, index) => (
          <StyledFriendContainer key={index}>
            <Friend {...user} />
            <Divider />
          </StyledFriendContainer>
        ))}
      </Box>
    </Root>
  )
}

export default FriendsList
