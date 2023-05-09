import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import React from 'react'
import AvatarElement from '../components/AvatarElement'
import { useAppSelector } from '../store/hooks'
import styled from '@emotion/styled'
import { Button, Divider } from '@mui/material'
import { useNavigate } from '@tanstack/react-location'

const Main = styled.div`
  display: flex;
  gap: 20px;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-left: 10px;
`

const Card = styled.div`
  background-color: #ffffff;

  border-radius: 20px;
  padding: 20px;
`
const Namings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > span {
    font-size: medium;
    font-weight: 700;
  }
`

type Props = {}

const ProfilePage = (props: Props) => {
  const { user } = useAppSelector((state) => state)
  console.log(user.user)
  const { firstName, lastName, email, sex, university, occupation, age } =
    user.user
  const [image, setImage] = React.useState<string>('')
  const navigate = useNavigate()
  React.useEffect(() => {
    if (user.user != null) {
      const picPath = user.user.picturePath
      const storage = getStorage()
      const reference = ref(storage, `images/${picPath}`)
      getDownloadURL(reference).then((url) => {
        setImage(url)
      })
    }
  }, [])
  return (
    <Card>
      <Main>
        <AvatarElement size={64} img={image} />
        <Namings>
          <span>{firstName}</span>
          <span>{lastName}</span>
        </Namings>
      </Main>
      <Divider />
      <Main>
        <Namings>
          <span>Почта</span>
          <span>{email}</span>
        </Namings>
      </Main>

      <Divider />
      <Main>
        <Namings>
          <span>Пол</span>
          <span>{sex}</span>
        </Namings>
      </Main>
      <Divider />

      <Main>
        <Namings>
          <span>Возраст</span>
          <span>{age}</span>
        </Namings>
      </Main>
      <Divider />
      <Main>
        <Namings>
          <span>Университет</span>
          <span>{university}</span>
        </Namings>
      </Main>

      <Divider />
      <Main>
        <Namings>
          <span>Занятие</span>
          <span>{occupation}</span>
        </Namings>
      </Main>

      <Divider />
      <Main>
        <Button
          onClick={() => {
            navigate({ to: '/profile', replace: false })
          }}
        >
          Посмотреть профиль
        </Button>
      </Main>
    </Card>
  )
}

export default ProfilePage
