import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setPosts } from '../../store/userSlice'
import { storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { DeleteOutlined, ImageOutlined } from '@mui/icons-material'
import {
  InputBase,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  ButtonBase,
} from '@mui/material'
import AvatarElement from '../AvatarElement'
import styled from '@emotion/styled'
import axios from 'axios'
type Props = {}

const UploadRoot = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  background-color: white;
  padding: 20px;
  border-radius: 30px;
`

const StyledDropzone = styled(Box)`
  border: 2px dashed black;
  border-radius: 5px;
  > p {
    align-items: center;
    text-align: center;
  }
`

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`

const UploadPost = (props: Props) => {
  const [isImage, setIsImage] = useState(false)
  const [imageUpload, setImageUpload] = React.useState(null)
  const [UserImage, setUserImage] = useState('')
  const [post, setPost] = useState('')
  const { user } = useAppSelector((state) => state)
  const UserReference = ref(storage, `images/${user.user.picturePath}`)

  const dispatch = useAppDispatch()

  const [imageUrls, setImageUrls] = React.useState('')

  const uploadFile = () => {
    if (imageUpload == null) return
    const imageRef = ref(storage, `posts/${imageUpload.name}`)
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls(url)
      })
    })
  }

  React.useEffect(() => {
    getDownloadURL(UserReference).then((url) => {
      setUserImage(url)
    })
  }, [])

  const id = user.user._id

  const onSubmit = async () => {
    uploadFile()
    const Data = {
      userId: id,
      description: post,
      picturePath: imageUpload.name,
    }
    const config = {
      headers: { Authorization: 'Bearer ' + user.token },
    }
    try {
      const response = await axios.post(
        'http://localhost:3001/posts',
        Data,
        config
      )
      const posts = response.data
      dispatch(setPosts({ posts }))
      setImageUpload(null)
      setIsImage(!isImage)
      setPost('')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <UploadRoot>
      <Profile>
        <AvatarElement img={UserImage} />
        <InputBase
          placeholder="Мысли дня..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: '100%',
            backgroundColor: 'aliceblue',
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
      </Profile>
      {isImage && (
        <Box>
          <div>
            <div>
              <InputBase
                type="file"
                onChange={(event) => {
                  setImageUpload(event.target.files[0])
                }}
              />
            </div>
            {imageUpload && (
              <IconButton
                onClick={() => setImageUpload(null)}
                sx={{ width: '15%' }}
              >
                <DeleteOutlined />
              </IconButton>
            )}
          </div>
        </Box>
      )}

      <ButtonBase onClick={() => setIsImage(!isImage)}>
        <ImageOutlined sx={{ color: 'black' }} />
        <Typography sx={{ '&:hover': { cursor: 'pointer' } }}>Image</Typography>
      </ButtonBase>
      <Button
        disabled={!post}
        onClick={onSubmit}
        sx={{
          color: 'whitesmoke',
          backgroundColor: 'violet',
          borderRadius: '3rem',
        }}
      >
        ПОСТ
      </Button>
    </UploadRoot>
  )
}

export default UploadPost
