// BASIC
// Frontend pe kya dij=khega kya nhi dikhega ye handle kar raha hai nodestate.js =>ham data ke baat kar rahe hai...
// const NotesInitial=[]
// const [notes,setNotes]=useState(NotesInitial);
// jab user login signup kiya 

// Initially notes empty tha 
// setNotes update karega jo ki ui render hoga aur hame screen par alag alag chize dikhege......to setnotes me jo bhi final notes aayege wo hamne dikhna start ho jayega us particular user ka


//STEP1:GET USER ALL NOTES
// jaise he user login hoga sara uska purana data fetch hokar UI pe dikhne lagega ...setNotes(json) se update hokar..dubara render bhi ho jayega
// =>ye call hoga Notes.js page ke useeffect hook ke ndar rakhhe getnotes fxn  se 
// const response = await fetch(`${host}/api/notes/fetchallnotes`, {
//     method: "GET", 
//     headers: {
//       "Content-Type": "application/json",
//       "auth-token":"yaha har bande ke individual token hoga"
//     },
//   });
//   const json= await response.json();
//   setNotes(json);  // login hote he ye dikhna start as update hogaya notes





//delete Note movement
// Certainly, let's break down the sequence of events when the delete icon is clicked in NoteItem.js:

//[[[[[ Delete Icon Click (NoteItem.js):]]]]]]
// When the delete icon is clicked, it triggers the onClick event, which calls an arrow function.

// onClick={() => {deleteNote(note._id); props.showAlert("Deleted Successfully", "success")}}
// The deleteNote function is called with the _id of the current note.

////[[[[ deleteNote Function (NoteState.js):]]]]
// The deleteNote function in NoteState.js is responsible for handling the deletion of a note. It makes an asynchronous API call to the server to delete the note.
// 
// Hame noteItem se id mil jayege ..now qs is ham is page par kaise aaye ..due to context api
// const deleteNote = async (id) => {
//   // API Call
//   const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       "auth-token": localStorage.getItem('token'),
//     },
//   });

//   const json = await response.json();
//   console.log(json);

//   // Filter out the deleted note from the existing notes and update the state
//   const newNotes = notes.filter((note) => note._id !== id);
//   setNotes(newNotes);
// };

// The function first makes an API call to the server to delete the note with the specified id. The server responds with information about the deletion, and the JSON response is logged to the console. The local state (notes) is then updated by filtering out the deleted note from the existing notes, and the state is set using setNotes.


// return (
//   <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
//     {props.children}
//   </NoteContext.Provider>
// );
// Any component consuming the NoteContext will receive the updated state, and their UI will reflect the changes.

// Alert Display (NoteItem.js):
// The props.showAlert("Deleted Successfully", "success") function is called, showing an alert indicating that the note has been deleted successfully.
// In summary, when the delete icon is clicked in NoteItem.js, it triggers a series of actions: an API call to delete the note, updating the local state in NoteState.js, and subsequently updating the context to propagate the changes throughout the application. The alert is then displayed to provide feedback to the user.
// It's important to note that the alert is shown after the deletion has been confirmed on the backend, and the local state has been updated. The fast execution you observe is due to the asynchronous nature of the API call, which allows the frontend to continue with the subsequent steps while waiting for the server's response






// Movement of Control in Edit update fxnality from frontend to backend
// Certainly, let's break down the flow in a simpler way:

// Noteitem.js:

// This component is responsible for displaying a single note.
// When the update icon (fa-pen-to-square) is clicked, the updateNote function is triggered.
// The updateNote function is a prop passed to Noteitem from its parent component (probably Notes.js).
// jsx
// Copy code
// const Noteitem = (props) => {
//   const { updateNote, note } = props;

//   // When the update icon is clicked, updateNote function is called
//   // This function is actually defined in the parent component (Notes.js)
//   // and is passed down to Noteitem as a prop.
//   // It receives the note object as an argument.
// };
// Notes.js:

// This component is responsible for displaying the list of notes and handling the modal for editing notes.
// It receives the updateNote function as a prop from its parent component (possibly a component higher up in the hierarchy).
// When a note needs to be updated, the updateNote function is triggered. It sets the note state with the values of the selected note and opens the modal.
// jsx
// Copy code
// const Notes = () => {
//   const { updateNote, notes, editNote } = useContext(NoteContext);

//   const updateNote = (currentNote) => {
//     // Open the modal and set the note state with the current values
//     setNote({
//       id: currentNote._id,
//       etitle: currentNote.title,
//       edescription: currentNote.description,
//       etag: currentNote.tag,
//     });
//   };

//   // ... (other code for modal and rendering notes)
// };
// NoteState.js:

// This component is a context provider that manages the state and functions related to notes.
// The editNote function is defined here and is responsible for making the actual API call to update a note.
// After updating the note on the server, it also updates the local state (notes) to reflect the changes.
// jsx
// Copy code
// const NoteState = (props) => {
//   const editNote = async (id, title, description, tag) => {
//     // API CALL to update the note on the server
//     const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token": "yourAuthTokenHere",
//       },
//       body: JSON.stringify({ title, description, tag }),
//     });
//     const json = await response.json();

//     // Update local state to reflect the changes
//     let newNotes = JSON.parse(JSON.stringify(notes));
//     for (let index = 0; index < newNotes.length; index++) {
//       const element = notes[index];
//       if (element._id === id) {
//         newNotes[index].title = title;
//         newNotes[index].description = description;
//         newNotes[index].tag = tag;
//         break;
//       }
//     }
//     setNotes(newNotes);
//   };

//   // ... (other code for managing notes state and other functions)
// };
// In summary, when the update icon is clicked in Noteitem.js, it triggers the updateNote function that is defined in Notes.js. The updateNote function in Notes.js then sets the note state and opens a modal. When the "UpdateNote" button is clicked in the modal, it triggers the editNote function in NoteState.js, which makes the API call to update the note on the server and updates the local state.









 