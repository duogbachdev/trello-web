import { cyan, red, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  trelloCustom: {
    appBarHeight: '58px',
    boardBarHeight: '60px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: teal[400]
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: cyan[400]
        }
      }
    }
  }
  // ...other properties
})

export default theme
