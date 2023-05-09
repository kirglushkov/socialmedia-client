import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Card from './Card'
import { setPosts } from '../../store/userSlice'
import { useAppSelector } from '../../store/hooks'
import styled from '@emotion/styled'

const Grid = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 20px;
`

const AllPosts = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch()
  const { user } = useAppSelector((state) => state)

  const getPosts = async () => {
    const response = await fetch('http://localhost:3001/posts', {
      method: 'GET',
      headers: { Authorization: `Bearer ${user.token}` },
    })
    const data = await response.json()
    dispatch(setPosts({ posts: data }))
  }

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${user.token}` },
      }
    )
    const data = await response.json()
    dispatch(setPosts({ posts: data }))
  }

  useEffect(() => {
    if (isProfile) {
      getUserPosts()
    } else {
      getPosts()
    }
    console.log(user.posts)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Grid>
      {user.posts.map(
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
          comments,
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
            likes={Object.keys(likes).length}
          />
        )
      )}
    </Grid>
  )
}

export default AllPosts
