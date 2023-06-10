import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsWithCategory } from "../../store/slices/productSlice";
import { allOrders } from "../../store/slices/orderSlice";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const AllOrder = () => {
  const { products } = useSelector((state) => state.product);
  const { allOrdersVal } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsWithCategory());
    dispatch(allOrders());
  }, []);

  return (
    <>
      <div className="container my-3">
        <div className="row my-2">
          <div className="col-12 ">
            <h5>All orders</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="accordion" id="allOrdersAccordion">
              {allOrdersVal
                ?.map((order, index) => {
                  let total_amount = 0;
                  return (
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${order.id}`}
                          aria-expanded="false"
                          aria-controls={order.id}
                        >
                          <span>
                            <b>Order #{index + 1} </b>
                          </span>
                          <span className="text-secondary">
                            &nbsp; ( Items: {order?.orders?.length})
                          </span>
                        </button>
                      </h2>
                      <div
                        id={order.id}
                        // className="accordion-collapse collapse "
                        className={`${
                          index === allOrdersVal?.length-1 ? "show" : " "
                        } accordion-collapse collapse`}
                        aria-labelledby="headingTwo"
                        data-bs-parent="#allOrdersAccordion"
                      >
                        <div className="accordion-body">
                          {/* orders details  */}
                          <div className="container my-2">
                            <div
                              className="row p-2 py-3 "
                              style={{ background: "gainsboro" }}
                            >
                              <div className="col-12 d-flex justify-content-between align-items-center">
                                <div className="part1">
                                  <h5 className="d-flex justify-content-center align-items-center">
                                    {index === order.length - 1 && "Last "}
                                    Order Details:
                                  </h5>
                                  <h6 className="d-flex align-items-center gap-2 text-secondary mb-0">
                                    <CalendarMonthIcon />{" "}
                                    {order &&
                                      new Date(order?.createdAt).toDateString()}
                                  </h6>
                                </div>
                                <div className="d-flex gap-3">
                                  <LocationOnIcon className="text-secondary" />
                                  <div className="text-secondary">
                                    <h6 className="">
                                      {order?.addresses?.addr}
                                    </h6>
                                    <h6 className="mb-0">
                                      {order?.addresses?.city},{" "}
                                      {order?.addresses?.state}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {order?.orders &&
                              order?.orders?.map((p) => {
                                total_amount += p?.total;
                                const prod = products?.find(
                                  (curProd) => curProd?.id === p?.prod_id
                                );
                                return (
                                  <Fragment key={p?.id}>
                                    <div
                                      className="d-flex row border bg-light"
                                      key={p?.id}
                                    >
                                      <div className="col-3 d-flex justify-content-center p-2">
                                        <img
                                          src={prod?.img_url}
                                          alt="a"
                                          className="w-100"
                                          style={{
                                            maxWidth: "200px",
                                            aspectRatio: "1/1",
                                            objectFit: "cover",
                                          }}
                                        />
                                      </div>
                                      <div className="col-8">
                                        <div className="py-3 h-100">
                                          <h6 className="d-flex gap-2 align-items-center">
                                            <span>{prod?.name}</span>
                                            <span
                                              className="rounded-pill border p-1 px-2"
                                              style={{ fontSize: "14px" }}
                                            >
                                              {prod?.brand_name}
                                            </span>
                                          </h6>
                                          <p>{prod?.description}</p>
                                          <div className="d-flex align-items-center gap-2">
                                            <span
                                              className="text-dark"
                                              style={{ fontSize: "14px" }}
                                            >
                                              &#8377;{" "}
                                              {p?.price.toLocaleString("en-IN")}
                                            </span>
                                            <span
                                              className="text-secondary"
                                              style={{ fontSize: "14px" }}
                                            >
                                              <b>
                                                {" x "}
                                                {p?.quantity}
                                              </b>
                                            </span>
                                            <span
                                              className="text-success"
                                              style={{ fontSize: "15px" }}
                                            >
                                              <b>
                                                {" = "}
                                                {p?.total?.toLocaleString(
                                                  "en-IN"
                                                )}
                                              </b>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Fragment>
                                );
                              })}
                            <div
                              className="d-flex row p-2 py-3 justify-content-between"
                              style={{ background: "gainsboro" }}
                            >
                              <h6 className="mb-0">
                                Total:{" "}
                                <span className="text-primary">
                                  &#8377; {total_amount.toLocaleString("en-IN")}
                                </span>
                              </h6>
                            </div>
                          </div>
                          {/* end orders details  */}
                        </div>
                      </div>
                    </div>
                  );
                })
                .reverse()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllOrder;
