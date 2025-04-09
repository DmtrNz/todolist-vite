import { useAppSelector } from "../hooks"
import { Route, Routes } from "react-router"
import { Main } from "@/app/Main"
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute"
import { PageNotFound } from "../components"
import { Login } from "@/features/auth/ui/Login/Login"
import { selectIsLoggedIn } from "@/app/app-slice"


export const Path = {
  Main: '/',
  Login: '/login', 
  Dashboard: '/dashboard', //явно показывает, что это полный URL, а не часть пути
  NotFound: "*",
} as const

export const Routing = () => {

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route element={<ProtectedRoute isAllowed={isLoggedIn}/>}>
        <Route path={Path.Main} element={<Main/>}/>
        <Route path={Path.Dashboard} element={<h2>Dashboard</h2>}/>
      </Route>

      <Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath={Path.Main}/>}>
        <Route path={Path.Login} element={<Login/>}/>
      </Route>

      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
