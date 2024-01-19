import './App.css';
import Home from './Components/Home';
import React, { useState } from 'react'
import {BrowserRouter ,Routes,Route} from "react-router-dom";
import Navbar from './Components/Navbar';
import About from './Components/About';
import NoteState from "./context/notes/NoteState";
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App(){
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  return (
   
    <React.Fragment>
    <NoteState>
      
    <BrowserRouter>
     <Navbar/>
     <Alert alert={alert}/>
     <div className="container">
      <Routes>
      <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
              <Route exact path="/about" element={<About showAlert={showAlert}/>}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
      </Routes>
      </div>
    </BrowserRouter>
 
    </NoteState>
    </React.Fragment>
  );
}
export default  App;

//NoteState ke andar hamne sabkuch wrap kar diya pure application ko ...isNotes variable ke andar jitne bhi
//states hoge as a prop wovirtual  pure dom tree me traverse ho jayeyge