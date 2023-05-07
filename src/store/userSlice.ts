import { createSlice } from '@reduxjs/toolkit'

type Post = {
    _id: string;
    userId: string;
    desc: string;
    img: string;
    likes: string[];
    comments: string[];
    createdAt: string;
    };

// Define a type for the slice state
interface userState {
  user: any
  token: string | null
  friends: [] | null
  posts: Post[];
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
        state.user = null;
        state.token = null;
    },
    setFriends: (state, action) => {
        if (state.user) {
            state.user.friends = action.payload.friends;
        } else {
            console.error("user friends non-exist")
        }
    },
    setPost: (state, action) => {
        const updatedPosts = state.posts.map((post) => {
          if (post._id === action.payload.post._id) return action.payload.post;
          return post;
        });
        state.posts = updatedPosts;
      },
    },
})

export const { setUser, setLogOut, setFriends, setPost } = UserSlice.actions
export default UserSlice.reducer