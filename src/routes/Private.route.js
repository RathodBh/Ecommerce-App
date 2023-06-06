import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/functions";

const Private = ({ reverse = false }) => {
  let token = getToken();
  token = reverse ? !token : token;
  return token ? <Outlet /> : <Navigate to="/" />;
};
export default Private;
