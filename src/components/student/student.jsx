import React, { useContext ,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Themecontext } from "../Routes/Routes"
import { styles } from '../ReuseableStyles/styles'
const Student = () => {
  const {theme,setTheme}=useContext(Themecontext)
  const navigate=useNavigate();
 
  const secondpage=()=>{
    navigate("/student/secondpage")
  }
  return (
    <div style={theme.student ? styles.darkThemeContainer : styles.lightThemeContainer}> 
      <h1 style={theme.student ? styles.headingLightTheme : styles.headingDarkTheme}>Welcome Student</h1>
          <button style={styles.buttonStyle} onClick={secondpage}>Learn more..</button>
    </div>
  )
}

export default Student