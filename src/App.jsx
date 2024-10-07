import React from "react";
import ClientRoutes from "./routes/ClientRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Error404 from "./pages/client/My/Error404";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            {ClientRoutes}
            {AdminRoutes}

            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
