import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Container, Switch } from '@mui/material'
import { useAppSelector } from '@/common/hooks/useAppSelector'
import { selectThemeMode } from '@/app/app-selector'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { changeThemeModeAC } from '@/app/app-reducer'
import { getTheme } from '@/common/theme/theme'
import { containerSx } from '@/common/styles/container.styles'
import { NavButton } from '../NavButton/NavButton'


export const Header = () => {

    const themeMode = useAppSelector(selectThemeMode)

    const dispatch = useAppDispatch()

    const changeThemeHandler = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === "light" ? 'dark' : "light"}))
    }

    const theme = getTheme(themeMode)

    return (
        <AppBar position="static">
            <Toolbar>
                <Container maxWidth={"lg"} sx={containerSx}>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <div>
                        <Switch onChange={changeThemeHandler} color={'default'}></Switch>
                        <NavButton >Sign in</NavButton>
                        <NavButton >Sign up</NavButton>
                        <NavButton background={theme.palette.secondary.main}>Faq</NavButton>
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    )
}