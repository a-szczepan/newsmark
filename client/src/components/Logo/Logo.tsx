import React from 'react'
import styles from './Logo.module.scss'
import { ReactSVG } from 'react-svg'
import LogoImg from '../../assets/images/Newsmark.svg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Logo: React.FC = () => {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state: any) => state.user.sessionId)

  return (
    <a href="/" onClick={() => (isLoggedIn ? navigate('/articles') : navigate('/'))}>
      <ReactSVG src={LogoImg} className={styles.logo} />
    </a>
  )
}
