import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from "./ErrorPage.js";
import { auth } from "./firebase.js";
import About from "./Component/Layout/About.js";
import SignIn from "./Component/Auth/SignIn.js";
import SignUp from "./Component/Auth/SignUp.js";
import Main from "./Component/Layout/Main.js";
import Appointment from "./Component/Appointment/Appointments.js";
import Display from "./Component/Appointment/Display.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  return (
    <>
        <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Main name={userName} />}>
          <Route path="/about" element={<About />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/medicine_list" element={<Display />}/>
        </Route>
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </Router>
    <ToastContainer/>
    </>

  );
}

export default App;
