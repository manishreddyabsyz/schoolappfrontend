import React, { useContext, useEffect, useRef, useState } from "react";
import { Themecontext } from "../Routes/Routes";
import { styles } from "../ReuseableStyles/styles";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@material-ui/core";
import DownloadIcon from "@mui/icons-material/Download";
import { CSVLink } from "react-csv";
import "./admin.css";
import ReactLoading from "react-loading";
import axios from "axios";
import Notification from "../notification/notification";
import ReactPaginate from "react-paginate";
import CollapsibleTable from "../Table/Table";
import Reuseablemodal from "../Reusablemodal/Reuseablemodal";
const SheetJSFT = ["csv"]
  .map(function (x) {
    return "." + x;
  })
  .join(",");
const Adminaddteacher = () => {
  const { theme, setTheme } = useContext(Themecontext);
  const[load,setLoad]=useState(false);
  const [teachers, setTeachers] = useState([]);
  const[pageLimit,setPageLimit]=useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [params, setParams] = useState("");
  const [editOpenModal, setEditOpenModal] = useState(false);
  const [id, setId] = useState("");
  const [fieldValue, setFieldValue] = useState();
  const [done, setDone] = useState(true);
  const inputRef = useRef();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const uploadTeacher = async () => {
   setLoad(true);
    await uploadTeachers();
  };

  const handleDeleteModal = (param) => {
    setParams(param);
    setOpenModal(true);
  };
  const handleEditModal = (id) => {
    setEditOpenModal(true);
    setId(id);
  };

  const handlePageClick = async (e, pageNumber) => {
    pageNumber = e.selected;
    setPageCount(pageNumber);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFieldValue(file);
  };
  const uploadTeachers = async () => {
    try {
      const fd = new FormData();
      fd.append("file", fieldValue);
      const response = await axios.post(
        "http://localhost:4000/add-teacher",
        fd
      );
      if (response.status === 200) {
        setLoad(false);
        setNotify({
          isOpen: true,
          message: response?.data?.message,
          type: "success",
        });
        getTeachers();
        inputRef.current.value = '';
      }
    } catch (error) {
     setLoad(false);
      setNotify({
        isOpen: true,
        message: error?.response?.data?.message,
        type: "error",
      });
      inputRef.current.value = '';
    }
  };

  const deleteTeacher = async (id) => {
    try{
    const response = await axios.delete(
      `http://localhost:4000/delete-teacher/${id}`
    );
    if (response.status === 200) {
      if(teachers.length===1) setPageCount(Math.abs(pageCount-1));
      setNotify({
        isOpen: true,
        message: response?.data?.message,
        type: "success",
      });

      getTeachers();
      setOpenModal(false);
    }
    
  }
  
  catch(error){
    setNotify({
      isOpen: true,
      message: error?.response?.data?.message,
      type: "error",
    });
  }
  };

  const getTeachers = async () => {
    try{
      const pageNo=pageCount+1;
    const response = await axios.get(`http://localhost:4000/get-teachers?&limit=5&page=${pageNo}`);
    if (response.status === 200) {
      setDone(false);
      setTeachers(response?.data?.data);
      setPageLimit(response?.data?.count);
    } }
    
    catch(error){
      setNotify({
        isOpen: true,
        message: error?.response?.data?.message,
        type: "error",
      });
      setTeachers([]);
    }
  };

  console.log(teachers);

  useEffect(() => {
    getTeachers();
  }, [pageCount]);

  return (
    <div
      style={
        theme.admin ? styles.darkThemeContainer : styles.lightThemeContainer
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "2%",
          marginLeft: "3.5%",
          marginTop: "2%",
        }}
      >
        <Typography
          style={{
            fontFamily: "Poppins",
            fontSize: "16px",
            fontWeight: 600,
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "normal",
            letterSpacing: "normal",
            color: theme.admin ? "#fff" : "black",
            marginLeft: "-7px",
            marginBottom: "10px",
            paddingTop: "100px",
            paddingRight: "280px",
          }}
          variant="h6"
        >
          Upload Teacher
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ marginLeft: "-7px" }}>
              <input
                name="file"
                id="file"
                type="file"
                class="upload-box"
                accept={SheetJSFT}
                style={{
                  fontSize: "0.8em",
                  fontFamily: "Poppins",
                  height: "41px",
                }}
                ref={inputRef}
                onChange={(e) => handleFileChange(e)}
              />
            </span>
            <Typography
              style={{ ...styles.note, color: theme.admin ? "#fff" : "black" }}
              variant="p"
            >
              Only .csv format allowed &nbsp;
            </Typography>
          </div>
          <Button
            size="large"
            variant="contained"
            onClick={() => uploadTeacher()}
            buttonName="Upload CSV"
            style={{
              backgroundColor: "#1976d2",
              fontSize: "16px",
              fontWeight: "normal",
              fontStretch: "normal",
              fontStyle: "normal",
              lineHeight: "normal",
              letterSpacing: "normal",
              textAalign: "center",
              color: "#fff",
              padding: "0px 15px",
              borderRadius: "4px",
              textTransform: "none",
              height: "40px",
              width: "10vw",
              marginLeft: "10px",
            }}
          >
           {load ? "Uploading..." : "Upload CSV"}
          </Button>

          {/* <CSVLink
            style={{
              color: "#1976d2",
              display: "flex",
              alignItems: "center",
            }}
            // {...partcipantsSheets}
          >
            <DownloadIcon
              color="primary"
              fontSize="medium"
              style={{
                marginRight: "5px",
              }}
            />
            Download Sample CSV
          </CSVLink> */}
        </div>
        {done ? (
          <Box
            sx={{ flexGrow: 1 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <ReactLoading
              type={"spinningBubbles"}
              color={"#fb2485"}
              height={100}
              width={100}
            />
          </Box>
        ) : teachers?.length !== 0 ? (
          <>
            <Box
              style={{
                marginTop: "20px",
                padding: "14px 3.2%",
                width: "100%",
              }}
            >
              <CollapsibleTable
                rows={teachers}
                role="Teacher"
                handleEditModal={handleEditModal}
                // disabled={disabled}
                handleDeleteModal={handleDeleteModal}
                // setUnitId={setUnitId}
                // programLocal={programLocal}
                // editedDetails={editedDetails}
                // setEditedDetails={setEditedDetails}
                // SelectType={selectedValue}
                // handleUnitNavigate={handleUnitNavigate}
              />

                   {pageLimit > 4 ? (
                    <Box>
                      <ReactPaginate
                        previousLabel={<>&laquo;</>}
                        nextLabel={<>&raquo;</>}
                        pageCount={Math.ceil(pageLimit / 5)}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                        forcePage={pageCount}
                      />
                    </Box>
                  ) : null}
            </Box>
          </>
        ) : (
          <div
            style={{
              width: "100%",
              height: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "800",
              fontSize: "18px",
            }}
          >
            <p>No Data Found.</p>
          </div>
        )}
      </div>
      <Dialog
        open={openModal}
        className="dialogBox"
        onClose={() => {
          setOpenModal(!openModal);
        }}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        sx={styles.DialogBoxStyle}
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{ color: "#000" }}
          >
            Are you sure you want to delete ?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpenModal(!openModal)}
            variant="outline"
            style={styles.cancelButton}
          >
            Cancel
          </Button>
          <Button
            onClick={() => deleteTeacher(params)}
            variant="contained"
            style={{ ...styles.addButton, backgroundColor: "red" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {editOpenModal ? (
        <Reuseablemodal
          id={id}
          editmodal={editOpenModal}
          setEditOpenModal={setEditOpenModal}
          role="TEACHER"
          data={teachers}
          setNotify={setNotify}
          getData={teachers}
        />
      ) : (
        ""
      )}
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default Adminaddteacher;
