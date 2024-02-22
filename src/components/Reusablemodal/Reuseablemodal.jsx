import React, { useState } from "react";
import { Button, DialogTitle, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { styles } from "../ReuseableStyles/styles";
import Notification from "../notification/notification";
import axios from "axios";

const Reuseablemodal = (props) => {
  const { editmodal, setEditOpenModal, id, role, data,getData,setNotify } = props;
  const [updatedData, setUpdatedData] = useState(data);
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    const updatedNewData = [...updatedData];
    updatedNewData[0] = {
      ...updatedNewData[0],
      [name]: value,
    };
    setUpdatedData(updatedNewData);
  };

  const update = async (id) => {
    const { username, email, designation,role } = updatedData[0];
    console.log(updatedData.username,updatedData.email,updatedData.role,updatedData.designation);
    if (!username || !email || !designation || !role) {
      return setNotify({
        isOpen: true,
        message: "Please Fill Mandatory Fields",
        type: "error",
      });
    }
    const obj = { username, email, designation };
    if (role === "STUDENT") {
      const response = await axios.put(
        `http://localhost:4000/update-student/${id}`,
        obj
      );
    
    if (response.status === 200) {
        getData();
        setEditOpenModal(!editmodal);
      return setNotify({
        isOpen: true,
        message: response?.data?.message,
        type: "success",
      });
  
    } else {
      return setNotify({
        isOpen: true,
        message: response?.data?.message,
        type: "error",
      });
    }
}
else{
    const response = await axios.put(
        `http://localhost:4000/update-teacher/${id}`,
        obj
      );
      if (response.status === 200) {
        getData();
        setEditOpenModal(!editmodal);
        return setNotify({
          isOpen: true,
          message: response?.data?.message,
          type: "success",
        });
       
      } else {
        return setNotify({
          isOpen: true,
          message: response?.data?.message,
          type: "error",
        });
      }


}
  };

  return (
    <div>
      <Dialog open={editmodal} oonClose={() => setEditOpenModal(!editmodal)}>
        <DialogTitle
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            fontFamily: "roboto",
            color: "#072a63",
          }}
        >
          UPDATE {role} DETAILS:
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={2}
            // sx={{
            //   display: "flex",
            //   justifyContent: "center",
            //   alignItems: "center",
            // }}
          >
            <Grid item xs={4}>
              <span style={styles.labelStyles}>Username</span>
              <span style={styles.madatoryMark}>*</span>
              <TextField
                id="outlined-basic"
                name="username"
                onChange={handleUpdateChange}
                value={updatedData[0]?.username || ""}
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={4}>
              <span style={styles.labelStyles}>Email</span>
              <span style={styles.madatoryMark}>*</span>
              <TextField
                id="outlined-basic"
                name="email"
                onChange={handleUpdateChange}
                value={updatedData[0]?.email || ""}
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={4}>
              <span style={styles.labelStyles}>Role</span>
              <span style={styles.madatoryMark}>*</span>
              <TextField
                id="outlined-basic"
                name="role"
                onChange={handleUpdateChange}
                value={updatedData[0]?.role || ""}
                autoComplete="off"
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <span style={styles.labelStyles}>Designation</span>
              <span style={styles.madatoryMark}>*</span>
              <TextField
                id="outlined-basic"
                name="designation"
                onChange={handleUpdateChange}
                value={updatedData[0]?.designation || ""}
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={4}></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEditOpenModal(!editmodal)}
            variant="outline"
            style={styles.cancelButton}
          >
            Cancel
          </Button>
          <Button
            onClick={() => update(id)}
            variant="contained"
            style={styles.addButton}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Notification notify={notify} setNotify={setNotify} /> */}
    </div>
  );
};

export default Reuseablemodal;
