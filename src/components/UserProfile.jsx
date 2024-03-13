import React from 'react'
import {getAuth} from 'firebase/auth'

const userProfile = () => {
  const auth = getAuth();
  return (
      console.log(auth.displayName)
  )
}

export default userProfile