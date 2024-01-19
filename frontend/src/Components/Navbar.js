import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocation ,useNavigate} from 'react-router-dom';
const Navbar = () => {
  const location = useLocation();
  const Navigate=useNavigate();
  const handlelogout=()=>{
    localStorage.removeItem('token');
    Navigate("/login");
  }
  
    useEffect(()=>{
    //  console.log(location.pathname);
    },[location])
  return (
  
    <div>
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
   <div className="container-fluid">
     <Link className="navbar-brand" to="/">iNotebook</Link>
     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

     <div className="collapse navbar-collapse" id="navbarSupportedContent">
       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
         <li className="nav-item">
           <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`}  aria-current="page" to="/">Home</Link>
         </li>
         <li className="nav-item">
         <Link className={`nav-link ${location.pathname === "/About" ? "active" : ""}`} to="/About">
  About
</Link>

         </li> 
       </ul>
       {!localStorage.getItem('token')?<form className="d-flex">
        <Link className="btn btn-primary mx-1" to="/login" roles="button">Login</Link>
        <Link className="btn btn-primary mx-1" to="/signup" roles="button">Signup</Link>
       </form>:<button onClick={handlelogout} className="btn btn-primary">Logout</button>}
     
     </div>
   </div>
</nav>
    </div>
  )
}

export default Navbar

//   <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`}  aria-current="page" to="/">Home</Link>
// </li>
// <li className="nav-item">
// <Link className={`nav-link ${location.pathname === "/About" ? "active" : ""}`} to="/About">
//here we have used this toggling feature or you can say with the help of uselocation we are finding that particular url and matches ans used ternary operator with hrlp of template literals


























// function Navbar(){
//     return (
     
//  <nav className="navbar navbar-expand-lg bg-body-tertiary">
//   <div className="container-fluid">
//     <Link className="navbar-brand" to="#">Navbar</Link>
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//         <li className="nav-item">
//           <Link className="nav-link active" aria-current="page" to="#">Home</Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="#">Link</Link>
//         </li>
       
         
//       </ul>
//       <form className="d-flex" role="search">
//         <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
//         <button className="btn btn-outline-success" type="submit">Search</button>
//       </form>
//     </div>
//   </div>
// </nav>
       
      
//     );
// }
// export default Navbar;