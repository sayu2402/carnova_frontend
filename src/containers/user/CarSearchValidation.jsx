import * as Yup from "yup";

const SearchValidation = Yup.object().shape({
  location: Yup.string().required("Location is required"),
  pickupDate: Yup.date()
    .min(new Date(), "Pickup date must be today or in the future")
    .required("Pickup date is required"),
  returnDate: Yup.date()
    .min(Yup.ref("pickupDate"), "Return date must be greater than pickup date")
    .required("Return date is required"),
});


export default SearchValidation;
