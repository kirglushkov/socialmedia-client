import { configureStore } from '@reduxjs/toolkit'
import  LoginSlice from './LoggedSlice'
import userSlice from './userSlice'

export const store = configureStore({
  reducer: {
    login: LoginSlice,
    user: userSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch