import "../../assets/styles/appointment.css";
import { useState } from "react";
import InputControl from "../Auth/InputForm";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase.js";
import { Link } from "react-router-dom";
import Payment from "./Payment";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Appointment() {
  const [formData, setFormData] = useState({
    clinicName: "",
    medicine_info: "",
    ph_no: "15",
    reminder: "00:00", // Set the default reminder time
    price:"00"
  });

  const userCollectionsRef = collection(db, "users");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      clinicName: formData.clinicName,
      medicine_info: formData.medicine_info,
      ph_no: Number(formData.ph_no),
      reminder: formData.reminder, // Store the reminder time as a string
      price:formData.price
    };
    console.log(userData);
    
    try { 
      await addDoc(userCollectionsRef, userData);
      console.log("Data stored in Firestore:", userData);
      toast.success("Data stored Successfully");
      // You can redirect to a success page here if needed
    } catch (error) {
       toast.error("Error storing data");
      console.error("Error storing data:", error);
    }
  };

  return (
    <>
      <div className="appoint-container">
        <h1>Buy Medicine</h1>
        <form onSubmit={handleSubmit} className="input-form">
          <InputControl
            label="Clinic Name"
            placeholder="Enter Clinic Name"
            required
            value={formData.clinicName}
            onChange={handleChange}
            name="clinicName"
          />
          <InputControl
            label="Medicine Info"
            placeholder="Enter Medicine Info"
            required
            value={formData.medicine_info}
            onChange={handleChange}
            name="medicine_info"
          />
          <InputControl
            label="Shop Phone no."
            type="number"
            placeholder="Enter Shop Phone"
            required
            value={formData.ph_no}
            onChange={handleChange}
            name="ph_no"
          />
          <InputControl
            label="Reminder Time"
            type="time"
            placeholder="Enter Time to remind"
            required
            value={formData.reminder}
            onChange={handleChange}
            name="reminder"
          />
          <InputControl
            label="Medicine Price"
            placeholder="Enter Medicine Price"
            required
            value={formData.price}
            onChange={handleChange}
            name="price"
          />

          <button type="submit" className="btn btn-warning" style={{ margin: "10px" }}>
            Add Medicine
          </button>

          <Link to="/medicine_list">
            <button className="btn btn-primary">Medicine List</button>
          </Link>

          {/* <Payment/> */}
        </form>
      </div>
    </>
  );
}
