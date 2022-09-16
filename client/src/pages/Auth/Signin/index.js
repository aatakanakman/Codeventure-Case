import React from 'react'

import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  VStack,
  Container,
  Center,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import validationSchema from './validations'

import { fetchLogin } from '../../../api'

import { useAuth } from '../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
  const history = useNavigate()
  const { login } = useAuth()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin({
          email: values.email,
          password: values.password,
        })
        login(loginResponse)
        history('/profile')
      } catch (e) {
        bag.setErrors({ general: e.response.data.message })
      }
    },
  })

  return (
    <VStack
      minH="calc(100vh - 67px)"
      alignItems="center"
      justifyContent="center"
    >
      <Box textAlign="center">
        <Heading>Sign In</Heading>
      </Box>
      <Box>
        {formik.errors.general && (
          <Alert status="error">{formik.errors.general}</Alert>
        )}
      </Box>
      <Box textAlign="left" minW={480}>
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              isInvalid={formik.touched.email && formik.errors.email}
            ></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              isInvalid={formik.touched.password && formik.errors.password}
            ></Input>
          </FormControl>

          <Button width="full" type="submit">
            Sign In
          </Button>
        </form>
      </Box>
    </VStack>
  )
}

export default Signin
