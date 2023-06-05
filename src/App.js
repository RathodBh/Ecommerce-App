import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-toastify/dist/ReactToastify.css";
// import SignUp from "./components/user/SignUp";
import { ToastContainer } from "react-toastify";
import Router from "./routes";

const App = () => {
  return (
    <>
      {/* <SignUp /> */}
      <Router />
      <ToastContainer />
    </>
  );
};

export default App;
