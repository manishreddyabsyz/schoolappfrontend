import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Themecontext } from "../Routes/Routes"
import { styles } from '../ReuseableStyles/styles'
const Teacher = () => {
    const {theme,setTheme}=useContext(Themecontext)
    const navigate=useNavigate();
    const secondpage=()=>{
        navigate("/teacher/secondpage")
    }
  return (
    <div style={theme.teacher ? styles.darkThemeContainer : styles.lightThemeContainer}>
        <h1 style={theme.teacher ? styles.headingLightTheme : styles.headingDarkTheme}>Welcome Teacher</h1>
            <button  style={styles.buttonStyle}  onClick={secondpage}>Learn more..</button>
    </div>
  )
}

export default Teacher