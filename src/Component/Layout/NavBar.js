import React, { useState } from "react";
import { auth } from "../../firebase";
import { Link, NavLink,useNavigate} from "react-router-dom";
import logoImg from "../../assets/img/swasthya.png";
import "../../assets/styles/navbar.css";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';


export default function Navbar({ userName }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate=useNavigate();


  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (err) {
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



      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span>a</span>
        <span>s</span>
        <span>c</span>
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
            {userName && (
              <button onClick={handleLogout} className="btn btn-warning">
                <span>Logout</span>
                <RestoreFromTrashIcon />
              </button>
            )}
          </div>
        </li>
      </ul>



    </nav>
  );
}
