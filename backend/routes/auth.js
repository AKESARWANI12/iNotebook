const express=require('express');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const User=require('../models/User');
const bcrypt=require('bcryptjs')
var jwt = require('jsonwebtoken');
const fetchuser =require('../middleware/fetchuser');
const JWT_SECRET = process.env.JWT_SECRET || 'Gadha hai kya aishe sikhoge secret key generate karna';

//Route1: Create a user using:POST "/api/auth/createuser".No login required[[ham ek user bana sakte hai matlab registrationkar sakte hai]]
router.post('/createuser',[
    body('name','Enter a valid name atleast of length 3').isLength({min:3}),
    body('email','Enter a valid email use @ ').isEmail(),
    body('password','password must be atleast five characters').isLength({min:5}),
], async(req,res)=>{
  let success=false;
   // If there are errors,return Bad request and the errors
    const errors=validationResult(req);
    if(!errors.isEmpty()){       // errors upar se aaye wo false hai to ye use true kardega to return me badrequest print hoga           
        return res.status(400).json({errors:errors.array()});
    }
    
  // check whether the user with this  email already exists
  try{
    let user=await User.findOne({email: req.body.email});
    console.log(user,"kaala kutta kaat khayega,for checking ke data pahuch pa raha hai")
    if(user){ /// ye line ye kah rahe hai ke agar user ka email unique na hua to ye call ho jayege nhi to user=await wale me data jayega aur res.json se frontend par
      return res.status(400).json({success,error:"Sorry  a user with this email alreadyy exists"})
    }

const salt=await bcrypt.genSalt(10);
const secPass=await bcrypt.hash(req.body.password,salt)    // ye promise return ka raha hai
    // create a new user
    user= await  User.create({           /// ye ek promise banraha hai()
      name:req.body.name,
      password:secPass,
      email:req.body.email,
  });
  const data={               // ye object hai jissme ham id pass kar rahe hai for making a token
    user:{
        id:user.id
    }
  }
//
 const authtoken= jwt.sign(data,JWT_SECRET);
 success=true;
//  console.log(jwtData);
 res.json({success,authtoken})
//   res.json({user})
  // kuch error aaye hai isliye try catch use karu
  } catch(error){
    console.log(error.message);
    res.status(500).send("Some Error occured hua hai");
  }
});





/////////////////////////****************************************************************************////////////////////////////////////// */
  //Route 2:Authenticate a User using :POST "/api/auth/login". No login required
//   [[[ham login kar sakte hai us platform pe]]]
  //login ka end point ban raha hai (jab tum login karoge to password daloge aur initially createuser(registration) karte waqt tumne jo passsword dala hai jo ki ab bcrypt ho chuka hai dono me compare karke entry milege)
  router.post('/login',[
    body('email','Enter a valid email use @ ').isEmail(),
    body('password','Cannot be blank').exists(),      // .exist batata hai ke ye blank nhi hai
], async(req,res)=>{
  let success=false;
   // If there are errors,return Bad request and the errors
    const errors=validationResult(req);
    if(!errors.isEmpty()){       // errors upar se aaye wo false hai to ye use true kardega to return me badrequest print hoga           
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.body;    // ye destructure of req.body hua hai
    try{
        let user=await User.findOne({email});   //findone fxn already existing email in database me abhi enter ke hui email ko dhudega agar mhi mila to return the below message
        if(!user){
            return res.status(400).json({error:"Please try to login with correct credentials =>email not match"});
        }
// ab ham password compare karege =>just hover on compare fxn 
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
          success=false;
            return res.status(400).json({success,error:"Please try to login with correct credentials =>password not match"}); // ye password galat hone pe ye game hai
        }
// but hamne data to id ke form me dala hai jisse token bana hai
        const data={
        user:{
              id:user.id
        }
        }
        const authtoken= jwt.sign(data,JWT_SECRET);
        //  console.log(jwtData);
        success=true;
         res.json({success,authtoken});

    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal server Error occured hua hai");
    }
    

});


//////////////////////////////////////////************************************************************************///////////////////////////////////
   //Route 3:Get loggedin User details using :POST "/api/auth/getuser".login required
//    [[[ham ek user ka data fetch kar sakte hai agar hamare pass JWT token hai us user ka ]]]

// ham yaha par authtoken me se user id ko find karege except password,,,
///but kaise fetch kare...so we use middleware here jahaa jahhaa hame token se userid nikalna hoga to bich me middleware dalna hoga    
   //fetchuser ek middleware hai jo pahle execute hoga then req res se try or catch me jayega 
   router.post('/getuser', fetchuser, async (req, res) => {
    try {
        console.log("oh hasina jhlfo wale jane jaha")
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        console.log(user); // Log the user object
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error occured hua hai");
    }
});
module.exports=router;
























/*****this auth and notes are end points of a request ,ham isse postman pe bana kar collection me save kar rahe hai*/
 // console.log(req.body);
    // // Create a new User instance with the request body
    // const user=User(req.body);
    //   // Save the user to the database
    // user.save()
    // // Send a response with the saved user data


       // .then(user=>res.json(user))
    // .catch(err=>console.log(err));
    // res.send(req.body);  ye easy tarika hai basic wala response bhezne ka ,iske upar create wala jo hai ye express validator se aaya hai
    // res.json({"error":"please enter a unique value man for email"});     