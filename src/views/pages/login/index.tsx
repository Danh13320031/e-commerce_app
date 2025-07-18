'use client'

// ** Mui
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Typography,
  useTheme
} from '@mui/material'

// ** React
import { useState } from 'react'

// ** Next
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// ** Components
import IconifyIcon from 'src/components/Icon'
import CustomTextField from 'src/components/text-field'

// * Forms
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

// ** Regex
import { PASSWORD_REG } from 'src/configs/regex'

// ** Images
import LoginDark from '/public/images/login-dark.png'
import LoginLight from '/public/images/login-light.png'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

type TProps = {}

type TDefaultValues = {
  email: string
  password: string
}

const LoginPage: NextPage<TProps> = () => {
  // State
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isRememberMe, setIsRememberMe] = useState<boolean>(true)

  // Context
  const { login } = useAuth()

  // Theme
  const theme = useTheme()

  // Valaidation
  const schema = yup
    .object()
    .shape({
      email: yup.string().required('Email is required').email('Email must be a valid email'),
      password: yup
        .string()
        .required('Password is required')
        .matches(
          PASSWORD_REG,
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
    })
    .required()

  const defaultValues: TDefaultValues = {
    email: '',
    password: ''
  }

  // Forms
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: { email: string; password: string }) => {
    if (!Object.keys(errors).length) {
      login({ ...data, rememberMe: isRememberMe })
    }
    console.log('data', { data, errors })
  }

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        alignItems: 'center',
        padding: '20px'
      }}
    >
      <Box
        display={{
          md: 'flex',
          xs: 'none'
        }}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20px',
          backgroundColor: theme.palette.customColors.bodyBg,
          height: '100%',
          minWidth: '50vw'
        }}
      >
        <Image
          src={theme.palette.mode === 'light' ? LoginLight : LoginDark}
          alt='login image'
          style={{ width: 'auto', height: 'auto' }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 8
          }}
        >
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
            <Box sx={{ mt: 2, width: '300px' }}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    id='email'
                    label='Email'
                    name='email'
                    placeholder='Enter your email...'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={Boolean(errors.email)}
                    helperText={errors.email ? errors.email.message : ''}
                  />
                )}
                name='email'
              />
            </Box>

            <Box sx={{ mt: 2, width: '300px' }}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomTextField
                    required
                    fullWidth
                    id='password'
                    label='Password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password...'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={Boolean(errors.password)}
                    helperText={errors.password ? errors.password.message : ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                              <IconifyIcon icon='material-symbols-light:visibility-outline' />
                            ) : (
                              <IconifyIcon icon='material-symbols-light:visibility-off-outline-rounded' />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
                name='password'
              />
            </Box>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    name='rememberMe'
                    checked={isRememberMe}
                    color='primary'
                    onChange={e => setIsRememberMe(e.target.checked)}
                  />
                }
                label='Remember me'
              />
              <Link
                style={{
                  color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white
                }}
                href='#'
              >
                Forgot password?
              </Link>
            </Box>

            <Button type='submit' fullWidth variant='contained' color='primary' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px' }}>
              <Typography>{"Don't have an account?"}</Typography>
              <Link
                style={{
                  color: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white
                }}
                href='/register'
              >
                {'Register'}
              </Link>
            </Box>
            <Typography sx={{ textAlign: 'center', mt: 2, mb: 1 }}>Or</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <IconButton
                sx={{
                  color: theme.palette.error.main
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  role='img'
                  fontSize='1.375rem'
                  className='iconify iconify--mdi'
                  width='1em'
                  height='1em'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z'
                  ></path>
                </svg>
              </IconButton>
              <IconButton sx={{ color: '#1976d2' }}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  role='img'
                  fontSize='1.375rem'
                  className='iconify iconify--mdi'
                  width='1em'
                  height='1em'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z'
                  ></path>
                </svg>
              </IconButton>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginPage
