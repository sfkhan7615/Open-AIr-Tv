import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
const axios = require("axios");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
toast.configure();
const Login = () => {

  const [ResToken, setResToken] = useState("");


// if login Redirect to home 
  const navigate = useNavigate();
    useEffect(()=>
	{
    const user_id = sessionStorage.getItem('userDetails');
		  if(user_id)
			navigate('/home');
	},[]);

//************** */

  const something=(event)=> {
    if (event.keyCode === 13) 
    {
        let inputtx = document.getElementById("next_username_class");
        if (inputtx.value.length == 0){toast.error("Please enter email or mobile number!", {}); return false;}
          setNext({ display: "none" });
          setNextshow({ display: "block" });
    }
  }

  // Style Sheet
  useEffect(() => {
    document.body.style.height = "auto";
    document.getElementsByClassName("css-1g7fu7m-MuiContainer-root")[0].style.paddingTop = "50px";
    document.getElementsByClassName('main-container')[0].style.height = "100vh";
  },[]);
  const [button_hide, setNext] = useState({ display: "block" });
  const [button_show, setNextshow] = useState({ display: "none" });
  const {register,handleSubmit,click,formState: { errors },} = useForm({defaultValues: {email_or_mobile: "",password: ""}});
  // const onSubmit = data => console.log(data);
  const hide_button = (obj) => 
  {
    let inputtx = document.getElementById("next_username_class");
    if (inputtx.value.length == 0)
    {
        toast.error("Please enter email or mobile number!", {});
        return false;
    }
    if(!inputtx.value.match(/^[A-Za-z0-9.@]+$/))
    {
      toast.error("Space and Spical Charcter Not Allowed !", {});
      return false;
    }
        setNext({ display: "none" });
       setNextshow({ display: "block" });
  };
  const onSubmit = (data) => {
    axios.post(process.env.REACT_APP_API_URL + "/user/login", {email: data["email"],password: data["password"],role: "2"})
    .then((res) => {
          if (res) 
          {
              localStorage.setItem("token", res.data.token);
              const responseData = JSON.stringify(res.data);
              setResToken(res.data.token);
              sessionStorage.setItem("userDetails", responseData);
              if (window.location.href.split("from=")[1])
              {
                if(window.location.href.split("from=")[1]==="dfbchebf5254652dnsfydf")
                  navigate("/playlist");
                else if(window.location.href.split("from=")[1]==="p1&r%odfbchebf5254652dnsfydf")
                  navigate("/profile");
                else if(window.location.href.split("from=")[1]==="creatorbf5254652dnsfydf")
                navigate("/creator");
                else
                  navigate("/creator");
              }
              else
                navigate("/home");
          }
      }).catch((err) => {
        if ( err.response && err.response.data && err.response.data.errorMessage)
        {
          setNext({ display: "block" });
          setNextshow({ display: "none" });
          toast.error(err.response.data.errorMessage, {});
        }
      });
  };
  return (
    <>
      <div className="login card_box">
        <h3>User Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-Group">
            <input type="text" {...register("email", { required: "This is Requird" })} pattern="[^'=! #$%^&*()]+" placeholder="Email or mobile number" style={button_hide} id="next_username_class" onKeyDown={(e) => something(e) }/>
            <p className="inputError">{errors.email_or_mobile?.message}</p>
          </div>
          <div className="form-Group">
            <input type="Password" {...register("password", { required: "This is Requird" })} style={button_show} placeholder="Password" id="next_password_class"/>
            <p className="inputError">{errors.email_or_mobile?.message}</p>
          </div>
          <Button type="button" className="form-signup hide_on_click" style={button_hide} onClick={() => hide_button(this)} id="next_button_class">NEXT</Button>
          <Button onClick={handleSubmit(onSubmit)} className="form-signup" style={button_show} type="submit">Submit</Button>
          <div className="divider-or">OR</div>
          <Link to={"/register"} className="link"><Button className="form-signup">Sign up</Button></Link>
          <Link to={"/forget"} className="link"><Button className="form-signup">Forget Password ?</Button></Link>
        </form>
      </div>
    </>
  );
};
export default Login;