import { CircularProgress, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { Header } from '@/common/components/Header/Header'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { getTheme } from '@/common/theme'
import { selectThemeMode } from './app-slice'
import { ErrorSnackbar } from '@/common/components/ErrorSnackbar/ErrorSnackbar'
import { Routing } from '@/common/routing'
import { useEffect } from 'react'
import { initializeTC, selectIsInitialized } from '@/features/model/auth-slice'
import styles from "./App.module.css"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const isInitialized = useAppSelector(selectIsInitialized)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeTC())
  }, [])

  if (!isInitialized) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <div className={styles.app}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        {/* <Main /> вместо Main отрисуем Routing*/} 
        <Routing></Routing>
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  )
}
