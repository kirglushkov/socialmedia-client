import styled from '@emotion/styled'
import { ButtonBase, Divider } from '@mui/material'
import React from 'react'
import AvatarElement from '../AvatarElement'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'

interface CardProps {
  key: string | number
  postId: string | number
  postUserId: string | number
  name: string
  description: string
  location: string
  picturePath: string
  userPicturePath: string
  likes: number
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
  max-width: 500px;
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

  React.useEffect(() => {
    getDownloadURL(UserReference).then((url) => {
      setUserImage(url)
    })
    getDownloadURL(PostReference).then((url) => {
      setPostImage(url)
    })
  }, [PostReference])
  return (
    <Root>
      <Profile>
        <UserContainer>
          <ButtonBase>
            <AvatarElement img={UserImage} />
          </ButtonBase>

          <NameContainer>
            <Name>{props.name}</Name>
            <City>{props.location}</City>
          </NameContainer>
        </UserContainer>

        <AddToFriend>
          <GroupAddIcon />
        </AddToFriend>
      </Profile>
      <Divider />
      <Description>{props.description}</Description>
      <ImageContainer>
        <img src={PostImage}></img>
      </ImageContainer>
      <Divider />
      <Likes>
        <span>{props.likes}</span>
        <ButtonBase>
          <ThumbUpAltIcon />
        </ButtonBase>
      </Likes>
    </Root>
  )
}

export default Card
