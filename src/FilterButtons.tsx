import { Box, Button } from "@mui/material"
import { containerSx } from './TodolistItesm.styles'
import { changeFilterAC, FilterValues, Todolist } from "./model/todolists-reducer"
import { useAppDispatch } from "./common/hooks/useAppDispatch"

type Props = {
    todolist: Todolist
}

export const FilterButtons = (props: Props) => {
    const {id,filter} = props.todolist

    const dispatch = useAppDispatch()

    //todolists
    const changeFilter = (filter: FilterValues) => {
        dispatch(changeFilterAC({ todolistId: id, filter }))
    }

    return (
        <Box sx={containerSx}>
            <Button color={filter === 'all' ? 'secondary' : 'primary'}
                variant="contained"
                onClick={() => changeFilter('all')}>
                All
            </Button>
            <Button color={filter === 'active' ? 'secondary' : 'primary'}
                variant="contained"
                onClick={() => changeFilter('active')}>
                Active
            </Button>
            <Button color={filter === 'completed' ? 'secondary' : 'primary'}
                variant="contained"
                onClick={() => changeFilter('completed')}>
                Completed
            </Button>
        </Box>
    )
}


