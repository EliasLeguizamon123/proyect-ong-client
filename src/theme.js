// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    colors: {
      primary: '#9AC9FB',   //Blue somos mas
      secondary: '#FAFA88', //Yellow somos mas
      tertiary: '#DB5752', //Red somos mas 
      background:  '#DDEDFE', //Blue somos mas (degradado)
      container: '#FFFFFF', //Blanco
      darkBg: '#1A202C',  //gray.800 of chakra
      darkGray: '#2D3748', //gray.600 of chakra
      
    },
  config: {
    initialColorMode: "light"
  }
})

export default theme