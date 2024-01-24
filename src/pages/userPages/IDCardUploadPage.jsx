import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../containers/common/NavBar";
import Footer from "../../containers/common/Footer";
import IDCardUpload from "../../containers/user/IDCardUpload";
import AuthContext from "../../context/AuthContext";
import IDCardDisplay from "../../containers/user/IDCardDisplay";
import axiosInstance from "../../axios/axios";

function IDCardUploadPage() {
  const { user } = useContext(AuthContext);
  const [idCardDetails, setIdCardDetails] = useState(null);

  useEffect(() => {
    const fetchIDCardDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/user/${user.user_id}/id-card/`
        );
        setIdCardDetails(response.data);
      } catch (error) {
        console.error("Error fetching ID card details:", error);
      }
    };

    fetchIDCardDetails();
  }, [user.user_id]);

  return (
    <>
      <NavBar />
      {idCardDetails ? <IDCardDisplay /> : <IDCardUpload />}
      <Footer />
    </>
  );
}

export default IDCardUploadPage;
