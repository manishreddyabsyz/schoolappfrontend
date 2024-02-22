import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Button } from "@mui/material";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import Cookies from "js-cookie";
import { Link, NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Themecontext } from "../Routes/Routes";
import TeacherIcon from "../../images/teacher.png";
import StudentIcon from "../../images/student.png";
import HomeIcon from "../../images/home.png";
import "./Navbar.css";
import { styles } from "../ReuseableStyles/styles";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
    
  }),
}));

export default function Navbar({ setIsAuthenticated }) {
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState(false);
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const role = Cookies.get("role");
  const id = localStorage.getItem("userId");

  const { theme, setTheme } = React.useContext(Themecontext);
  React.useEffect(() => {
    const studentTheme = localStorage.getItem(`studentTheme_${id}`);
    console.log(studentTheme);
    if (studentTheme !== null) {
      setTheme((prevTheme) => ({
        ...prevTheme,
        student: studentTheme === "true",
      }));
    } else {
      setTheme({ ...theme, student: false });
    }
  }, [id, setTheme]);

  React.useEffect(() => {
    const teacherTheme = localStorage.getItem(`teacherTheme_${id}`);
    console.log(teacherTheme);
    if (teacherTheme !== null) {
      setTheme((prevTheme) => ({
        ...prevTheme,
        teacher: teacherTheme === "true",
      }));
    } else {
      setTheme({ ...theme, teacher: false });
    }
  }, [id, setTheme]);

  const themeChange = async () => {
    setColor(!color);
    let updatedTheme = { ...theme };
    if (role === "Admin") {
      updatedTheme = { ...theme, admin: !theme.admin };
      localStorage.setItem("admintheme",JSON.stringify(updatedTheme));
    } else if (role === "Teacher") {
      updatedTheme = { ...theme, teacher: !theme.teacher };
      localStorage.setItem(
        `teacherTheme_${id}`,
        updatedTheme.teacher.toString()
      );
    } else if (role === "Student") {
      updatedTheme = { ...theme, student: !theme.student };
      localStorage.setItem(
        `studentTheme_${id}`,
        updatedTheme.student.toString()
      );
    }
    setTheme(updatedTheme);
  };

  React.useEffect(()=>{
    const theme=JSON.parse(localStorage.getItem("admintheme"));
    setTheme(theme);
  },[])
 

  const logout = () => {
    Cookies.remove("role");
    Cookies.remove("access_token");
    setIsAuthenticated(false);
    <Navigate to="/" />
  };

  let style;
  if (role === "Admin") {
    style = theme.admin ? "#F7F8F9" : "grey";
  } else if (role === "Teacher") {
    style = theme.teacher ? "#F7F8F9" : "#091E42";
  } else if (role === "Student") {
    style = theme.student ? "#F7F8F9" : "#091E42";
  }

  const StyledIcon = styled("img")`
  filter: ${({ theme }) => (theme.admin ? "invert(100%)" : "none")};
  width: 24px;
  height: 24px;
`;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={theme.admin ? styles.darkNavbarbg : styles.lightNavbarbg}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon sx={{color : theme.admin ? "white" : "black"}} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={
              theme.admin ? styles.darkNavbarHeading : styles.lightNavbarHeading
            }
          >
            Project
          </Typography>
          <div style={{ textAlign: "right", width: "80%", marginLeft: "86px" }}>
            <IconButton color="inherit" onClick={themeChange}>
              <Brightness3Icon sx={{ color: style }} />
            </IconButton>
            <Button
              color="inherit"
              onClick={logout}
              style={theme.admin ? styles.darklogoutBtn : styles.lightlogoutBtn}
            >
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
     
      <Drawer variant="permanent" open={open} sx={{
    backgroundColor: theme.admin ? "#091E42"  : "white", 
    "& .MuiDrawer-paper": {
      backgroundColor: theme.admin ? "#091E42"  : "white", 
    },
  }} >
    
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon sx={{color:  theme.admin ?  "white" : ""}} />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {[
              {
                text: "Home",
                icon: <img src={HomeIcon} alt="Home" className="icon" style={{ filter: theme.admin ? "invert(100%)" : "none" }}/>,
                link: "/admin/dashboard",
              },
              {
                text: "Teacher",
                icon: <img src={TeacherIcon} alt="Teacher" className="icon"   style={{ filter: theme.admin ? "invert(100%)" : "none" }}/>,
                link: "/admin/addteacher",
              },
              {
                text: "Student",
                icon: <img src={StudentIcon} alt="Student" className="icon"  style={{ filter: theme.admin ? "invert(100%)" : "none" }} />,
                link: "/admin/addstudent",
              },
            ].map((item, index) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  component={Link}
                  to={item.link}
                  activeClassName="active"
                  exact
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    backgroundColor:
                      location.pathname === item.link
                        ? theme.admin ? "#44546F" : "#e6e8e6"
                        : "transparent",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 ,color: theme.admin ? "white" : ""}}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />
        
      </Drawer>
     
    </Box>
  );
}
