import axios from "axios";
import { axiosRes, getToken } from "../utils/functions";

export const getReq = async (url, token = false) => {
  let headersObj = {};

  if (token) {
    headersObj["auth-token"] = getToken();
  }
  const response = await axios
    .get(`${process.env.REACT_APP_BACK_URL}${url}`, {
      headers: headersObj,
    })
    .catch((err) => {
      console.log(axiosRes(err), `for ${url}`);
      return;
    });

  return response?.data;
  //   return response?.status === 200 ? response?.data : response;
};

export const postReq = async (url, data, token = false) => {
  let headersObj = {};

  if (token) {
    headersObj["auth-token"] = getToken();
  }
  const response = await axios
    .post(`${process.env.REACT_APP_BACK_URL}${url}`, data, {
      headers: headersObj,
    })
    .catch((err) => {
      console.log(axiosRes(err), `for ${url}`);
      return;
    });

  return response?.data;
  //   return response?.status === 200 ? response?.data : response;
};

export const delReq = async (url, data, token = false) => {
  let headersObj = {};

  if (token) {
    headersObj["auth-token"] = getToken();
  }
  const response = await axios
    .delete(`${process.env.REACT_APP_BACK_URL}${url}`, {
      headers: headersObj,
      params: data,
    })
    .catch((err) => {
      console.log(axiosRes(err), `for ${url}`);
      return;
    });

  return response && response?.data;
};
