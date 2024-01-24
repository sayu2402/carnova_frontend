import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../axios/axios";
import AuthContext from "../../context/AuthContext";
import Loading from "../common/Loading";

const IDCardDisplay = () => {
  const { user } = useContext(AuthContext);
  const [idCardDetails, setIdCardDetails] = useState(null);

  useEffect(() => {
    const fetchIDCardDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/user/${user.user_id}/id-card/`);
        setIdCardDetails(response.data);
      } catch (error) {
        console.error("Error fetching ID card details:", error);
      }
    };

    fetchIDCardDetails();
  }, [user.user_id]);

  if (!idCardDetails) {
    return <Loading />;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>ID Card</h2>
      <div style={styles.photoContainer}>
        <label style={styles.label}>Front Photo:</label>
        <img style={styles.photo} src={idCardDetails.front_photo} alt="Front Photo" />
      </div>
      <div style={styles.photoContainer}>
        <label style={styles.label}>Back Photo:</label>
        <img style={styles.photo} src={idCardDetails.back_photo} alt="Back Photo" />
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f8f8f8",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "16px",
    color: "#333",
  },
  photoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "18px",
    marginBottom: "8px",
    color: "#555",
  },
  photo: {
    width: "100%", 
    maxWidth: "300px",
    borderRadius: "8px",
  },
};

export default IDCardDisplay;
