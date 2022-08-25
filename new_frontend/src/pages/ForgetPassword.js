import Button from "@mui/material/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import "react-toastify/dist/ReactToastify.css";
const axios = require("axios");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

toast.configure();
const ForgetPassword = () => 
{
  const navigate = useNavigate();
  const [button_hide, setNext] = useState({ display: "block" });
  const [button_show, setNextshow] = useState({ display: "none" });
  const { register, handleSubmit, click, formState: { errors }} = useForm();

  // const onSubmit = data => console.log(data);
  const onSubmit = (data) => 
  {
    axios.post(process.env.REACT_APP_API_URL + "/user/forget_password", 
      {
        email: data["email"],
      })
      .then((res) => 
      {
        if(res.data.type=="email")
        {
          toast.success("Send Reset Password link on Email", {});
        }
        else
        {
          toast.success("Send Reset Password link on SMS", {});
        }
        navigate("/login");
      })
      .catch((err) => 
      {
          toast.error("Account Not Found !", {});
      });
  };
  return (
    <>
      <div className="login card_box">
        <h3>Forget Password !</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-Group">
            <input
              type="text"
              {...register("email", { required: "This is Requird" })}
              placeholder="Email or mobile number"
              style={button_hide}
              id="next_username_class"
            />
            <p className="inputError">{errors.email_or_mobile?.message}</p>
          </div>
          <Button
            type="button"
            className="form-signup hide_on_click"
            style={button_hide}
            onClick={handleSubmit(onSubmit)}
          >
            SUBMIT
          </Button>
          <div className="divider-or">OR</div>
          <Link to={"/login"} className="link">
            <Button className="form-signup">Sign in</Button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default ForgetPassword;
