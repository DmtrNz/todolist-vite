import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Container, LinearProgress, Switch } from '@mui/material'
import {
  changeThemeModeAC,
  selectIsLoggedIn,
  selectStatus,
  selectThemeMode,
  setIsLoggedIn,
} from '@/app/app-slice'
import { getTheme } from '@/common/theme/theme'
import { NavButton } from '../NavButton/NavButton'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { containerSx } from '@/common/styles'
import { useLogoutMutation } from '@/features/auth/api/authApi'
import { ResultCode } from '@/common/enums/enums'
import { AUTH_TOKEN } from '@/common/constans'

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()

  const [logout ] = useLogoutMutation()

  const changeThemeHandler = () => {
    dispatch(
      changeThemeModeAC({
        themeMode: themeMode === 'light' ? 'dark' : 'light',
      }),
    )
  }

  // const logoutHandler = () => {
  //   dispatch(logoutTC())
  // }

  const logoutHandler = () => {
    logout().then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        // dispatch(setStatus({ status: 'succeeded' }))
        // dispatch(clearData()) //не нужно очищать store, т.к. todolists лежат в кэше
        localStorage.removeItem(AUTH_TOKEN)
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
      }
    })
  }

  const theme = getTheme(themeMode)

  return (
    <AppBar position='static'>
      <Toolbar>
        <Container maxWidth={'lg'} sx={containerSx}>
          <IconButton color='inherit'>
            <MenuIcon />
          </IconButton>
          <div>
            <Switch onChange={changeThemeHandler} color={'default'}></Switch>
            {isLoggedIn && <NavButton onClick={logoutHandler} background={theme.palette.secondary.dark}>Logout</NavButton>}
            <NavButton background={theme.palette.secondary.main}>Faq</NavButton>
          </div>
        </Container>
      </Toolbar>
      {status === 'loading' && <LinearProgress />}
    </AppBar>
  )
}

