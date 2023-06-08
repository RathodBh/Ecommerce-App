import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../../utils/functions";
import { Menu, MenuItem } from "@mui/material";
import Confirm from "./Confirm";
import { toast } from "react-toastify";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    removeToken();
    toast.success("Logout successfully..", {
      position: "bottom-center",
    });
    navigate("/");
  };

  const gotoAccount = () => {
    handleClose();
    navigate("/user/address");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
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
              {getToken() ? (
                <>
                  <div className="d-flex align-items-center gap-3">
                    <Link to="/cart">
                      <ShoppingCartIcon style={{ color: "white" }} />
                    </Link>
                    <Link to="/order">
                      <RequestQuoteIcon
                        style={{ color: "white", cursor: "pointer" }}
                      />
                    </Link>
                    <img
                      src="https://www.pngmart.com/files/22/User-Avatar-Profile-PNG-Isolated-Transparent.png"
                      style={{ height: "35px", width: "35px" }}
                      alt="User"
                      onClick={handleClick}
                    />
                  </div>
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
        <MenuItem onClick={gotoAccount}>Address</MenuItem>
        <MenuItem onClick={() => setOpen(true)}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Navigation;
