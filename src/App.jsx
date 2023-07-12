import { Routes, Route } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import "./App.css";

import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import ListTransaction from "./pages/listTransaction/ListTransaction";
import NewTransaction from "./pages/newTransaction/NewTransaction";

import Header from "../src/components/header/Header";
import { useSelector } from "react-redux";
import ProtectedRoute from "./utils/PrivateRoute";

function App() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <div className="app-container">
      <Header matches={matches} />
      <div className="content-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Home />
              </ProtectedRoute>
            }
          />
          newTransaction
          <Route
            path="/submittedTransactions"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ListTransaction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/newTransaction"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <NewTransaction />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
