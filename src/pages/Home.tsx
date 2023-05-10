import { Link, useNavigate } from '@tanstack/react-location'
import { useAppSelector } from '../store/hooks'
import styled from '@emotion/styled'
import NavBar from '../components/NavBar'
import People from '../assets/people'
import ProfilePage from './ProfilePage'
import FriendsList from './FriendsList'
import AllPosts from '../components/post/AllPosts'
import UploadPost from '../components/makePost/UploadPost'

type Props = {}
const StyledLink = styled(Link)`
  display: flex;
  flex: 0 0 auto;
  width: 100%;
  max-width: 260px;
  padding: 5px 20px;
  background-color: #97daff;
  border-radius: 50px;
  color: white;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  &:hover {
    background-color: #4bd1fa;
  }

  &:active {
    background-color: #4bd1fa;
  }

  h2 {
    margin: 0;
    padding: 0;
    font-size: clamp(0.6rem, 1.4rem, 1.8rem);
  }
`
const OffSet = styled.div`
  height: 84px;
  width: 100%;
`
const Content = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
`

const Greeting = styled.div`
  font-size: clamp(2rem, 2.5rem, 3rem);
  font-weight: bold;
`
const SubGreeting = styled.div`
  display: flex;
  justify-content: center;
  > span {
    font-size: clamp(0.5rem, 0.9rem, 1.3rem);
    color: grey;
    max-width: 300px;
  }
`

const PictureContainer = styled.div`
  max-width: 300px;
  width: 100%;
`

const TextContainer = styled.div`
  text-align: center;
`

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #e6e6e6;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  max-width: 1400px;
  gap: 20px;
  padding: 20px;
  justify-content: center;
  margin: 0 auto;
  @media (max-width: 999px) {
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr auto;
    grid-auto-flow: column; /* first column takes up remaining space */
  }

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    div:last-child {
      order: 1;
    }
    div:nth-child(2) {
      order: 2;
    }
  }
`

const FixedBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
  height: min-content;
  width: 100%;
  gap: 20px;
`

const SomePicture = () => {
  return (
    <PictureContainer>
      <People />
    </PictureContainer>
  )
}

const Home = (props: Props) => {
  const navigate = useNavigate()
  const { login } = useAppSelector((state) => state)
  const { user } = useAppSelector((state) => state)

  return (
    <Root>
      <NavBar />
      <OffSet />
      {user.user != null && (
        <Grid>
          <FixedBox>
            <ProfilePage />
            <FriendsList />
          </FixedBox>
          <AllPosts />
          <FixedBox>
            <UploadPost />
          </FixedBox>
        </Grid>
      )}

      {!login.value && (
        <Content>
          <TextContainer>
            <Greeting>Добро пожаловать!</Greeting>
            <SubGreeting>
              <span>
                Здесь вы можете найти свою работу, друзей, себя и вторую
                половинку. <br />
                Войдите или зарегистрируйтесь, чтобы увидеть сайт
              </span>
            </SubGreeting>
          </TextContainer>

          <SomePicture />
          <StyledLink to={'/login'}>
            <h2>Войти</h2>
          </StyledLink>
          <StyledLink to={'/signup'}>
            <h2>Зарегистроваться</h2>
          </StyledLink>
        </Content>
      )}
    </Root>
  )
}

export default Home
