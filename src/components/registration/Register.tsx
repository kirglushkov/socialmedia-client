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
import { useAppDispatch } from '../../store/hooks'
import { login } from '../../store/LoggedSlice'
import { useNavigate } from '@tanstack/react-location'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from 'firebase/storage'
import { storage } from '../../firebase'
interface IFormInput {
  firstName: string
  lastName: string
  email: string
  sex: 'Мужчина' | 'Женщина'
  location: string
  age: number
  university: string
  password: string | number
  picturePath: string
  occupation: string
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
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  color: #ff0000;
  font-size: 12px;
  align-items: stretch;
`

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false)
  const dispatch = useAppDispatch()
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const navigate = useNavigate()

  const [imageUpload, setImageUpload] = React.useState<File | null>(null)
  const [imageUrls, setImageUrls] = React.useState('')

  const uploadFile = () => {
    if (imageUpload == null) return
    const imageRef = ref(storage, `images/${imageUpload.name}`)
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls(url)
      })
    })
  }
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
    console.log(data)
    if (imageUpload !== null) {
      data['picturePath'] = imageUpload.name // using bracket notation
      uploadFile()
      try {
        const response = await axios.post(
          'https://small-water-6072.fly.dev/auth/register',
          data
        )
        dispatch(login())
        if (response) {
          navigate({ to: '/login', replace: true })
        }
      } catch (error) {
        console.error(error)
      }
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
      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">Занятость</InputLabel>
        <Input
          id="component-helper"
          aria-describedby="component-helper-text"
          {...register('occupation', { required: true })}
        />
        {errors.occupation && (
          <ErrorText id="component-error-text">Это поле обязательно</ErrorText>
        )}
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">Почта</InputLabel>
        <Input
          id="component-helper"
          aria-describedby="component-helper-text"
          {...register('email', { required: true })}
        />
        {errors.email && (
          <ErrorText id="component-error-text">Это поле обязательно</ErrorText>
        )}
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">Возраст</InputLabel>
        <Input
          id="component-helper"
          aria-describedby="component-helper-text"
          {...register('age', { required: true })}
        />
        {errors.age && (
          <ErrorText id="component-error-text">Это поле обязательно</ErrorText>
        )}
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">Город</InputLabel>
        <Input
          id="component-helper"
          aria-describedby="component-helper-text"
          {...register('location', { required: true })}
        />
        {errors.location && (
          <ErrorText id="component-error-text">Это поле обязательно</ErrorText>
        )}
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">Университет</InputLabel>
        <Input
          id="component-helper"
          aria-describedby="component-helper-text"
          {...register('university', { required: true })}
        />
        {errors.university && (
          <ErrorText id="component-error-text">Это поле обязательно</ErrorText>
        )}
      </FormControl>

      <FormControl variant="standard">
        <InputLabel htmlFor="component-helper">Аватар</InputLabel>
        <Input
          type="file"
          onChange={(event) => {
            const inputElement = event.target as HTMLInputElement
            if (
              inputElement &&
              inputElement.files &&
              inputElement.files.length > 0 &&
              inputElement.files[0]
            ) {
              setImageUpload(inputElement.files[0])
            }
          }}
        />
      </FormControl>
      <img src={imageUrls} />
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
      <input value={'Зарегистрироваться'} type="submit" />
    </StyledForm>
  )
}
