// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Logo from "./shared/Logo";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
//import { baseUrl } from "@/Urls";
//import { baseUrl } from "@/Urls";

const Login = () => {
  const[input,setInput]=useState({
   email:"",
   password:"",

  })
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const changeHandler=(e)=>{
    setInput({...input,[e.target.name]:e.target.value})
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      console.log(res);
  
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user))
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };
  
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <form onSubmit={submitHandler} className='w-96 p-8 shadow-lg'>

      <div className="w-full flex justify-center mb-5"

>
  <Logo />
</div>

        <div>
          <Label>Email</Label>
          <Input type="email" name="email" value={input.email} onChange={changeHandler}/>
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" name="password" value={input.password} onChange={changeHandler} />
        </div>
        <Button className="w-full my-5">Login</Button>
        <p className='text-sm text-center'>Don&rsquo;t have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></p>
      </form>
    </div>
  );
};

export default Login;
