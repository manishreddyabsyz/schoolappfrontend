import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Themecontext } from "../Routes/Routes"
import { styles } from '../ReuseableStyles/styles'
import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { makeStyles } from "@material-ui/core";
import Button from '@mui/material/Button';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundColor: 'blue', // Set the background color to blue
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const Admin = () => {
    const {theme,setTheme}=useContext(Themecontext);
   
    const navigate=useNavigate();
    
    const [create, setCreate] = useState("");
   
    const classes = useStyles();
  const handleChange = (event) => {
    if(event.target.value==="Teacher"){
      navigate("/admin/addteacher")
    }else{
      navigate("/admin/addstudent");
    }
    setCreate(event.target.value);
  };

   
  return (
    <div style={theme.admin ? styles.darkThemeAdminContainer : styles.lightThemeAdminContainer}>
        <h1 style={theme.admin ? styles.headingLightTheme : styles.headingDarkTheme}>"Welcome Admin"</h1>
        <div >
        <Typography
              variant="div"
              sx={{
                float: "right",
                marginRight: "15px !important",
                background: "#1976d2 !important",
                color: "#FFFFFF !important",
                borderRadius: "6px",
              }}
            >
        <FormControl fullWidth>
      <InputLabel id="role-label" sx={styles.label} shrink={false}>Add</InputLabel>
      <Select
     name="Create"
     value={create}
     onChange={handleChange}
   
     label="Create"
     placeholder="Create"
     className="dropdown-input-color-setting"
     size="small"
     style={{
       width: "180px",
       height: "38px",
       
       borderRadius: "6px",
       borderColor: "none",
     }}
      >
        <MenuItem value={'Teacher'}>Teacher</MenuItem>
        <MenuItem value={'Student'}>Student</MenuItem>
      </Select>
    </FormControl>
    </Typography>

        </div>
        <div>

        </div>
   
 
    </div>
  )
}

export default Admin