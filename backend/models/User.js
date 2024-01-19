const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
   date:{
      type:Date,
      default:Date.now
   },
});
const User=mongoose.model('user',UserSchema);
module.exports=User;







// Let's break down the components of this statement:

// mongoose.model('user', UserSchema):
// mongoose.model is a method provided by Mongoose to create or retrieve a model. It is used to define a Mongoose model for a MongoDB collection.
// The first argument ('user') is the name of the collection in the MongoDB database.
// The second argument (UserSchema) is the Mongoose schema that defines the structure of documents in the 'user' collection.
// module.exports = ...;

// module.exports is a special object in Node.js that is used to expose functionality or data from a module. Whatever you assign to module.exports becomes the exported content of that module.
// In this case, the Mongoose model created using mongoose.model('user', UserSchema) is assigned to module.exports.