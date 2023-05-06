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
interface IFormInput {
  firstName: string
  lastName: string
  sex: 'Мужчина' | 'Женщина'
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

const StyledForm = styled(Box)`
  background-color: #f6f6f6;
  border-radius: 20px;
  box-sizing: border-box;
  height: 500px;
  padding: 20px;
  width: 320px;
  display: flex;
  flex-direction: column;
  color: #ff0000;
  font-size: 12px;
`
const Title = styled.div``
const SubTitle = styled.div``

export default function Field() {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

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
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)
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
        <InputLabel htmlFor="component-simple">Имя</InputLabel>
        <Input
          id="component-simple"
          {...register('firstName', { required: true })}
        />
        {errors.firstName && (
          <ErrorText id="component-error-text">Это поле обязательно</ErrorText>
        )}
      </FormControl>

      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">Фамилия</InputLabel>
        <Input
          id="component-helper"
          aria-describedby="component-helper-text"
          {...register('lastName', { required: true })}
        />
        {errors.lastName && (
          <ErrorText id="component-error-text">Это поле обязательно</ErrorText>
        )}
      </FormControl>
      <TextField
        id="outlined-select-currency"
        select
        label="Select"
        helperText="Выберите пол"
        {...register('sex', { required: true })}
        error={errors.sex ? true : false}
      >
        {Genders.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
          label="Password"
          error={errors.password ? true : false}
          {...register('password', { required: true })}
        />
      </FormControl>
      <input value={'Зарегистрироваться'} type="submit" />
    </StyledForm>
  )
}
