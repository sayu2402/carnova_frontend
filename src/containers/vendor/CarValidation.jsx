import * as Yup from 'yup';

const CarValidation = Yup.object().shape({
  car_name: Yup.string().required('Car name is required'),
  location: Yup.string().required('Location is required'),
  brand: Yup.string().required('Brand is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
  fuel_type: Yup.string().required('Fuel type is required'),
  transmission: Yup.string().required('Transmission is required'),
  model: Yup.string().required('Model is required'),
  description: Yup.string().required('Description is required'),
  car_photo: Yup.mixed().required('Car photo is required'),
  document: Yup.mixed().required('Document is required'),
});

export default CarValidation;
