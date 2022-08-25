import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const axios = require("axios");
toast.configure();

function Verify() 
{

  const navigate = useNavigate();

  useEffect(()=>{
    var data = window.location.href.split("ids=")[1];
    console.log(data);
    axios.post(process.env.REACT_APP_API_URL + "/user/verify",
      {
        id: data
      })
      .then((res) => {
        toast.success("Email Account Verify Successfully");
        navigate("/login");
      })
      .catch((err) => {
        toast.error("Email Account Not verify");
      });
  },[])
  return (
    <div className="sign-up card_box p-5">
      <button  className='btn btn-primary'>
        Please Wait ...
      </button>
    </div>
  )
}

export default Verify