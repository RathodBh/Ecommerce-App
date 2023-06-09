import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses } from "../../store/slices/userSlice";
import AddressForm from "./AddressForm";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";

const initialVal = {
  addr: "",
  state: "",
  city: "",
  edit: "",
};
const Address = ({ title, radio = false, setAdd = false }) => {
  const [val, setVal] = useState(initialVal);
  const [tempAdd, setTempAdd] = useState(0);
  const { addresses } = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAddresses());
  }, []);

  const handleSubmit = () => {
    if (tempAdd === 0) {
      toast.error("Please select valid address");
      return;
    }
    setAdd(tempAdd);
  };
  return (
    <>
      <div className={`${!radio && "mt-2"} container-fluid mb-2 border`}>
        <div
          className="d-flex row p-2 py-3 justify-content-between"
          style={{ background: "gainsboro" }}
        >
          <h6 className="col-6 p-2 mb-0">{title.toUpperCase()}</h6>
          <div className="col-2 d-flex justify-content-end">
            <button
              className="btn btn-sm btn-primary d-flex align-items-center justify-content-center rounded-pill px-3 "
              style={{ fontSize: "14px" }}
              onClick={() => setVal(initialVal)}
              data-bs-toggle="modal"
              data-bs-target="#addressModal"
            >
              <AddIcon style={{ fontSize: "15px" }} /> ADD
            </button>
          </div>
        </div>
        {addresses &&
          addresses?.length > 0 &&
          addresses?.map((address, i) => {
            return (
              <>
                <div className="row p-2 my-2 d-flex justify-content-between">
                  {radio && (
                    <div className="col-2 d-flex justify-content-center">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={"address"}
                        id={i}
                        value={i}
                        onChange={() => setTempAdd(address?.id)}
                      />
                    </div>
                  )}
                  <div className="col-8">
                    <label className="form-check-label" htmlFor={i}>
                      <h6>{address?.addr}</h6>
                      <p>
                        {address?.city},{address?.state}
                      </p>
                    </label>
                  </div>
                  <div className="col-2 d-flex justify-content-end align-items-start">
                    <button
                      className="btn text-primary"
                      onClick={() =>
                        setVal({
                          addr: address?.addr,
                          state: address?.state,
                          city: address?.city,
                          edit: address?.id,
                        })
                      }
                      data-bs-toggle="modal"
                      data-bs-target="#addressModal"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </>
            );
          })}

        {setAdd && (
          <div className=" row p-2 py-3 " style={{ background: "gainsboro" }}>
            <div className="col-12 d-flex justify-content-end">
              <button
                className="btn btn-outline-primary"
                onClick={handleSubmit}
              >
                Confirm Address
              </button>
            </div>
          </div>
        )}
      </div>
      <AddressForm val={val} setVal={setVal} />
    </>
  );
};

export default Address;
