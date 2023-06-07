import styled from '@emotion/styled'
import { ButtonBase, Divider } from '@mui/material'
import React from 'react'
import AvatarElement from '../AvatarElement'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Link, useNavigate } from '@tanstack/react-location'
import { setFriends, setPost } from '../../store/userSlice'
import { FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material'

interface CardProps {
  key: string | number
  postId: string | number
  postUserId: string | number
  name: string
  description: string
  location: string
  picturePath: string
  userPicturePath: string
  likes: {}
}

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const ImageContainer = styled.div`
  width: 100%;
  > img {
    width: 100%;
  }
`
const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  padding: 10px;
`
const Name = styled.div`
  font-size: larger;
`
const City = styled.div`
  font-weight: 600;
`
const Description = styled.div`
  padding: 10px;
`
const AddToFriend = styled(ButtonBase)`
  background-color: aliceblue;
  width: 50px;
  height: 30px;
  border-radius: 30px;
`
const Likes = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 5px;
  justify-content: flex-end;
`

const Root = styled.div`
  height: 100%;
  background-color: white;
  border-radius: 10px;

  padding: 10px 20px;
`

const Card = (props: CardProps) => {
  const [UserImage, setUserImage] = React.useState<string>('')
  const [PostImage, setPostImage] = React.useState<string>('')
  const storage = getStorage()
  const UserReference = ref(storage, `images/${props.userPicturePath}`)
  const PostReference = ref(storage, `posts/${props.picturePath}`)
  const { user } = useAppSelector((state) => state)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  let isLiked = false
  if (user.user._id in props.likes) {
    isLiked = true
  }

  const patchFriend = async () => {
    try {
      if (user.user._id !== props.postUserId) {
        const response = await fetch(
          `https://shy-moon-1692.fly.dev/users/${user.user._id}/${props.postUserId}`,
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

  const patchLike = async () => {
    const response = await fetch(
      `https://shy-moon-1692.fly.dev/posts/${props.postId}/like`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.user._id }),
      }
    )
    const updatedPost = await response.json()
    dispatch(setPost({ post: updatedPost }))
  }

  React.useEffect(() => {
    getDownloadURL(UserReference).then((url) => {
      setUserImage(url)
    })
  }, [])

  React.useEffect(() => {
    setTimeout(() => {
      getDownloadURL(PostReference).then((url) => {
        setPostImage(url)
      })
    }, 300)
  }, [])
  return (
    <Root>
      <Profile>
        <UserContainer>
          <ButtonBase
            onClick={() => {
              navigate({ to: `/users/${props.postUserId}` })
            }}
          >
            <AvatarElement img={UserImage} />
          </ButtonBase>
          <NameContainer>
            <Name>{props.name}</Name>
            <City>{props.location}</City>
          </NameContainer>
        </UserContainer>
        {user.user._id !== props.postUserId && (
          <AddToFriend onClick={patchFriend}>
            <GroupAddIcon />
          </AddToFriend>
        )}
      </Profile>
      <Divider />
      <Description>{props.description}</Description>
      <ImageContainer>
        <img src={PostImage}></img>
      </ImageContainer>
      <Divider />
      <Likes>
        <span>{Object.keys(props.likes).length}</span>
        <ButtonBase onClick={patchLike}>
          {isLiked ? (
            <FavoriteOutlined sx={{ color: 'red' }} />
          ) : (
            <FavoriteBorderOutlined />
          )}
        </ButtonBase>
      </Likes>
    </Root>
  )
}

export default Card
