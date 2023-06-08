import { TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  addAddresses,
  editAddresses,
  getAddresses,
} from "../../store/slices/userSlice";

const AddressForm = (props) => {
  const { val, setVal } = props;

  const dispatch = useDispatch();

  const handleChange = (e, name) => {
    setVal({ ...val, [name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { edit, ...data } = val;
    if (edit) {
      await dispatch(editAddresses(val));
    } else {
      await dispatch(addAddresses(data));
    }
    await dispatch(getAddresses());
  };

  return (
    <>
      <div
        className="modal fade"
        id="addressModal"
        tabIndex="-1"
        aria-labelledby="addressModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addressModalLabel">
                {val?.edit ? "EDIT " : "ADD "}
                ADDRESS
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <TextField
                    id="addr"
                    label="Address"
                    multiline
                    rows={4}
                    value={val?.addr}
                    fullWidth
                    onChange={(e) => handleChange(e, "addr")}
                  />
                </div>
                <div className="mb-3">
                  <TextField
                    id="city"
                    label="City"
                    value={val?.city}
                    fullWidth
                    onChange={(e) => handleChange(e, "city")}
                  />
                </div>
                <div className="mb-3">
                  <TextField
                    id="state"
                    label="State"
                    value={val?.state}
                    fullWidth
                    onChange={(e) => handleChange(e, "state")}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                data-bs-dismiss="modal"
              >
                {val?.edit ? "UPDATE " : "ADD "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressForm;
