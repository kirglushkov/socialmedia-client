import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Card from './Card'
import { setPosts } from '../../store/userSlice'
import { useAppSelector } from '../../store/hooks'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const gradientAnimation = keyframes`
  0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const LoadingRoot = styled.div`
  animation: ${gradientAnimation} 1s linear infinite;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 600% 600%;
  color: #fff;
  padding: 8px;
  border-radius: 5px;
`

const AllPosts = () => {
  const dispatch = useDispatch()
  const { user } = useAppSelector((state) => state)
  const getPosts = async () => {
    const response = await fetch(
      `https://small-water-60723213213.fly.dev/posts`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${user.token}` },
      }
    )
    const data = await response.json()
    dispatch(setPosts({ posts: data }))
  }

  useEffect(() => {
    getPosts()
  }, [])

  const AllPostsItems = [...user.posts].reverse()

  return (
    <Grid>
      {AllPostsItems.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
        }) => (
          <Card
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
          />
        )
      )}
    </Grid>
  )
}

export default AllPosts
