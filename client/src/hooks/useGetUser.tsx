import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGetUserQuery } from '../store/api/userApi'
import { userLoggedIn } from '../store/slices/userSlice'

export const useGetUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    data: user,
    error: userError,
    isSuccess: gotUser,
    isError: gotUserError
  } = useGetUserQuery({})

  useEffect(() => {
    if (gotUser)
      dispatch(
        userLoggedIn({
          sessionId: user?.id,
          email: user?.email
        })
      )
  }, [gotUser])

  useEffect(() => {
    if (userError && 'status' in userError) {
      navigate('/')
    }
  }, [gotUserError])
}
