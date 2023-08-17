import React from "react";
import Slider from "react-carousel-responsive";
import "react-carousel-responsive/dist/styles.css";
import "../../assets/styles/about.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



export default function About() {
  const info = {
  intro: "Your personalized health assistant that aims to make managing your health and medical needs convenient, efficient, and accessible. Whether you want to keep track of your medical records or get valuable health tips, HealthCare has got you covered.",
  key_features: {
    1: 'Medical Records Management:',
    2: 'Medicine Reminders:',
    3: 'Health Tips and Articles:'
  }
}

const editor_pick={
  info1:{
    img_src:'https://thumbs.dreamstime.com/b/health-tips-button-health-tips-web-button-icon-vector-illustration-isolated-white-background-119479527.jpg',
    title:"Eat habit",
    text:"Consume a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats. Avoid excessive consumption of sugary and processed foods."
  },
    info2:{
    img_src:'https://thumbs.dreamstime.com/b/health-tips-button-health-tips-web-button-icon-vector-illustration-isolated-white-background-119479527.jpg',
    title:"Exercise Regularly:",
    text:"Engage in regular physical activity to improve cardiovascular health, build strength, and maintain a healthy weight."
  },
    info3:{
    img_src:'https://thumbs.dreamstime.com/b/health-tips-button-health-tips-web-button-icon-vector-illustration-isolated-white-background-119479527.jpg',
    title:"Stay Hydrated",
    text:"Drink plenty of water throughout the day to keep your body hydrated and to support various bodily functions."
  },
      info4:{
    img_src:'https://thumbs.dreamstime.com/b/health-tips-button-health-tips-web-button-icon-vector-illustration-isolated-white-background-119479527.jpg',
    title:"Stay Hydrated",
    text:"Drink plenty of water throughout the day to keep your body hydrated and to support various bodily functions."
  },
      info5:{
    img_src:'https://thumbs.dreamstime.com/b/health-tips-button-health-tips-web-button-icon-vector-illustration-isolated-white-background-119479527.jpg',
    title:"Stay Hydrated",
    text:"Drink plenty of water throughout the day to keep your body hydrated and to support various bodily functions."
  },
      info6:{
    img_src:'https://thumbs.dreamstime.com/b/health-tips-button-health-tips-web-button-icon-vector-illustration-isolated-white-background-119479527.jpg',
    title:"Stay Hydrated",
    text:"Drink plenty of water throughout the day to keep your body hydrated and to support various bodily functions."
  }
}


  const imgData = {
    img1: 
        {  
            src:"https://i.pinimg.com/originals/14/50/ba/1450bad8ee2824008c441806aba1cfcf.png",
            maxWidth: "300px", 
            height: "auto" 
        },
    img2: 
        {
            src:"https://64.media.tumblr.com/a5bc7f62ea910077f8812297244b145f/ea25255cbccfd7b5-95/s2048x3072_c17333,0,79833,100000/55414f93f065f6befbcc1a24e1166d99037fc574.jpg",
            maxWidth: "300px", 
            height: "auto" 
        },
    img3: 
        { 
            src:"https://th.bing.com/th/id/OIP.-s7OSEjkVX-8GOojp6cZSAHaE7?pid=ImgDet&rs=1",
            maxWidth: "300px",
            height: "auto" 
   
        }
  };

  return (
    <>
    <div className="about-container">

<div className="slider-container">
  <div>
        <h1 className="heading">Advantages of Mobile Apps</h1>
      <ul>
        <li><p>Improved efficiency and speed </p></li>
         <li>Reduction in healthcare costs </li>
          <li>Easier and convenient to use </li>
           <li>Save time </li>
      </ul>
  </div>
    <div className="slider">
  <Slider >
    <img
       src={imgData.img1.src}
       style={{maxWidth: "300px", height: "auto" }}
      alt=""
    />
    <img
       src={imgData.img2.src}
       style={{maxWidth: "300px", height: "auto" }}
      alt=""
    />
    <img
       src={imgData.img3.src}
       style={{maxWidth: "200px", height: "auto" }}
      alt=""
    />
  </Slider>
    </div>

    </div>
  <div className="content">
        <div className="left section">
                    <h2>Swasthya App</h2>
                      <p>
                          {info.intro}
                      </p>
                      <h3>Key Features</h3>
                  <ul>
                    {Object.entries(info.key_features).map(([key, value]) => (
                      <li key={key}>
                        <p>{value}</p>
                      </li>
                    ))}
                    </ul>


        </div>
        
    <div className="container mt-5">
      <div className="row justify-content-center">
        {Object.entries(editor_pick).map(([key, value]) => (
          <div className="col-md-4 mb-4" key={key}>
            <Card>
              <Card.Img variant="top" src={value.img_src} alt={value.title} style={{ width: '30%', height: 'auto',objectFit:"contain"}} />
              <Card.Body>
                <Card.Title>{value.title}</Card.Title>
                <Card.Text>{value.text}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>


  </div>

        
    </div>
    </>
  );
}
