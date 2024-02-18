import React, { useEffect } from 'react'
import styles from './UserModal.module.scss'
import { IconType } from '../Icon/Icon'
import { Button, ButtonType } from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../../store/api/userApi'
import { useDispatch } from 'react-redux'
import { userLoggedOut } from '../../store/slices/userSlice'
import { useSelector } from 'react-redux'

export const UserModal: React.FC = () => {
  const [logout] = useLogoutMutation()
  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className={styles.userModal}>
      <Button
        buttonAction={async () =>
          await logout(user).then(() => {
            dispatch(userLoggedOut())
            navigate('/')
          })
        }
        variant={ButtonType.text}
        icon={IconType.logout}>
        Log out
      </Button>
      <hr />
      <Button
        buttonAction={() => navigate('/user')}
        variant={ButtonType.text}
        icon={IconType.fileText}>
        My articles
      </Button>
    </div>
  )
}
