import { Avatar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { db } from '../../firebase';
import { parse } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { getDocs, collection, deleteDoc, doc ,updateDoc} from 'firebase/firestore';
import debounce from 'lodash/debounce'; 
import MedicineReminder from './MedicineReminder';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Display() {
  const [medicines, setMedicines] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

   


  useEffect(() => {
  // Function to fetch data from Firebase Firestore
 const fetchMedicine = async () => {
  try {
    const medicineSnapshot = await getDocs(collection(db, "users"));
    const medicineData = medicineSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Sort the medicine data based on the reminder time (in "HH:mm" format)
    medicineData.sort((a, b) => {
      const timeA = parse(a.reminder, 'HH:mm', new Date());
      const timeB = parse(b.reminder, 'HH:mm', new Date());
      return timeA.getTime() - timeB.getTime();
    });
    setMedicines(medicineData);
  } catch (error) {
      toast.error("Data stored Successfully");
    console.error("Error fetching medicine:", error);
  }
};
    fetchMedicine(); 
  }, [medicines]);




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
        toast.success("Reminder Set Successfully");
    } catch (error) {
        toast.error("Error setting reminder");
      console.error('Error setting reminder:', error);
    }
  };




  const deleteMedicine = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      // After successful deletion, update the medicines state to reflect the changes
      setMedicines((prevMedicines) => prevMedicines.filter((medicine) => medicine.id !== id));
      toast.success("Medicine Deleted Successfully");
    } catch (error) {
      toast.success("Error deleting medicine");
      console.error("Error deleting medicine:", error);
    }
  };

  const debouncedSearch = debounce((query) => {
    setSearchQuery(query);
  }, 300); 


  const handleSearchChange = (e) => {
    const { value } = e.target;
    debouncedSearch(value); 

  }

    // Pagination
    const itemsperPage=6;
    const totalPages=Math.ceil(medicines.length/itemsperPage);

      const handlePrevPage=()=>{
        if(currentPage>1){
          setCurrentPage(currentPage-1);
        }
      }
      const handleNxtPage=()=>{
        if(currentPage<totalPages){
          setCurrentPage(currentPage+1);
        }
      }
 
      const startIdx=(currentPage-1)*itemsperPage;
      const endIdx=startIdx+itemsperPage;


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
              <h1>Medicine List</h1>


              
              <form className="row" style={{ margin: '1%' }} onSubmit={(e) => e.preventDefault()}>
                <div className="col-md-5 d-flex flex-row">
                  <div className="mb-2">
                    <input
                      type='text' 
                      className='form-control' 
                      placeholder='Search Clinic Names'
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <Link to='/appointment' style={{marginLeft:"1rem"}}>
                    <button className='btn btn-primary'>
                      Add Medicine
                    </button>
                  </Link>
                </div>
              </form>
              


              {/* List */}
            <div className="container mt-5">
              <div className="row">
                {medicines
                  .filter((medicine) => medicine.clinicName?.toLowerCase().includes(searchQuery?.toLowerCase()))
                  .slice(startIdx,endIdx)
                  .map((medicine) => (
                    <div className="col-md-6" key={medicine.id}>
                      <div className="card my-2">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-7 pt-4">
                              <ul className="list-group">
                                <li className="list-group-item list-group-item-action">
                                  Clinic Name: <span className="fw-bold">{medicine.clinicName}</span>
                                  <IconButton className="del-medicine" onClick={() => deleteMedicine(medicine.id)}>
                                    <DeleteIcon />
                                  </IconButton>
                                  <MedicineReminder onSave={(reminderTime) => handleSaveReminder(medicine.id, reminderTime)} />
                                  
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  Medicine Info: <span className="fw-bold">{medicine.medicine_info}</span>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  <p>Time: {medicine.reminder}</p>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  Phone No: <span className="fw-bold">{medicine.ph_no}</span>

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

        <div className="text-center mt-4">
        <button className="btn btn-secondary me-2" onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button className="btn btn-secondary" onClick={handleNxtPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
            </div>
          </div>
        </section>
            )
        }
    </div>
    </>
  );
}
