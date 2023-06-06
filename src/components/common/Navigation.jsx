import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosRes, getToken, removeToken } from "../../utils/functions";
import axios from "axios";
import { Button, Menu, MenuItem } from "@mui/material";
import Confirm from "./Confirm";
import { toast } from "react-toastify";

const Navigation = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const openMenu = Boolean(anchorEl);
  //   setToken(getToken());

  useEffect(() => {
    setToken(getToken());
  }, []);
  useEffect(() => {
    token && getUserData();
  }, [token]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUserData = async () => {
    const postData = await axios
      .get(`${process.env.REACT_APP_BACK_URL}/user/data`, {
        headers: { "auth-token": `${token}` },
      })
      .catch((err) => {
        // toast.error(axiosRes(err));
        return;
      });

    if (postData?.status === 200) {
      setIsLogin(true);
    }
  };

  const logout = () => {
    removeToken();
    toast.success("Logout successfully..", {
      position: "bottom-center",
    });
    setIsLogin(false);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Ecommerce store
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/products"
                >
                  Products
                </Link>
              </li>
            </ul>

            <form className="d-flex">
              {isLogin ? (
                <>
                  <img
                    src="https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent.png"
                    style={{ height: "35px", width: "35px" }}
                    alt="User"
                    onClick={handleClick}
                  />
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={() => setOpen(true)}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <Link to="/login">
                  <button className="btn btn-outline-light" type="submit">
                    Login
                  </button>
                </Link>
              )}
            </form>
          </div>
        </div>
      </nav>

      <Confirm
        open={open}
        setOpen={setOpen}
        msg="Are you sure want to Logout?"
        action={logout}
      />
    </>
  );
};

export default Navigation;
