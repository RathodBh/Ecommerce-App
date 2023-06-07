import React from "react";

const Slider = () => {
  return (
    <>
      <div
        id="slider"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ minHeight: "90vh", height: "700px" }}
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#slider"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#slider"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#slider"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://www.insightssuccess.in/wp-content/uploads/2020/12/785054-ecommerce-istock-020119.jpg"
              className="d-block w-100"
              alt="..."
              style={{ minHeight: "90vh", height: "700px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://i.tribune.com.pk/media/images/1576410-emorce-1512462940/1576410-emorce-1512462940.jpg"
              className="d-block w-100"
              alt="..."
              style={{ minHeight: "90vh", height: "700px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/id/1206800961/photo/online-shopping-and-payment-man-using-tablet-with-shopping-cart-icon-digital-marketing.jpg?s=612x612&w=0&k=20&c=qG_9JB9ll4P5to97_HVxzMqhhzF0Gi1nWM_hNeiotbk="
              className="d-block w-100"
              alt="..."
              style={{ minHeight: "90vh", height: "700px", objectFit: "cover" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#slider"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#slider"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Slider;
