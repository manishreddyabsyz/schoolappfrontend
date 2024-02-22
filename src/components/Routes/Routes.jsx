// RoutesComponent.js
import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Studentsecondpage from "../student/studentsecondpage";
import PageNotFound from "../pagenotfound/pageNotFound";
import Notification from "../notification/notification";
import Student from "../student/student";
import TeacherSecondpage from "../teacher/teacherSecondpage";
import Teacher from "../teacher/teacher";
import Adminaddteacher from "../admin/adminaddteacher";
import Admin from "../admin/admin";
import NotFound from "../notfound/NotFound";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import Navbar from "../Navbar/Navbar";
import Login from "../login/login";
import Signup from "../Signup/signup";
import Adminaddstudent from "../admin/adminaddstudent";
export const Themecontext = createContext();
const ROLES = {
  ADMIN: "Admin",
  TEACHER: "Teacher",
  STUDENT: "Student",
};

const RoutesComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState({
    admin: false,
    teacher: false,
    student: false,
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  const role = Cookies.get("role");

  useEffect(() => {
    const checkAuthentication = async () => {
      const accessToken = Cookies.get("access_token");
      console.log(accessToken)
      if (accessToken) {
        setIsAuthenticated(true);
        try {
          const response = await axios.post(
            "http://localhost:4000/verify-access-token",
            { token: accessToken }
          );
          const { authenticated, role } = response.data;
          setIsAuthenticated(authenticated);
        } catch (error) {
          try {
            const response = await axios.post(
              "http://localhost:4000/refresh-token",
              { refreshToken: Cookies.get("refresh_token") }
            );
            console.log(response,"refresh")
            const {accessToken} = response.data;
            const expiresInMinutes = 15;
            const expirationTimeInSeconds = expiresInMinutes * 60;
            console.log(accessToken)
            Cookies.set("access_token", accessToken, {
                expires: expirationTimeInSeconds,
              });
              
            checkAuthentication();
          } catch (error) {
            setNotify({
              isOpen: true,
              message: error?.response?.data?.message,
              type: "error",
            });
            setIsAuthenticated(false);
            navigate("/");
            console.log("Error retreving refresh token",error);
          }
        }
      } else {
        console.log("else");
        navigate("/");
      }
    };

    checkAuthentication();
  }, []);

  return (
    <div>
      <Themecontext.Provider value={{ theme, setTheme }}>
        {isAuthenticated && (
          <Navbar
            setIsAuthenticated={setIsAuthenticated}
            isAuthenticated={isAuthenticated}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to={`/${role}/dashboard`} />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate to={`/${role}/dashboard`} />
              ) : (
                <Signup setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route path="/pagenotfound" element={<PageNotFound />} />
          {/* adimin routes */}
          <Route element={<ProtectedRoutes allowedRoles={ROLES.ADMIN} />}>
            <Route path="/admin/dashboard" element={<Admin />} />
            <Route path="/admin/addteacher" element={<Adminaddteacher />} />
            <Route path="/admin/addstudent" element={<Adminaddstudent />}/>
            <Route exact path="*" element={<NotFound />} />
          </Route>

          {/* teacher routes  */}
          <Route element={<ProtectedRoutes allowedRoles={ROLES.TEACHER} />}>
            <Route path="/teacher/dashboard" element={<Teacher />} />
            <Route path="/teacher/secondpage" element={<TeacherSecondpage />} />
            <Route exact path="*" element={<NotFound />} />
          </Route>

          {/* student routes  */}
          <Route element={<ProtectedRoutes allowedRoles={ROLES.STUDENT} />}>
            <Route path="/student/dashboard" element={<Student />} />
            <Route path="/student/secondpage" element={<Studentsecondpage />} />
            <Route exact path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Themecontext.Provider>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default RoutesComponent;
