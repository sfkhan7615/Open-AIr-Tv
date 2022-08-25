import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
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
const Login = () => {


  // Featch All Data
  const [allData, setallData] = useState([]);

  useEffect(() => {
    callData();
  }, []);

  function callData() {
    axios
      .get(process.env.REACT_APP_API_URL + "/user/getAlldata")
      .then((response) => {
        setallData(response.data);
        //  console.log(response.data);
      });
  }

  window.addEventListener("ready", (event) => {
    callData();
  });

  // End Fetching Data
  const navigate = useNavigate();
  const [button_hide, setNext] = useState({ display: "block" });
  const [button_show, setNextshow] = useState({ display: "none" });
  const {
    register,
    handleSubmit,
    click,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email_or_mobile: "",
      password: "",
    },
  });



  // Submit Users Data
  const [opration, setOpration] = useState("");
  const [UserName, setUserName] = useState("");
  const [Old_Password, set_old_Password] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Role, setRole] = useState("");
  const [Email, setEmail] = useState("");
  // const [user, setuser] = useState("");
  const [updateUserId, setUpdateId] = useState("");
  // const onSubmit = data => console.log(data);

  const submitPasswordData = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "/user/update_password", {
        old_password:Old_Password,
        password: Password,
        confirmPassword: ConfirmPassword,
        opration: "changePassword",
        id: updateUserId,
      })
      .then((res) => {
        callData();
        if (opration !== "changePassword")
          toast.success("Added Successfully", {});
        else toast.success("Update Successfully", {});
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          toast.error(err.response.data.errorMessage, {});
        }
      });
  };
  return (
    <>
      <div className="login card_box">
        <h3>Change Password</h3>
        <form >
          <div className="form-Group">
            <input
              type="text"
              onChange={(e) => set_old_Password(e.target.value)}
              placeholder="Enter Old Password"
              style={button_hide}
              id="next_username_class"
            />
            <p className="inputError">{errors.email_or_mobile?.message}</p>
          </div>
          <br />

          <div className="form-Group">
            <input
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter New Password"
              style={button_hide}
              id="next_username_class"
            />
            <p className="inputError">{errors.email_or_mobile?.message}</p>
          </div>
          <br />
          <div className="form-Group">
            <input
              type="text"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              style={button_hide}
              id="next_username_class"
            />
            <p className="inputError">{errors.email_or_mobile?.message}</p>
          </div>

          <Button
          onClick={() => {
            submitPasswordData();
            
          }}
            type="button"
            className="form-signup hide_on_click"
            style={button_hide}
            id="next_button_class"
          >
            Change Password
          </Button>
          <Button
            
            className="form-signup"
            style={button_show}
          >
            Submit
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

export default Login;
