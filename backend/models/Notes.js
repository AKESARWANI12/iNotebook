const mongoose = require('mongoose');

const { Schema } = mongoose;
const NotesSchema = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true  // required true matlab isse to true hona padega
  },
  tag:{
    type:String,
  
  },
   date:{
      type:Date,
      default:Date.now
   },
});
module.exports=mongoose.model('Notes',NotesSchema);


// Models define the structure of the data that your application works with. They encapsulate the properties and relationships of the data entities in your system.
// For example, if you have a blog application, you might have a Post model that includes properties such as title, content, author, and createdAt.


// user:{
//   type:mongoose.Schema.Types.ObjectId,=>kisi dusre model ke Id ham rakh rahe hai
//   ref:'user'  =>ye wahe user hai
// },  ye foreign key ke tarah behave kar raha hai ...ye har ek notes ko uske Id se link kar dega relationship bana dega