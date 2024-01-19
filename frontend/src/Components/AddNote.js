import React,{useContext,useState} from "react";
import NoteContext from "../context/notes/NoteContext";
const AddNote = (props) => {
const context=useContext(NoteContext);
const {addNote}=context;

const [note,setNote]=useState({title:"",description:"",tag:""})         //initially note aapka empty hai""
const onChange=(e)=>{
    // jo bhi change ho rha hai uska name uske setname ke barabar ho jaye
    setNote({...note,[e.target.name] : e.target.value})
}

// Define event handlers (onChange and handleClick).
// onChange is used to handle changes in the form inputs and update the state accordingly.
// handleClick is used to handle the form submission, preventing the default behavior and calling the addNote function with the current note state.

const handleClick=(e)=>{
 e.preventDefault(); // taki page reload na ho
 addNote(note.title,note.description,note.tag); 
 setNote({title:"",description:"",tag:""});
 props.showAlert("Added Successfully", "success")
}
// e.preventDefault() prevents the default form submission behavior, which would cause a page reload.
// addNote(note) is called, passing the current note state to the addNote function


  return (
    <div className="container my-3">
      <h2>Add a Note</h2>

      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={5}
                    required
            />
            
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
           Description
          </label>
          <input
            type="text   "
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
           Tag
          </label>
          <input
            type="text   "
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            minLength={5}
                    required
          />
        </div>
      
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          AddNote
        </button>
      </form>
    </div>
  );
};

export default AddNote;
