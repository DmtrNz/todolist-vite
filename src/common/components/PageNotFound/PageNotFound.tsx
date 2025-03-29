import { Link } from "react-router"
import styles from "./PageNotFound.module.css"
import Button from "@mui/material/Button"
import { Path } from "@/common/routing/Routing"

export const PageNotFound = () => {

  return (
  <div className={styles.module}>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <Button component={Link} to={Path.Main} variant="contained" color="primary">get back</Button>
  </div>
  )
}
