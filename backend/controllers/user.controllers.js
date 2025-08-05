import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
;

export const register=async(req,res)=>{
    try{
      const {fullname,email,password}=req.body;
      if(!fullname || !email ||!password ){
        return res.status(400).json({
            message:"All fields are require vikas",
            success:false
        })
      }
      const user=await User.findOne({email});
      if(user){
        return res.status(400).json({
            message:"User already exit with this email",
            success:false
        })
      };
      const hasedPassword=await bcrypt.hash(password,10);
      await User.create({
        fullname,
        email,
        password:hasedPassword
      })
      return res.status(201).json({
        message:"Account Created successsfully",
        success:true
      })
    }
    catch(err){
        return res.status(500).json({
            message: "Something went wrong.",
            success: false
          });
    }
}

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({
          message: "All fields are required.",
          success: false
        });
      }
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Incorrect email or password.",
          success: false
        });
      }
  
      // Validate password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({
          message: "Incorrect email or password.",
          success: false
        });
      }
  
      // Prepare token payload
      const tokenData = { userId: user._id };
  
      // Generate token (consider moving the secret to an environment variable)
      const token = jwt.sign(tokenData, process.env.JWT_SECRET || 'cgdustbbxst', { expiresIn: '1d' });
  
      // Set token in cookie and respond with user data
      return res
        .status(200)
        .cookie('token', token, {
          maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
          httpOnly: true,                   // Prevent client-side JavaScript from accessing the cookie
          sameSite: 'None',          // Strict cookie policy
           secure: true  
          // secure: process.env.NODE_ENV === 'production' // Uncomment this in production if using HTTPS
        })
        .json({
          message: `Welcome back ${user.fullname}`,
          user: {
            _id: user._id,
            fullname: user.fullname,
            email: user.email
          },
          success: true
        });
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Something went wrong.",
        success: false
      });
    }
  };
  
export const logout=async(req,res)=>{
    try{
     return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"User logged out Successfully",
        success:true
     })
    }
    catch(err){
        console.log(err);
    }
}