import { selectThemeMode } from "@/app/app-slice"
import { useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from "@mui/material/Grid2"
import TextField from '@mui/material/TextField'
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import s from "./Login.module.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { Inputs, loginSchema } from "../../lib/schemas"
import { Path } from "@/common/routing/Routing"
import { Link } from "react-router"
// import { useNavigate } from "react-router"

// type Inputs = {
//   email: string
//   password: string
//   rememberMe: boolean
// }

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)
  console.log("login render")

  const theme = getTheme(themeMode)

  // const navigate = useNavigate()

  const {
    register, // Регистрирует поля формы (связывает с react-hook-form)
    handleSubmit, // Обработчик отправки формы
    reset,
    control,
    formState: { errors }, // Объект с ошибками валидации
  } = useForm<Inputs>({ 
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false } }) // Указываем тип Inputs для TypeScript

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    reset()
  }

  return (
    <Grid container justifyContent={'center'}>
      <FormControl>
        <FormLabel>
          <p>
            To login get registered
            <a
              style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
              href="https://social-network.samuraijs.com"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
          </p>
          <p>or use common test account credentials:</p>
          <p>
            <b>Email:</b> free@samuraijs.com
          </p>
          <p>
            <b>Password:</b> free
          </p>
        </FormLabel>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <TextField
              label="Email"
              margin="normal"
              error={!!errors.email}
              {...register("email")}
            />
            {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}

            <TextField type="password" label="Password" margin="normal" {...register("password")} />
            {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}

            <FormControlLabel
              label="Remember me"
              control={<Controller
                name={'rememberMe'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox onChange={e => onChange(e.target.checked)} checked={value} />
                )}
              />}
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
            <Button component={Link} to={Path.Main} variant="contained" color="primary" sx={{ marginTop: "10px" }}>get back</Button>
          </FormGroup>
        </form>
      </FormControl>
    </Grid>
  )
}