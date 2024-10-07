import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  // const [userid, setUserid] =useState(() => localStorage.getItem("userId"));// Add state for user ID
  // const [useremail, setUserEmail] = useState(() => localStorage.getItem("userEmail")); // Initialize useremail with value from local storage
  const [role, setRole] = useState(() => localStorage.getItem("role")); // Initialize useremail with value from local storage

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Add useEffect to store useremail in local storage when it changes
  // useEffect(() => {
  //   if (useremail) {
  //     localStorage.setItem("userEmail", useremail);
  //   } else {
  //     localStorage.removeItem("userEmail");
  //   }
  // }, [useremail]);

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  }, [role]);

  // useEffect(() => {
  //   if (userid) {
  //     localStorage.setItem("userId", userid);
  //   } else {
  //     localStorage.removeItem("userId");
  //   }
  // }, [userid]);

  const logout = () => {
    setToken(null); // Clear the token
    // setUserEmail(""); // Clear the user's email
    setRole("");
    // setUserid(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
