import './App.css'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { Main } from './Main'
import { Header } from '@/common/components/Header/Header'
import { useAppSelector } from '@/common/hooks'
import { getTheme } from '@/common/theme'
import { selectThemeMode } from './app-slice'
import { ErrorSnackbar } from '@/common/components/ErrorSnackbar/ErrorSnackbar'


export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    return (
        <div className='app'>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <Main />
                <ErrorSnackbar/>
            </ThemeProvider>
        </div>
    )
}
