
import React, { useContext, useEffect, useRef, useState } from "react";
import AddNote from "./AddNote";
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  const navigate=useNavigate()
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => {

    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate("/login"); 
    }
   
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const updateNote = (currentNote) => {
    // ye update note pura note le lega
    // console.log("kyu ji pareshan mat karo");
    ref.current.click();

    setNote({
      id: currentNote._id,
      etitle: currentNote.title || "",
      edescription: currentNote.description || "",
      etag: currentNote.tag || "",
    });

  };

  const handleClick = (e) => {
    console.log("Updating the Note......");
    editNote(note.id, note.etitle, note.edescription, note.etag);
    // taki page reload na ho
    refClose.current.click();
    props.showAlert("updated successfully","success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo Modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={refClose}
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
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
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;


//_id naam se filed aate hai mongodb se

      /* ADDING EDIT FUNCTIONALITY WHEN CLICKING ON PEN JAISE ITEM PAR ,,,ham ek MODAL BANA rahe hai jo BOOTSTRAP ka feature hai..on CLicking that modal it will open a windoew just like alert and here you wiLL edit the things very easily,just like a pop_up window it will occur ====>>>BUT THE twist is ham modal ko launch ya call kaise kare ..to koi ek button ko modaal se link kare ,jaise edit wale fxnaliy ko reference ke tarah use karke ,,,ham yaha USEREF hook ka use karege isse ham kisi bhi ek element ko refernce de sakte hai,ham ref.current.click ,,use ref ko use karne ke loiye hamye .current karna padt ahia..read the documentatioon */
      /* <!-- Button trigger modal --> */

