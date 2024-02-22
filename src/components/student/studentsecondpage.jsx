import React, { useContext } from 'react'
import { Themecontext } from "../Routes/Routes"
import { styles } from '../ReuseableStyles/styles'
const Studentsecondpage = () => {
    const {theme,setTheme}=useContext(Themecontext)
  return (
    <div style={theme.student ? styles.darkThemeContainer : styles.lightThemeContainer}>
       <h1 style={theme.student ? styles.headingLightTheme : styles.headingDarkTheme}>studentsecondpage</h1>
        
        </div>
  )
}

export default Studentsecondpage