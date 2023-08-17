import React, { useState } from "react";
import { auth } from "../../firebase";
import { Link, NavLink,useNavigate} from "react-router-dom";
import logoImg from "../../assets/img/swasthya.png";
import "../../assets/styles/navbar.css";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Navbar({ userName }) {

  
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate=useNavigate();


  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logout successfully");
      navigate('/login');
    } catch (err) {
      toast.error("Invalid ID/Password");
      console.log("Error logging out:", err.message);
    }
  };


  return (
    <nav>

      <div className="logo">
          <Link to="/" aria-label="Go to Home" activeClassName="active">
        <img src={logoImg} width={100} alt="Swasthya Logo"></img>
        
        <span className="name">
          {
            userName && (<span>Welcome {userName}</span>)
          }
        </span>
      </Link>
      </div>


    <div className="accordion">
      <button className={`menu ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <i class="fa-solid fa-tablet-screen-button fa-bounce" style={{color: "#7d4d93"}}></i>
      </button>
      {menuOpen && (
        <div className="content">
          {/* Place your accordion content here */}
          <div>
             <NavLink to="/about"><span className="link name">About</span></NavLink>
          </div>
          <div>
            <NavLink to="/appointment"><span className="link name">Medicines</span></NavLink>
          </div>
            
        </div>
      )}
    </div>



      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/about"><span className="link name">About</span></NavLink>
        </li>
        <li>
          <NavLink to="/appointment"><span className="link name">Medicines</span></NavLink>
        </li>
        <li>
          <div className="logout-btn">
            {
            userName ?(
              <button onClick={handleLogout} className="btn btn-warning">
                <span>Logout</span>
                <RestoreFromTrashIcon />
              </button>
            ):
                <button className="btn btn-primary">
                  <NavLink to="/login">Login </NavLink>
                </button>
             
              }
          </div>
        </li>
      </ul>



    </nav>
  );
}
