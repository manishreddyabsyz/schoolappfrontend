import React from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton } from '@material-ui/core';
import { EditOutlined } from '@mui/icons-material';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Paper from '@mui/material/Paper';

export default function CollapsibleTable(props) {
    console.log(props.rows)

    

    
    return (
      <TableContainer
        component={Paper}
        style={{ boxShadow: "none", border: "1px solid rgb(189 197 206)" }}
      >
        <Table aria-label="collapsible table" style={{ boxShadow: "none" }}>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f1f1f1" }}>
              <TableCell
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "24px",
                  fontFamily: "Poppins",
                }}
              >
                Username
              </TableCell>
              <TableCell
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "24px",
                  fontFamily: "Poppins",
                }}
                align="left"
              >
                Email
              </TableCell>
             
              <TableCell
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "24px",
                  fontFamily: "Poppins",
                }}
                align="left"
              >
                Role
              </TableCell>
              <TableCell
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "24px",
                  fontFamily: "Poppins",
                }}
                align="left"
              >
                {props.role==="Teacher"  ? "Subject" :" Designation"}
              </TableCell>
              <TableCell
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "24px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                }}
                align="left"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {props?.rows?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.username}
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.role}</TableCell>
                  <TableCell align="left">{props.role==="Teacher" ? row.subject : row.designation}</TableCell>
                  <TableCell>
                  <IconButton>
              <EditOutlined
                color="primary"
                fontSize="small"
                style={{
                  minWidth: "14px !important",
                  marginLeft: "2%",
                }}
                onClick={()=>props.handleEditModal(row.id)}
              />
            </IconButton>
            <IconButton>
              <DeleteOutlineIcon
                color="primary"
                fontSize="small"
                style={{
                  minWidth: "14px !important",
                  marginLeft: "2%",
                }}
                onClick={()=>props.handleDeleteModal(row.id)}
              />
            </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }