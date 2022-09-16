import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

import { Text, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { user, logout } = useAuth()
  const history = useNavigate()

  const handleLogout = async () => {
    logout(() => {
      history('/')
    })
  }

  return (
    <div>
      <Text fontSize={22}>Profile</Text>
      <code>{JSON.stringify(user)}</code>

      <br></br>
      <br></br>

      <br></br>

      <Button colorScheme="pink" variant="solid" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}

export default Profile
