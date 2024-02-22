import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLazyGetUserQuery } from '../store/api/userApi'
import { userLoggedIn, userLoggedOut } from '../store/slices/userSlice'

export const useGetUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [
    getUser,
    { data: user, error: userError, isSuccess: gotUser, isError: gotUserError }
  ] = useLazyGetUserQuery()

  useEffect(() => {
    if (gotUser)
      dispatch(
        userLoggedIn({
          sessionId: user?.id,
          email: user?.email
        })
      )
  }, [gotUser, user, dispatch])

  useEffect(() => {
    if(gotUserError) {
      dispatch(userLoggedOut());
    }
  })

  useEffect(() => {
    if (userError && 'status' in userError && window.location.pathname !== '/') {
      navigate('/')
    }
  }, [userError, navigate])

  // Trigger the lazy query to fetch user data
  useEffect(() => {
    getUser({})
  }, [getUser])
}