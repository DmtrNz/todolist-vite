import { Grid2, Paper } from '@mui/material'
import { TodolistItem } from './TodolistItem/TodolistItem'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { selectTodolists, setTodolists,  } from '../../model/todolists-slice'
import { useEffect } from 'react'

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)

    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(setTodolists())
    }, [])

    return (
        <>
            {todolists.map((todolist) => {
                return (
                    <Grid2 key={todolist.id}>
                        <Paper elevation={8} sx={{ p: '15px' }}>
                            <TodolistItem todolist={todolist} />
                        </Paper>
                    </Grid2>
                )
            })}
        </>
    )
}
