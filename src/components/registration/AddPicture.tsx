import { useSearch } from '@tanstack/react-location'
import React from 'react'
import { useAppSelector } from '../../store/hooks'
import styled from '@emotion/styled'
import AvatarElement from '../AvatarElement'
import { Box, Typography } from '@mui/material'
import Dropzone from 'react-dropzone'
import axios from 'axios'

type Props = {}

const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`
const RoofTop = styled.div`
  position: absolute;
  width: 100%;
  height: 188px;
  left: 0px;
  top: 0px;

  background: #ff8d76;
`

const Offset = styled.div`
  height: 110px;
`

const AddPicture = (props: Props) => {
  const { user } = useAppSelector((state) => state)
  const [file, setFile] = React.useState<File | null>(null)
  console.info(user)

  const handleClick = async () => {
    const response = await axios.post('http://localhost:3001/single', {
      image: file,
    })
  }
  return (
    <Root>
      <RoofTop></RoofTop>
      <Offset></Offset>
      <Box>
        <AvatarElement size={142} img={'p1.jpg'} />
      </Box>
      <Box
        gridColumn="span 4"
        border={`1px solid black`}
        borderRadius="5px"
        p="1rem"
      >
        <Dropzone
          acceptedFiles=".jpg, .png, .jpeg"
          multiple={false}
          onDrop={(acceptedFiles) => {
            console.log(acceptedFiles[0])
            setFile(acceptedFiles[0])
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <Box
              name="image"
              {...getRootProps()}
              border={`2px dashed black`}
              p="1rem"
              sx={{ '&:hover': { cursor: 'pointer' } }}
            >
              {!file ? (
                <p>Переместите файлы или клините чтобы выбрать</p>
              ) : (
                <p>{file!.name}</p>
              )}
            </Box>
          )}
        </Dropzone>
        <button onClick={handleClick}></button>
      </Box>
    </Root>
  )
}

export default AddPicture
