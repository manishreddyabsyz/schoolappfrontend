import React, { useContext } from 'react'
import { Themecontext } from "../Routes/Routes"
import { styles } from '../ReuseableStyles/styles'
const TeacherSecondpage = () => {
    const {theme,setTheme}=useContext(Themecontext)
  return (
    <div style={theme.teacher ? styles.darkThemeContainer : styles.lightThemeContainer} >
        <h1 style={theme.teacher ? styles.headingLightTheme : styles.headingDarkTheme}>TeacherSecondpage</h1>
        
        
    </div>
  )
}

export default TeacherSecondpage;