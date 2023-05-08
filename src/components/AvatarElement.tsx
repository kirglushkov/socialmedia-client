import { Avatar } from '@mui/material'
import React from 'react'

type Props = {
  img?: string
  size?: number
}

const AvatarElement = ({ img, size }: Props) => {
  return (
    <Avatar
      alt="user"
      sx={{ width: size || 54, height: size || 54 }}
      src={img}
    ></Avatar>
  )
}

export default AvatarElement
