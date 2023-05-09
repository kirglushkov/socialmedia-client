import { createSlice } from '@reduxjs/toolkit'

interface Post {
  _id: string
  userId: string
  firstName: string
  lastName: string
  description: string
  location: string
  picturePath: string
  userPicturePath: string
  likes: number
  comments: {
    id: string
    author: string
    text: string
  }[]
}

// Define a type for the slice state
interface userState {
  user: any
  token: string | null
  friends: [] | null
  posts: Post[]
}

// Define the initial state using that type
const initialState: userState = {
  user: null,
  token: null,
  friends: null,
  posts: [],
}

export const UserSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setLogOut: (state) => {
      state.user = null
      state.token = null
    },
    setFriends: (state, action) => {

        state.user.friends = action.payload.friends

    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post
        return post
      })
      state.posts = updatedPosts
    },
  },
})

export const { setUser, setLogOut, setFriends, setPost, setPosts } = UserSlice.actions
export default UserSlice.reducer
