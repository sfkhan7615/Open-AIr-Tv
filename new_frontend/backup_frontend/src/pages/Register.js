import { React, useEffect } from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import SmsIcon from '@mui/icons-material/Sms';
const axios = require("axios");
toast.configure();

function Register()
{
  useEffect(() => {
    document.body.style.height = "auto";
    document.getElementsByClassName('main-container')[0].style.height = "100vh";
  },[]);

  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: { email_or_number: "", username: "", password: "", confirm_password: "" } });
  const user_password = watch("password");
  const onSubmit = (data) => {
    axios.post(process.env.REACT_APP_API_URL + "/user/add", { email:data["email_or_number"].toLowerCase().replace(" ",''), username: data["username"].toLowerCase(), password: data["password"], role: "2", opration: "add" })
      .then((res) => {
        if (res.data.type == "email")
          toast(<div><MarkEmailUnreadIcon /> Check Your Email Address and Verfiy Your Account</div>, { autoClose: false });
        else
          toast(<div><SmsIcon />Send Verification link in Sms</div>, { autoClose: false });
        swal({ text: res.data.title, icon: 'success', type: "success" }).then(function () { navigate("/login"); });
      }).catch((err) => 
      {
         swal({ text: err.response.data.errorMessage, icon: "error", type: "error" }); 
         console.log(err)
       });
  };
  return (
    <>
      <div className="sign-up card_box">
        <h3>User Sign up</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-Group">
            <label>Email or mobile number</label>
            <input type="text" {...register("email_or_number", { required: "This is Required",pattern:{value:/^[A-Za-z0-9.@]+$/,message:"Space and Spical Charcter Not Allowed"}})} />
            <p className="inputError">{errors.email_or_number?.message}</p>
          </div>
          <div className="form-Group">
            <label>Username</label>
            <input type="text" {...register("username", { required: "This is Required",pattern:{value:/^[A-Za-z0-9._]+$/,message:"Space and Spical Charcter Not Allowed"} })} />
            <p className="inputError">{errors.username?.message}</p>
          </div>
          <div className="form-Group">
            <label>Password</label>
            <input type="password" {...register("password", { required: "This is Required", minLength: { value: 8, message: "minimum length 8 character" }, pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, message: "Must Be One Capital Letter , One Special Character" } })} />
            <p className="inputError">{errors.password?.message}</p>
          </div>
          <div className="form-Group">
            <label>Confirm Password</label>
            <input type="password" {...register("confirm_password", { validate: (value) => value === user_password || "The passwords do not match" })} />
            <p className="inputError">{errors.confirm_password?.message}</p>
          </div>
          <Button type="submit" className="form-signup">Sign Up</Button>
        </form>
      </div>
    </>
  );
}
export default Register;