/* eslint-disable jsx-a11y/img-redundant-alt */
import '../App.css';
import {React,useState} from 'react'
import {  useNavigate ,Link} from "react-router-dom";

// import Home from './home'

const Start = (props) => {

  let history =  useNavigate();
  const [credentials, setCredentials] = useState({ email: "", name: "",phone:"",password:"" });
  const handleSubmit = async (e) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/api/auth/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        name: credentials.name,
        phone: credentials.phone,
        password: credentials.password,
        
      }),
    });
    const json = await response.json();
   
    if (json.success) {
      //redirect
      localStorage.setItem('token',json.authToken);
      history("/home");
      props.showAlert("Account created sucessfully",'success');
    } else {
      props.showAlert("invelid credential", "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
    <div className="paddingTop">
   <section className="book" id="book">
<h1 className="heading"> <span>Medical </span> World</h1>   
<div className="row">

    <div className="image">
   
        <img src="../image/book-img.svg" alt="Displey image"/>
    </div>

    <form action="/" method="post" c>
        <h3>Register Your Self</h3>
        
        <input type="text" name="name" placeholder="your name" className="box" onChange={onChange}  value={credentials.name}/>
        <input type="number" name="phone"  placeholder="your number" className="box" onChange={onChange}  value={credentials.phone}/> 
        <input type="email" name="email"  placeholder="your email" className="box" onChange={onChange}  value={credentials.email}/>
        <input type="text" name="password"  placeholder="your password" className="box" onChange={onChange}  value={credentials.password}/>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
  <div className="containetr" >
    <h5 style={{margin: "10px"}}>Alredy Have account?  {<Link to="Login" >SignIn</Link>}</h5>
  </div>
    </form>

</div>

</section>
</div>
    </>
  )
}

export default Start
