import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setFriends } from '../store/userSlice'
import { Box, Divider } from '@mui/material'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import Friend from '../components/Friend'

export type FriendProps = {
  firstName: string
  lastName: string
  location: string
  occupation: string
  picturePath: string
  _id: string
}

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
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
`

const FriendsList = () => {
  const { token } = useAppSelector((state) => state.user)
  const { user } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const [Friends, SetFriends] = useState([])

  const getFriends = async () => {
    const response = await fetch(
      `https://shy-moon-1692.fly.dev/users/${user._id}/friends`,
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
        {user.friends?.map((user: FriendProps, index: number) => (
          <StyledFriendContainer key={index}>
            <Friend {...user} />
          </StyledFriendContainer>
        ))}
      </Box>
    </Root>
  )
}

export default FriendsList
