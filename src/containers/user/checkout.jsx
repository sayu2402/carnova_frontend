import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../axios/axios";
import AuthContext from "../../context/AuthContext";
import useRazorpay from "react-razorpay";

const Checkout = () => {
  const location = useLocation();
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [amount, setAmount] = useState(500);
  const { user } = useContext(AuthContext);
  const [Razorpay] = useRazorpay();

  const pickupDate = location.state.pickupDate;
  const returnDate = location.state.returnDate;

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/user/car-details/${carId}/`
        );
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCar();
  }, [carId]);

  if (!car) {
    return <div>Loading...</div>;
  }

  const no_of_days = () => {
    const pickupDates = pickupDate.split("-");
    const returnDates = returnDate.split("-");
    const days = returnDates[2] - pickupDates[2];
    return days + 1;
  };

  const calculateTotalAmount = () => {
    const days = no_of_days();
    return days * car.price;
  };

  const complete_payment = (payment_id, order_id, signature) => {
    axiosInstance
      .post(
        `api/razorpay/car/book/${carId}/${pickupDate}/${returnDate}/${user.user_id}/`,
        {
          order_id: order_id,
          payment_id: payment_id,
          signature: signature,
          amount: amount,
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const razorpayPayment = () => {
    const totalAmount = calculateTotalAmount();

    axiosInstance
      .post(
        `api/razorpay/car/order/${carId}/${pickupDate}/${returnDate}/${user.user_id}/`,
        {
          amount: totalAmount * 100,
          currency: "INR",
        }
      )
      .then(function (response) {
        const order_id = response.data.data.id;

        const options = {
          key: "rzp_test_dvzChbOoMOn0tH",
          name: "Acme Corp",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: order_id,
          handler: function (response) {
            complete_payment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );
          },
          prefill: {
            name: "Piyush Garg",
            email: "youremail@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });

        rzp1.open();

        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
        // Additional error handling if needed
      });
  };

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="car"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={car.car_photo}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              Owner Name: {car.vendor_name}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {car.brand} {car.car_name}
            </h1>
            <div className="flex mt-6 items-center">
              <div className="flex">
                <span className="mr-3">Transmission:</span>
                <span className="mr-1">{car.transmission}</span>
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Fuel Type:</span>
                <span className="mr-1">{car.fuel_type}</span>
              </div>
            </div>

            <div className="flex mt-4 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex">
                <span className="mr-3">Model:</span>
                <span className="mr-1">{car.model}</span>
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Location:</span>
                <span className="mr-1">{car.location}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="block text-gray-700 text-sm font-bold mb-2">
                Pickup Date: {pickupDate}
              </p>
              <p className="block text-gray-700 text-sm font-bold mb-2">
                Return Date: {returnDate}
              </p>
            </div>

            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                {`Payment: $${calculateTotalAmount()}`}
              </span>
              <button
                onClick={razorpayPayment}
                className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
              >
                Complete Reservation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
