import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";
import { useSelector } from "react-redux";

const Home = () => {
  let navigate = useNavigate();
  const userRole = useSelector((state) => state.userRole);

  return (
    <div className="home-container">
      <div className="top-button">
        <Button variant="contained" onClick={() => navigate("/newTransaction")}>
          New Transaction
        </Button>
      </div>
      <div className="bottom-button">
        {userRole === "Admin" && (
          <Button
            variant="contained"
            onClick={() => navigate("/submittedTransactions")}
          >
            View Submitted Transactions
          </Button>
        )}
      </div>
    </div>
  );
};

export default Home;
