import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface LoginState {
  value: boolean
}

// Define the initial state using that type
const initialState: LoginState = {
  value: false,
}

export const LoginSlice = createSlice({
  name: 'login',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state) => {
      state.value = true
    },
  },
})

export const { login } = LoginSlice.actions
export default LoginSlice.reducer