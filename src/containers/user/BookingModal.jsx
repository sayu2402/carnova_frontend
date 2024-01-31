import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axios/axios";
import AuthContext from "../../context/AuthContext";
import Swal from "sweetalert2";

function BookingModal({ onClose }) {
  const { carId } = useParams();
  const [pickupdate, setPickupDate] = useState("");
  const [returndate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const showSweetAlertWithOkButton = (title, text, icon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: false,
      confirmButtonText: "Upload",
      allowOutsideClick: false,
    }).then(() => {
      navigate(`/dashboard/${user.username}/id-card-upload`);
    });
  };

  const handleBookingSubmit = async () => {
    try {
      setLoading(true);

      // Date validations
      const today = new Date().toISOString().split("T")[0];

      if (pickupdate < today) {
        toast.error("Pickup date should be today or a future date.");
        return;
      }

      if (returndate <= pickupdate) {
        toast.error("Return date should be greater than the pickup date.");
        return;
      }

      const response = await axiosInstance.post(
        `/api/user/car-availability/${carId}/${pickupdate}/${returndate}/${user.user_id}/`
      );

      console.log("response in booking", response);

      if (response.data.id_card_exists === false) {
        showSweetAlertWithOkButton(
          "ID Card Required",
          "To complete the booking process, you need to upload your ID card. Please try again after uploading the ID card.",
          "warning"
        );
        return;
      }

      if (response.status === 200) {
        const data = response.data;
        if (data.message === "Car available for booking") {
          // Car is available, navigate to checkout page
          navigate(`/checkout/${carId}`, {
            state: { pickupDate: pickupdate, returnDate: returndate },
          });
        } else {
          toast.error("Car is not available for the selected dates.");
        }
      } else {
        toast.error("Error checking availability");
      }
    } catch (error) {
      console.error("Error checking availability:", error.message);
      toast.error("Ooops..!! Car is not available for the selected dates.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-slate-200 w-full md:w-2/3 lg:w-1/2 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Reserve Your Car</h2>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <label className="flex-1 font-bold px-3">
            Pickup Date:
            <input
              type="date"
              value={pickupdate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="input input-bordered mt-2 bg-black text-white"
              required
            />
          </label>
          <label className="flex-1 font-bold">
            Return Date:
            <input
              type="date"
              value={returndate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="input input-bordered mt-2 bg-black text-white"
              required
            />
          </label>
        </div>
        <div className="flex mt-4">
          <button
            onClick={handleBookingSubmit}
            className={`flex-1 bg-black text-white px-4 py-2 rounded-md mr-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            Check Availability
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-black text-white px-4 py-2 rounded-md ml-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
