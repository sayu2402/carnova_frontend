import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axios/axios";
import AuthContext from "../../context/AuthContext";
import useRazorpay from "react-razorpay";
import Swal from "sweetalert2";
import Loading from "../common/Loading";

const Checkout = () => {
  const location = useLocation();
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [amount, setAmount] = useState(500);
  const { user } = useContext(AuthContext);
  const [Razorpay] = useRazorpay();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [walletBalance, setWalletBalance] = useState(100);

  const pickupDate = location.state.pickupDate;
  const returnDate = location.state.returnDate;

  const showSweetAlert = (title, text, icon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/user/car-details/${carId}/`
        );
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }finally{
        setLoading(false)
      }
    };

    fetchCar();
  }, [carId]);

  const displayConfirmation = () => {
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    navigate("/dashboard/:username/booking-details");
  };

  if (!car) {
    return <div>loading...</div>;
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
        if (response.data.is_blocked) {
          // Show toast for blocked user
          showSweetAlert(
            "Blocked User",
            "Blocked user cannot book cars",
            "warning"
          );
          console.log("here am i");
        } else {
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
              displayConfirmation();
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
            const errorMessage = document.getElementById("error-message");
            errorMessage.textContent = `Payment failed: ${response.error.description}`;
          });

          rzp1.open();

          console.log(response);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleWalletPayment = async () => {
    try {
      const walletApiResponse = await axiosInstance.get(
        `/api/user/wallet/${user.user_id}/`
      );

      const latestWalletBalance = walletApiResponse.data.balance;

      setWalletBalance(latestWalletBalance);

      const totalAmount = calculateTotalAmount();

      const result = await Swal.fire({
        title: "Confirm Wallet Payment",
        text: `Do you want to proceed with a wallet payment of ${totalAmount} credits?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, proceed",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        if (latestWalletBalance >= totalAmount) {
          const paymentResponse = await axiosInstance.post(
            `/api/user/wallet-payment/${carId}/${pickupDate}/${returnDate}/${user.user_id}/`,
            {
              amount: totalAmount,
            }
          );

          showSweetAlert(
            "Payment Success",
            "Wallet payment successful",
            "success"
          );
          displayConfirmation();
        } else {
          showSweetAlert(
            "Insufficient Funds",
            "You don't have enough funds in your wallet",
            "error"
          );
        }
      } else {
        showSweetAlert("Payment Canceled", "Wallet payment canceled", "info");
      }
    } catch (error) {
      console.error("Error making wallet payment:", error);

      showSweetAlert("Payment Failed", "Wallet payment failed", "error");
    }
  };

  return (
    <>
    {loading && <Loading />}
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
                onClick={handleWalletPayment}
                type="button"
                className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
              >
                <svg
                  className="w-4 h-4 me-2 -ms-1 text-[#626890]"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="ethereum"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
                  ></path>
                </svg>
                Pay From Wallet
              </button>

              <button
                onClick={razorpayPayment}
                type="button"
                className="flex ml-auto py-2 px-6  text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm  text-center  items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
              >
                <svg
                  className="w-4 h-4 me-2 -ms-1"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="paypal"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"
                  ></path>
                </svg>
                Check out with Razorpay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-green-600 w-28 h-28 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="text-4xl font-bold mb-2">Thank You!</h1>
            <p className="mb-4">
              Thank you for Booking! Check your email for The Booking Details
            </p>
            <button
              onClick={closeConfirmation}
              className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span className="text-sm font-medium">Booking Details</span>
            </button>
          </div>
        </div>
      )}
    </section>
    </>
  );
};

export default Checkout;
