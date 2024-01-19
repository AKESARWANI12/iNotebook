import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const SignUp = (props) => {
//ye jo props use ho raha hai ye alert showalert ke liye hai
  const[credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
  let navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
  
      // API Call 
      const {name, email, password} = credentials
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/createuser`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },   
       body: JSON.stringify({name, email, password}),
       
     });
    const json = await response.json()
    console.log(json);
    if(json.success){
      //Save the auth token and redirect
      localStorage.setItem('token', json.authtoken)
      props.showAlert("Account Created Successfully","success")
      navigate("/");
    //   
    }
    else{
      props.showAlert("Invalid Credentials", "danger")
    }
  }
  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className='container mt-2'>
      <h2 className='my-3'>Create an Account to use iNoteBook</h2>
      <form onSubmit={handleSubmit}>
  <div className="my-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="name" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" autoComplete='on'/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" autoComplete='on'/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required autoComplete='on'/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required autoComplete='on'/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default SignUp