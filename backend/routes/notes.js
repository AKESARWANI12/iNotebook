const express=require('express');
const router=express.Router();
const fetchuser=require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');  
const Note=require('../models/Notes');
//(jo login hoga uska notes usse mil jayega)


//Route1: Get All the Notes from loggedin user   using :GET "/api/notes/getuser". Login required
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    const notes=await Note.find({user:req.user.id});
    console.log("chal chaiyya chaiyya");
    res.json(notes);
})


//Route2: Add a new notes using  POST: "/api/notes/addnote". Login required
router.post('/addnote',fetchuser,[
    body('title','Enter a valid title atleast of length 3').isLength({min:3}),
    body('description','Description must be atleast 5 characters').isLength({min:5})], async (req,res)=>
    {
        
        try{
            const {title,description,tag}=req.body;     // ham array destrucutring karke data nikal liye model schema se

            // If there are errors,return Bad request and the errors
           const errors=validationResult(req);
           if(!errors.isEmpty()){ // errors upar se aaye wo false hai to ye use true kardega to return me badrequest print hoga           
               return res.status(400).json({errors:errors.array()});
           }
    
           const note=new Note({title,description,tag,user:req.user.id })      // ye ek promise bana rahe hai save karne ke liye(Notes model schema se a arah ahai)
           const savedNote=await note.save();
           res.json(savedNote);
        }catch(error){
        console.log(error.message);
        res.status(500).send("Internal server Error occured hua hai");
        }
})
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Route 3:Update an Existing Note(which is already saved) using  PUT: "/api/note/updatenote".Login required
//  isme ye bhi check karo ki kya ye wahe insaan/user hai jiski ye request hai ,, jiski notes me hame update karna hai
// kahe aisha to nhi ki kisi aur ke notes koi aur edit kar raha hai 
router.put('/updatenote/:id',fetchuser, async (req,res)=>{
     const {title,description,tag}=req.body;
     // Create a newNote object to store updated information
     try{
     const newNote = {};
     if (title) {
         newNote.title = title;
     }
     if (description) {
         newNote.description = description;
     }
     if (tag) {
         newNote.tag = tag;
     }
  


    // Find the note to be updated and update it
    let note=await Note.findById(req.params.id);
    
 // req.params.id =>is used to extract the id parameter from the URL. This parameter typically represents the unique identifier of the note that needs to be updated.

     // Check if the note exists
     if (!note) {
        return res.status(404).send("Not found");
    }

    // Check if the user making the request is the owner of the note
    //The toString function is a method that comes from the JavaScript language. It is used to convert an object to its string representation.note.user se jo id milege wo object ke form me the 
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }
  
    // Update the note and get the updated document
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
// Notes likely represents a Mongoose model for a MongoDB collection. The findByIdAndUpdate method is a Mongoose function that finds a document by its _id (provided as req.params.id) and updates it.
// req.params.id extracts the value of the id parameter from the URL. This parameter typically represents the unique identifier of the note to be updated.
// { $set: newNote }:
// The second argument of findByIdAndUpdate is an update object. Here, { $set: newNote } is used to update the fields of the found document with the values from the newNote object.

    // Send the updated note as a JSON response
    res.json({ updatedNote });

   }catch(error){
    console.error(error);
    res.status(500).send("Internal Server Error");
   }
     
})

module.exports=router;






// Route 4:delete an Existing Note(which is already saved) using  DELETE: "/api/note/updatenote".Login required

//hame yaha ye verify karna hai ki jo insaan isse delete kar raha hai kya ye note usse ka hai
router.delete('/deletenote/:id',fetchuser, async (req,res)=>{
 
    
 try{
   // Find the note you have to  delete

   let note=await Note.findById(req.params.id);
// req.params.id =>is used to extract the id parameter from the URL. This parameter typically represents the unique identifier of the note that needs to be updated.

    // Check if the note exists
    if (!note) {
       return res.status(404).send("Not found");
   }
  
   // Allow deletion only if user owns this Note
   if (note.user.toString() !== req.user.id) {
       return res.status(401).send("Not Allowed");
   }

note = await Note.findByIdAndDelete(req.params.id);
   // Send the updated note as a JSON response
   res.json({ "Success":"Note has been deleted",note:note});

  }catch(error){
   console.error(error);
   res.status(500).send("Internal Server Error hai ");
  }
    
})




//// In this React context,useParams allows you to extract parameters from the current route. So, if you have a route like /users/:id, you can use useParams to access the value of id in your component.

/////const note = await Notes.findById(req.params.id);
// Explanation:

// Notes=> likely refers to a MongoDB model for a collection named Notes.
// findById =>is a method provided by MongoDB or a library like Mongoose to find a document in a collection by its unique identifier (_id).
// req.params.id =>is used to extract the id parameter from the URL. This parameter typically represents the unique identifier of the note that needs to be updated.


















//ham chahte hai ki jo hamara user hai ,agar usne koi notes dala to koi dusra user us notes ko na dekh paye
//to mujhe kuch na kuch tarike se notes ko user se associate karna padega
