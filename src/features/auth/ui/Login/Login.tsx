import { selectThemeMode, setIsLoggedIn } from "@/app/app-slice"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
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
import { useLoginMutation } from "../../api/authApi"
import { AUTH_TOKEN } from "@/common/constans"
import { ResultCode } from "@/common/enums/enums"

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)
  // const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const theme = getTheme(themeMode)

  const dispatch = useAppDispatch()

  const [ login]  = useLoginMutation()

  const {
    register, // Регистрирует поля формы (связывает с react-hook-form)
    handleSubmit, // Обработчик отправки формы
    reset,
    control,
    formState: { errors }, // Объект с ошибками валидации
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false }
  }) // Указываем тип Inputs для TypeScript

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    login(data).then((res)=>{
      if (res.data?.resultCode === ResultCode.Success) {
        localStorage.setItem(AUTH_TOKEN, res.data.data.token)
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
    })
    reset()
  }


  return (
    <Grid container justifyContent={'center'}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  )
}