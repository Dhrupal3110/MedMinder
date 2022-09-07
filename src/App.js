import { Route, BrowserRouter, Routes } from "react-router-dom";
import Start from "./models/start";
import { useState } from "react";
// All Modules be import
import Alert from "./models/alert";
import Navigate from "./models/navigate";
import Home from "./models/home"
import Login from "./models/login";
import About from "./models/about";
import Blogs from"./models/blogs";
import Doctor from"./models/doctor"
import Hospital from"./models/hospital"
import Patient  from"./models/patient"
import PillAlarm from "./models/pillAlarm";
import Review from"./models/review"
import Service from"./models/service"
import Notes from"./models/Notes"
import TotalCare from"./models/totalCare"
import Footer from "./models/footer";

function App() {
  const[alert,setAlert]=useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <>
        <BrowserRouter>
        {/* <Navigate/> */}
        <Alert alert={alert}/>
    <Routes>
   {/* Login Register */}
    <Route path="/" element={<Start showAlert={showAlert}/>} /> 
    <Route path="/login" element={<Login showAlert={showAlert}/>} /> 
{/* Components */}
    <Route path="/home" element={<Home/>} /> 
    <Route path="/about" element={<About/>} />   
    <Route path="/blogs" element={<Blogs/>} />    
    <Route path="/doctors" element={<Doctor/>} />    
    <Route path="/hospital" element={<Hospital/>} />    
    <Route path="/navigate" element={<Navigate/>} />    
    <Route path="/patient" element={<Patient/>} />    
    <Route path="/service/pillAlarm" element={<PillAlarm/>} />    
    <Route path="/review" element={<Review/>} />    
    <Route path="/service" element={<Service/>} />    
    <Route path="/service/todo" element={<Notes/>} />    
    <Route path="/service/totalCare" element={<TotalCare/>} />       
   </Routes>
   <Footer/>
        </BrowserRouter>
    </>
  );
}

export default App;
