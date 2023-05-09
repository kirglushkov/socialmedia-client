import { useMatch } from '@tanstack/react-location'
import axios from 'axios'
import React from 'react'
import { useAppSelector } from '../../store/hooks'
import { Card, Divider, Button } from '@mui/material'
import AvatarElement from '../AvatarElement'
import styled from '@emotion/styled'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'

interface UserProfile {
  _id: string
  firstName: string
  lastName: string
  email: string
  age: number
  location: string
  university?: string // optional property
  sex: 'Мужчина' | 'Женщина' // union type with literal types
  password: string
  picturePath: string
  friends: string[] // array of friend user IDs
  occupation: string
  viewedProfile: number
  impressions: number
  createdAt: string // ISO 8601 date string
  updatedAt: string // ISO 8601 date string
  __v: number // version (usually used by ORMs)
}
const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
`

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  gap: 16px;
`
const Namings = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  > span {
    font-size: medium;
    font-weight: 700;
  }
`

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  > span {
    font-size: larger;
    font-weight: 700;
  }

  > div {
    font-size: larger;
    font-weight: 500;
  }
`

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0px;
  gap: 36px;

  width: 300px;

  background: #ffffff;
  border-radius: 10px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`

type Props = {}

const FullProfilePage = (props: Props) => {
  const match = useMatch()
  const [Data, setData] = React.useState<UserProfile | null>(null)
  const [image, setImage] = React.useState<string>('')
  const id = match.params.id as unknown as number
  const { user } = useAppSelector((state) => state)
  const config = {
    headers: { Authorization: 'Bearer ' + user.token },
  }
  React.useEffect(() => {
    const onSubmit = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/${id}`,
          config
        )
        const data = response.data
        console.log(data)
        setData(data)
      } catch (error) {
        console.error(error)
      }
    }
    onSubmit()
  }, [])

  React.useEffect(() => {
    if (Data != null) {
      const picPath = Data.picturePath
      const storage = getStorage()
      const reference = ref(storage, `images/${picPath}`)
      getDownloadURL(reference).then((url) => {
        setImage(url)
      })
    }
  }, [Data])
  return (
    <Root>
      <StyledCard>
        <Title>
          <div>{Data?.firstName}</div>
          <span>{Data?.lastName}</span>
        </Title>
        <AvatarElement size={142} img={image} />

        <Details>
          <Namings>
            <div>Возраст:</div>
            <span>{Data?.age}</span>
          </Namings>
          <Namings>
            <div>Email:</div>
            <span>{Data?.email}</span>
          </Namings>
          <Namings>
            <div>Университет:</div>
            <span>{Data?.university}</span>
          </Namings>
          <Namings>
            <div>Пол:</div>
            <span>{Data?.sex}</span>
          </Namings>
          <Namings>
            <div>Занятие:</div>
            <span>{Data?.occupation}</span>
          </Namings>
          <Namings>
            <div>Локация:</div>
            <span>{Data?.location}</span>
          </Namings>
        </Details>
      </StyledCard>
    </Root>
  )
}

export default FullProfilePage
