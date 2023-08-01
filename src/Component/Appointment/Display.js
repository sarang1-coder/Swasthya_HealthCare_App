import { Avatar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { db } from '../../firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { getDocs, collection, deleteDoc, doc ,updateDoc} from 'firebase/firestore';
import debounce from 'lodash/debounce'; 
import MedicineReminder from './MedicineReminder';

export default function Display() {
  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  

  useEffect(() => {
    // Function to fetch data from Firebase Firestore
    const fetchMedicine = async () => {
      try {
        const medicineSnapshot = await getDocs(collection(db, "users"));
        const medicineData = medicineSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Sort the medicine data based on the reminder time (in "HH:mm" format)
        medicineData.sort((a, b) => {
          const timeA = a.reminder;
          const timeB = b.reminder;
          return timeA.localeCompare(timeB);
        });

        setMedicines(medicineData);
      } catch (error) {
        console.error("Error fetching medicine:", error);
      }
    };

    fetchMedicine(); 
  }, []);

    const handleSaveReminder = async (id, reminderTime) => {
    try {
      // Update the reminder time in the Firestore database
      const medicineRef = doc(db, 'users', id);
      await updateDoc(medicineRef, { reminder: reminderTime });

      // Update the medicine data in the state to reflect the changes
      setMedicines((prevMedicines) =>
        prevMedicines.map((medicine) =>
          medicine.id === id ? { ...medicine, reminder: reminderTime } : medicine
        )
      );
    } catch (error) {
      console.error('Error setting reminder:', error);
    }
  };



  const deleteMedicine = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      // After successful deletion, update the medicines state to reflect the changes
      setMedicines((prevMedicines) => prevMedicines.filter((medicine) => medicine.id !== id));
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  const debouncedSearch = debounce((query) => {
    setSearchQuery(query);
  }, 300); 


  const handleSearchChange = (e) => {
    const { value } = e.target;
    debouncedSearch(value); 
  
};


  return (
    <>
       <div className="about-container">
        {
        medicines.length === 0 ? (
                <div className="col-md-12">
                  <div className="alert alert-info">
                    No medicines found.
                  </div>
                </div>
            ):
                (   <section>
          <div className="container">
            <div className="row">
              <form className="row" style={{ margin: '1%' }} onSubmit={(e) => e.preventDefault()}>
                <div className="col-md-5">
                  <div className="mb-2">
                    <input
                      type='text' 
                      className='form-control' 
                      placeholder='Search Clinic Names'
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
                <Link to='/appointment'>
                  <button className='btn btn-primary'>
                    Add Medicine
                  </button>
                </Link>
              </form>

              {medicines
                .filter((medicine) => medicine.clinicName?.toLowerCase().includes(searchQuery?.toLowerCase()))
                .map((medicine) => (
                  <div className="col-md-6" key={medicine.id}>
                    <div className="card my-2">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-7 pt-4">
                            <ul className="list-group">
                              <li className="list-group-item list-group-item-action">
                                Clinic Name: <span className="fw-bold">{medicine.clinicName}</span>
                                <MedicineReminder onSave={(reminderTime) => handleSaveReminder(medicine.id, reminderTime)} />
                              </li>
                              <li className="list-group-item list-group-item-action">
                                Medicine Info: <span className="fw-bold">{medicine.medicine_info} </span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                <p>Time: {medicine.reminder}</p>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                Phone No: <span className="fw-bold">{medicine.ph_no}</span>
                                <IconButton className="del-medicine" onClick={() => deleteMedicine(medicine.id)}>
                                  <DeleteIcon />
                                </IconButton>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
            )
        }
    </div>
    </>
  );
}
