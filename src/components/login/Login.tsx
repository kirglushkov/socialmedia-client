import styled from '@emotion/styled'
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
} from '@mui/material'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { login } from '../../store/LoggedSlice'
import { useNavigate } from '@tanstack/react-location'
import { setUser } from '../../store/userSlice'
interface IFormInput {
  email: string
  password: string | number
}

const Genders = [
  {
    value: 'Мужчина',
    label: 'М',
  },
  {
    value: 'Женщина',
    label: 'Ж',
  },
]

const ErrorText = styled(FormHelperText)`
  color: red;
`

const LoginInput = styled.input`
  background: #4bd1fa !important;
  font-size: 1rem !important;
`

const StyledForm = styled(Box)`
  background-color: #f6f6f6;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  color: #ff0000;
  font-size: 12px;
  align-items: stretch;
`

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/auth/login',
        data
      )
      dispatch(
        setUser({ user: response.data.user, token: response.data.token })
      )
      dispatch(login())
      if (response) {
        navigate({ to: '/', replace: true })
      }
    } catch (error) {
      console.error(error)
    }
  }
  const formProps = {
    noValidate: true,
    autoComplete: 'off',
    onSubmit: handleSubmit(onSubmit),
  }
  return (
    <StyledForm
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      {...formProps}
    >
      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Почта</InputLabel>
        <Input
          id="component-simple"
          {...register('email', { required: true })}
        />
        {errors.email && (
          <ErrorText id="component-error-text">Это поле обязательно</ErrorText>
        )}
      </FormControl>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Пароль"
          error={errors.password ? true : false}
          {...register('password', { required: true })}
        />
      </FormControl>
      <LoginInput value={'Войти'} type="submit" />
    </StyledForm>
  )
}
