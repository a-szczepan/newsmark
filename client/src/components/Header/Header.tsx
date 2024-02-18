import React, { useState } from 'react'
import { Logo } from '../Logo/Logo'
import styles from './Header.module.scss'
import { Button, ButtonType, IconButton } from '../Button/Button'
import { useWidthChecker } from '../../hooks/useWidthChecker'
import { Drawer } from '../Drawer/Drawer'
import classnames from 'classnames'
import { IconType } from '../Icon/Icon'
import { UserModal } from '../UserModal/UserModal'

type HeaderProps = {
  isHomePage?: boolean
}

export const Header: React.FC<HeaderProps> = ({ isHomePage = false }: HeaderProps): JSX.Element => {
  const HomePageHeader = (): JSX.Element => {
    const isMobile = useWidthChecker() <= 1200 ? true : false

    const desktopHeader = (
      <nav className={styles.header}>
        <Logo />
        <div className={styles.buttonGroup}>
          <Button buttonAction={'#info'} variant={ButtonType.text}>
            How to start
          </Button>
          <Button buttonAction={'#benefits'} variant={ButtonType.text}>
            Benefits
          </Button>
        </div>
        <div className={styles.buttonGroup}>
          <Button buttonAction={'/login'} variant={ButtonType.text}>
            Log in
          </Button>
          <Button buttonAction={'/register'} variant={ButtonType.solid} small>
            Sign up now
          </Button>
        </div>
      </nav>
    )

    const drawerContent = (
      <nav className={classnames(styles.header)}>
        <Logo />
        <Drawer classes={[styles.drawerContent]}>
          <Button buttonAction={'#info'} variant={ButtonType.lightLink}>
            How to start
          </Button>
          <Button buttonAction={'#benefits'} variant={ButtonType.lightLink}>
            Benefits
          </Button>
          <Button buttonAction={'/login'} variant={ButtonType.lightLink}>
            Log in
          </Button>
          <Button buttonAction={'/register'} variant={ButtonType.lightLink}>
            Sign up now
          </Button>
        </Drawer>
      </nav>
    )

    return isMobile ? drawerContent : desktopHeader
  }

  const LoggedInHeader = (): JSX.Element => {
    const [showModal, setShowModal] = useState<boolean>(false)
    return (
      <div className={styles.header}>
        <Logo />
        <>
          <IconButton
            buttonAction={() => {
              setShowModal(!showModal)
            }}
            icon={IconType.user}
            lightVariant
            round
            classes={[styles.userButton]}
          />
          {showModal && <UserModal />}
        </>
      </div>
    )
  }

  return isHomePage ? <HomePageHeader /> : <LoggedInHeader />
}
