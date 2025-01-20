import { SxProps } from '@mui/material'

export const containerSx: SxProps = {
    display: 'flex',
    justifyContent: 'space-between',
}

export const getListItemSx = (isDone: boolean): SxProps => ({
    opacity: isDone ? 0.5 : 1,
    fontWeight: isDone ? 400 : "700",
})

//the same code but it is the longest form
// export const getListItemSx = (isDone: boolean): SxProps => {
//     return(
//         {   
//             opacity: isDone ? 0.5 : 1,
//             fontWeight: isDone ? 400 : "700",
//         }
//     )
// }