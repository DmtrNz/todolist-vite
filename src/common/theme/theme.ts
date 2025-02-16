import { ThemeMode } from "@/app/app-reducer";
import { amber, indigo } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";


export const getTheme = (themeMode: ThemeMode) => {
    return (
        createTheme({
            palette: {
                mode: themeMode,
                primary: indigo,
                secondary: amber
            },
        })
    )
} 
