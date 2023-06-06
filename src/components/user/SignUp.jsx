import React, { useState } from "react";
import "../../assets/css/signup.css";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosRes } from "../../utils/functions";

const initialValue = {
  first_name: "",
  last_name: "",
  email: "",
  mobile: "",
  password: "",
  confirm_password: "",
};

const SignUp = () => {
  const [data, setData] = useState(initialValue);

  const navigate = useNavigate();

  const handleChange = (e, label) => {
    setData({ ...data, [label]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in data) {
      if (data[key] === "") {
        toast.warning("Please fill all details");
        return;
      }
    }

    const postData = await axios
      .post(`${process.env.REACT_APP_BACK_URL}/user/signup`, data)
      .catch((err) => {
        toast.error(`${axiosRes(err)}`);
        return;
      });

    console.log("postData", postData);
    if (postData?.status === 200) {
      toast.success("Registration successfully");
      navigate("/login");
    }
  };

  return (
    <>
      <section
        style={{
          backgroundImage:
            "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          minHeight: "100vh",
        }}
      >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Create an account
                    </h2>

                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col">
                          <TextField
                            className="form-outline mb-4"
                            id="outlined-basic"
                            label="First name"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => handleChange(e, "first_name")}
                          />
                        </div>
                        <div className="col">
                          <TextField
                            className="form-outline mb-4"
                            id="last_name"
                            label="Last name"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => handleChange(e, "last_name")}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <TextField
                            className="form-outline mb-4"
                            id="email"
                            label="Email"
                            variant="outlined"
                            type="email"
                            fullWidth
                            onChange={(e) => handleChange(e, "email")}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <TextField
                            className="form-outline mb-4"
                            id="mobile"
                            label="Mobile"
                            variant="outlined"
                            type="number"
                            fullWidth
                            onChange={(e) => handleChange(e, "mobile")}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <TextField
                            className="form-outline mb-4"
                            id="pwd"
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            onChange={(e) => handleChange(e, "password")}
                          />
                        </div>
                        <div className="col">
                          <TextField
                            className="form-outline mb-4"
                            id="cpwd"
                            label="Confirm password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            onChange={(e) =>
                              handleChange(e, "confirm_password")
                            }
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button className="btn btn-primary w-100" type="submit">
                          Register
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        Have already an account?{" "}
                        <a className="fw-bold text-body">
                          <Link to="/login">
                            <u>Login here</u>
                          </Link>
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
