import React, { useState } from "react";
import "../../assets/css/signup.css";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const initialValue = {
  email: "",
  password: "",
};

const Login = () => {
  const [data, setData] = useState(initialValue);

  const navigate = useNavigate();

  const handleChange = (e, label) => {
    setData({ ...data, [label]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = await axios
      .post(`${process.env.REACT_APP_BACK_URL}/user/login`, data)
      .catch((err) => {
        toast.error("Invalid username or password");
        return;
      });

    if (postData?.status === 200) {
      toast.success("Login successfully");
      setData(initialValue);
      navigate("/home");
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
                    <h2 className="text-uppercase text-center mb-5">LOGIN</h2>

                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col">
                          <TextField
                            className="form-outline mb-4"
                            id="email"
                            label="Email"
                            variant="outlined"
                            type="email"
                            fullWidth
                            value={data?.email}
                            onChange={(e) => handleChange(e, "email")}
                            required
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
                            value={data?.password}
                            fullWidth
                            onChange={(e) => handleChange(e, "password")}
                            required
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button className="btn btn-primary w-100" type="submit">
                          Login
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        Don't have an account?
                        <a className="fw-bold text-body">
                          <Link to="/register">
                            <u>Register here</u>
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

export default Login;
