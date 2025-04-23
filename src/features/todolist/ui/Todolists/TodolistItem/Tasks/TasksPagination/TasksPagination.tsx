import Pagination from "@mui/material/Pagination"
import Typography from "@mui/material/Typography"
import { ChangeEvent } from "react"
import styles from "./TasksPagination.module.css"
import { PAGE_SIZE } from "@/common/constans"

type Props = {
  totalCount: number
  page: number
  setPage: (page: number) => void
}

export const TasksPagination = ({ totalCount, page, setPage }: Props) => {
  const changePage = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  return (
    <>
      <Pagination
        count={Math.ceil(totalCount / PAGE_SIZE)} //кол-во страниц 
        page={page} //текущая страница
        onChange={changePage}
        shape="rounded"
        color="primary"
        className={styles.pagination}
      />
      <div className={styles.totalCount}>
        <Typography variant="caption">Total: {totalCount}</Typography>
      </div>
    </>
  )
}