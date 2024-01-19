import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';


const Login = (props) => {
    const[credentials, setCredentials] = useState({email: "", password: ""})
    let navigate = useNavigate();
    

  const handleSubmit = async (e)=>{
    e.preventDefault();
  
      // API Call 
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
       method: "POST",     //ham method me post request karege 
       headers: {
         "Content-Type": "application/json",
       },   
       body: JSON.stringify({email: credentials.email, password: credentials.password}),  //body bhi to dene padege
       
     });
    const json = await response.json()
    console.log(json);
    if(json.success){
      //Save the auth token and redirect
      localStorage.setItem('token', json.authtoken)
      props.showAlert("Logged In Successfully", "success")
      navigate("/");
    }
    else{
      props.showAlert("Invalid Details", "danger")
    }
  }
  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
    }
  return (
    <div className='mt-2'>
      <h2 className='my-3'>Login to continue to iNoteBook</h2>
      <form onSubmit={handleSubmit}>
  <div className="my-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp" autoComplete='on'/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' id="password" autoComplete='on'/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login;
