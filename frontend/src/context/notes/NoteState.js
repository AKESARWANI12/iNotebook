// import { useState } from "react";
// import {noteContext} from "./notecontext";
import { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState=(props)=>{
  const host=`${process.env.REACT_APP_BACKEND_URL}`
    const NotesInitial=[]
  const [notes,setNotes]=useState(NotesInitial);

  // Get all Notes
const getNotes=async()=>{
  // TODO:API CALL
    //API caLL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "authtoken":localStorage.getItem('token')
        
      },
    });
    const json= await response.json();
    console.log(json);
    setNotes(json);
  }

//Add a Note
const addNote=async(title,description,tag)=>{
  // TODO:API CALL
    //API caLL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "authtoken":localStorage.getItem('token')
        
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json=await response.json(); // parses JSON response into native JavaScript objects
  console.log("Adding a new note1111")
const note=json;
console.log("oh hasina julfo wale",note)
setNotes(notes.concat(note))//concat returns an array-
}

//Delete a Note
const deleteNote=async (id)=>{
   // TODO:API CALL=>backend me bhi note delete karo
   const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE", 
    headers: {
      "Content-Type": "application/json",
      "authtoken":localStorage.getItem('token')
      
    },
   
  });
  const json= await response.json(); // parses JSON response into native JavaScript objects
console.log("Deleting the node with id"+id);
const newNotes=notes.filter((note)=>{return note._id!==id})
setNotes(newNotes);
}


//Edit a Note
const editNote=async (id,title,description,tag)=>{
  //API caLL
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
      "authtoken":localStorage.getItem('token')
      
    },
    body: JSON.stringify({title,description,tag}),
  });
  const json= await response.json(); // parses JSON response into native JavaScript objects
  console.log(json);

  let newNotes=JSON.parse(JSON.stringify(notes))
  // Logic to edit in client
 for(let index=0;index<newNotes.length;index++){
  const element=newNotes[index];
  if(element._id===id){
    newNotes[index].title=title;
    newNotes[index].description=description;
    newNotes[index].tag=tag;
    break;
  }
 }
 setNotes(newNotes);
}



return (
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
      {props.children}
    </NoteContext.Provider> 
  )
}
export default NoteState;

// state me wah chize dalo jo tumhe child components me bhezna hai  ,,aur jis naam se react devta se tumne context banaya use naam.provider me daal do aur uske andar props.children likh do
//jab bhi is context ke andarkisi chiz ko wrap karoge ,to uske bich me automatically sare ke sare chuldren aa jayege

//context api me ham fxn bhi bhez sakte hai,state bhi bhez sakkte hai update karne ke liye as a props
// props are arguments and wo arguments  state ho skate hai,object ho sakte hai