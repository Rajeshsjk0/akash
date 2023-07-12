import React, { useState } from "react";
import "./Header.css";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/actions";

const NavigationBar = ({ matches }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { isLoggedIn, userRole } = useSelector((state) => state);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const logHandler = () => {
    console.log("clicked");
    if (isLoggedIn) {
      dispatch(logout());
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const drawerItems = [{ text: "New Transaction" }, { text: "User Profile" }];

  const handleDrawerItemClick = (text) => {
    switch (text) {
      case "New Transaction":
        navigate("/newTransaction");
        break;
      case "Transactions":
        navigate("/submittedTransactions");
        break;
      case "User Profile":
        navigate("/profile");
        break;
      default:
        break;
    }
  };

  const drawerContent = (
    <div>
      <div className="drawerHeader">
        <IconButton onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
      </div>
      <List>
        {isLoggedIn && (
          <>
            {drawerItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => handleDrawerItemClick(item.text)}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </>
        )}

        {userRole === "Admin" && (
          <ListItem
            button
            onClick={() => handleDrawerItemClick("Transactions")}
          >
            <ListItemText primary={"Transactions"} />
          </ListItem>
        )}

        <ListItem button onClick={logHandler}>
          <ListItemText primary={isLoggedIn ? "Logout" : "Login"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="relative" className="appBar">
        <Toolbar>
          <Typography
            onClick={() => navigate("/")}
            variant="h6"
            className="title"
          >
            Logo
          </Typography>

          {matches ? (
            <IconButton
              edge="start"
              color="inherit"
              className="menuButton"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              {isLoggedIn && (
                <>
                  {drawerItems.map((item) => (
                    <Button
                      onClick={() => handleDrawerItemClick(item.text)}
                      color="inherit"
                    >
                      {item.text}
                    </Button>
                  ))}
                </>
              )}
              {userRole === "Admin" && (
                <Button
                  color="inherit"
                  onClick={() => handleDrawerItemClick("Transactions")}
                >
                  {"Transactions"}
                </Button>
              )}
              <Button color="inherit" onClick={logHandler}>
                {isLoggedIn ? "Logout" : "Login"}
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <nav className="drawer" aria-label="navigation drawer">
        <Drawer
          className="drawerPaper"
          variant="temporary"
          anchor="left"
          open={isDrawerOpen}
          onClose={handleDrawerToggle}
        >
          {drawerContent}
        </Drawer>
      </nav>
    </>
  );
};

export default NavigationBar;
