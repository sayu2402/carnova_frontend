import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios/axios";
import Loading from "../common/Loading";
import { useLocation } from "react-router-dom";

const DisplayUserIDCard = () => {
  const [idCardDetails, setIdCardDetails] = useState(null);
  const location = useLocation();

  const user = location.state?.user;
  const user_id = user?.id;

  useEffect(() => {
    const fetchIDCardDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/user/${user_id}/id-card/`
        );
        setIdCardDetails(response.data);
      } catch (error) {
        console.error("Error fetching ID card details:", error);
      }
    };

    fetchIDCardDetails();
  }, [user.id]);

  if (!idCardDetails) {
    return <Loading />;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>ID Card</h2>
      {idCardDetails && (
        <>
          <div style={styles.photoContainer}>
            <label style={styles.label}>Front Side:</label>
            <img
              style={styles.photo}
              src={idCardDetails.front_photo}
              alt="Front Photo"
            />
          </div>
          <div style={styles.photoContainer}>
            <label style={styles.label}>Back Side:</label>
            <img
              style={styles.photo}
              src={idCardDetails.back_photo}
              alt="Back Photo"
            />
          </div>
        </>
      )}
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

export default DisplayUserIDCard;
