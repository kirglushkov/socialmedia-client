import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import React from 'react'
import AvatarElement from './AvatarElement'
import styled from '@emotion/styled'
import { ButtonBase } from '@mui/material'
import { useNavigate } from '@tanstack/react-location'
import GroupRemoveIcon from '@mui/icons-material/GroupRemove'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setFriends } from '../store/userSlice'

type Props = {
  firstName: string
  lastName: string
  location: string
  occupation: string
  picturePath: string
  _id: string
}

const Div = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`

const AddToFriend = styled(ButtonBase)`
  background-color: aliceblue;
  width: 50px;
  height: 30px;
  border-radius: 30px;
`

const Friend = (props: Props) => {
  const [image, setImage] = React.useState<string>('')
  const { user } = useAppSelector((state) => state)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const picPath = props.picturePath
  const storage = getStorage()
  const reference = ref(storage, `images/${picPath}`)

  React.useEffect(() => {
    getDownloadURL(reference).then((url) => {
      setImage(url)
    })
  }, [reference])

  const patchFriend = async () => {
    try {
      if (user.user._id !== props._id) {
        const response = await fetch(
          `http://localhost:3001/users/${user.user._id}/${props._id}`,
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            },
          }
        )
        const data = await response.json()
        dispatch(setFriends({ friends: data }))
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <Div>
        <ButtonBase
          onClick={() => {
            navigate({ to: `/users/${props._id}` })
          }}
        >
          <AvatarElement img={image} />
        </ButtonBase>
        <h3>
          {props.firstName} {props.lastName}
        </h3>
        <AddToFriend onClick={patchFriend}>
          <GroupRemoveIcon />
        </AddToFriend>
      </Div>

      <div>
        <p>Занятие: {props.occupation}</p>
        <p>Локация: {props.location}</p>
      </div>
    </>
  )
}

export default Friend
