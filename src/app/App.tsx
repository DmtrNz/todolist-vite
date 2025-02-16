import './App.css'
import { CssBaseline} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { selectThemeMode } from './app-selector'
import { getTheme } from '../common/theme/theme'
import { Main } from './Main'
import { Header } from '@/common/components/Header/Header'

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline/> 
        <Header/>
        <Main/>
      </ThemeProvider>
    </div>
  )
}
