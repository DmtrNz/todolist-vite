import { CircularProgress, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { Header } from '@/common/components/Header/Header'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { getTheme } from '@/common/theme'
import { selectThemeMode, setIsLoggedIn } from './app-slice'
import { ErrorSnackbar } from '@/common/components/ErrorSnackbar/ErrorSnackbar'
import { Routing } from '@/common/routing'
import { useEffect, useState } from 'react'
import styles from "./App.module.css"
import { useMeQuery } from '@/features/auth/api/authApi'
import { ResultCode } from '@/common/enums/enums'

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  //const isInitialized = useAppSelector(selectIsInitialized)
  const { data } = useMeQuery()

  const dispatch = useAppDispatch()

  const [isInitialized, setIsInitialized] = useState(false)

  // useEffect(() => {
  //   dispatch(initializeTC())
  // }, [])

  useEffect(() => {
    if (data) {
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
      setIsInitialized(true)
    }
  }, [data])

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
        <Routing></Routing>
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  )
}
