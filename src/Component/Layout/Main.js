import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer.js";
import Navbar from "./NavBar.js";
import "../../assets/styles/main.css";




export default function Main(props) {
  return (
        <div className="main">
            <Navbar userName={props.name}/>
              <div className="main-container">
                  <h1>Welcome to Health Care App</h1>
                  <div className="basic-info">
                    <div className="imgs">
                      <div>
                            <img src="https://assets.website-files.com/637be5d0f2736f32b8ad98cd/6390a10bf1ad119b8df33b78_doctor.jpeg" style={{width:'30%',height:'30%',objectfit:'cover'}}/>
                            <img src='https://c0.wallpaperflare.com/preview/360/533/202/health-medical-healthcare-health.jpg' style={{width:'30%',height:'30%',objectfit:'cover'}}/>
                            <img src='https://th.bing.com/th/id/OIP.A25yRnSz2nFKnL2489mg7gHaE8?pid=ImgDet&rs=1' style={{width:'30%',height:'30%',objectfit:'cover'}}/>
                      </div>
                      <img src="https://echoinnovateit.com/wp-content/uploads/2019/07/medical-app-for-healthcare.png"/>
                    </div>

                      <h2><b>What are healthcare apps?</b></h2>
                      <p>Health and wellness apps fall under the category of healthcare. Even though both are very similar, they do have very distinct differences.</p>
                      <p>A health app is categorized by the FDA as mobile software that diagnoses, tracks, or treats disease. 
                          A wellness app is a mobile software that enhances or tracks the overall health of the user. These apps can address mental, physical, social, environmental, or even spiritual factors that relate to overall health. 
                      </p>
                      
                      <h2>Benefits of Healthcare Apps</h2>
                      <p>As you may already realize, mobile healthcare app development has become instrumental for healthcare providers to be able to meet the ever-changing needs of their patients and stay ahead of competitors. Those providers that team up with digital experts to strategically design and build quality mobile experiences will enhance patient loyalty -- which will positively impact their current and future revenue.  </p>
                      <h2>What do patients want in a healthcare app??</h2>
                      <ul>
                        <li>
                          <b>Functionality: Easy to Use</b>
                        </li>
                        <li><b>Accessibility: Clear Information with Actionable Steps for All Users</b></li>
                        <li><b>Easy Communication with Professionals </b></li>
                        <li><b>Community</b></li>
                      </ul>
                      
                  </div>
              </div>
            <Outlet/>
            <Footer/>
        </div>
    
  );
}
