import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setFriends } from '../store/userSlice'
import { Box } from '@mui/material'

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
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {user.friends.map((user, index) => (
          <div key={index}>
            <h3>
              {user.firstName} {user.lastName}
            </h3>
            <p>Occupation: {user.occupation}</p>
            <p>Location: {user.location}</p>
            <img src={user.picturePath} alt="User" />
          </div>
        ))}
      </Box>
    </Root>
  )
}

export default FriendsList
