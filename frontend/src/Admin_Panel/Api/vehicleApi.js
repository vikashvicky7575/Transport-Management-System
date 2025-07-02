
import axios from 'axios';

export const addVehicleAPI = async (formData) => {
  await axios.post('http://localhost:5000/api/vehicles/add-vehicle', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
