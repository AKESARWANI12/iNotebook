import React,{useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';
const Noteitem = (props) => {
  const context= useContext(NoteContext)
  const  {deleteNote}=context;
 const  {note,updateNote}=props;
  return (
<div className="col-md-3">
    <div className="card my-3" >
        <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="card-title">{note.title}</h5>
              <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully", "success")}}></i>
{/* jaise he koi is delete symbol par clickkare ye notes delete ho jaye */}
              <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note); }}></i>
            </div>
            <p className="card-text">{note.description}</p>
 
        </div>
    </div>
</div>

  )
}

export default Noteitem


/*****************deletenote kaise control move karega */
// In this snippet, you are using the useContext hook to get the NoteContext and then destructuring the context object to extract the deleteNote function. This is a way to access the deleteNote function from the context.

// The reason you didn't do const { updateNote } = context is that updateNote is being passed as a prop to the Noteitem component. It's not directly available in the context, but rather it's provided as a prop from the parent component. Therefore, you need to destructure it from props rather than context.

// In summary, the choice of whether to destructure from props or from context depends on where the data or function is coming from. If it's a prop, you destructure it from props; if it's from context, you destructure it from the context.





