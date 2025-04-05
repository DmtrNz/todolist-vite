import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Container, LinearProgress, Switch } from '@mui/material'
import {
  changeThemeModeAC,
  selectStatus,
  selectThemeMode,
} from '@/app/app-slice'
import { getTheme } from '@/common/theme/theme'
import { NavButton } from '../NavButton/NavButton'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { containerSx } from '@/common/styles'
import { logoutTC, selectIsLoggedIn } from '@/features/model/auth-slice'

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()

  const changeThemeHandler = () => {
    dispatch(
      changeThemeModeAC({
        themeMode: themeMode === 'light' ? 'dark' : 'light',
      }),
    )
  }

  const logoutHandler = () => {
    dispatch(logoutTC())
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

