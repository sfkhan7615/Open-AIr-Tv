import React, { useState, useEffect } from "react";
import "../../css/style.css";
import { toast } from "react-toastify";

import swal from "sweetalert";

const axios = require("axios");
toast.configure();

function SpaceResImages() {
  const token = localStorage.getItem("token");
  // console.log(token);
  // Featch All Data

  const [uploadProfileLoader, setUploadProfileLoader] = useState(false);
  const uploadFile = (event) => {
    setUploadProfileLoader(true);

    const formdata = new FormData();
    formdata.append("avtar", event.target.files[0]);
    formdata.append("pagename", event.target.value);
    axios.post(process.env.REACT_APP_API_URL + "/user/updateResImage",formdata,
        { user: JSON.parse(sessionStorage.getItem("userDetails")).user_id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        if (res.data.length != 0) setUploadProfileLoader(false);
        toast.success("Added Successfully", {});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  

  return (
    <>
      <div className="row">
        <div className="col-3">
          <label className="form-label text-white">Role</label>
          <div className="input-group" id="show_hide_password">
            <select
              className="form-control"
              // onChange={(e) => setRole(e.target.value)}
              required
            >
              <option selected disabled>
                -----Select Page----
              </option>
              <option value={1}>All</option>
              <option value={2}>Home</option>
              <option value={2}>Playlist</option>
              <option value={2}>Profile</option>
            </select>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="row">
        <div
          className="col-3 transparent UserImgBox"
          item
          xs={12}
          md={4}
          style={{ position: "relative" }}
        >
          <form
            action=""
            method="post"
            enctype="multipart/form-data"
            style={{ opacity: "1" }}
          >
          
            <input
              onChange={(e) => uploadFile(e)}
              style={{ position: "absolute", top: "0", opacity: "0" , height:'100%' }}
              type="file"
              name=""
              id="input_file"
              accept=".jpg,.jpeg,.png"
              class="form-control"
              value=""
            />
          </form>
          <div className="UserImg">
            <img
              id="proFileImage"
              src={require("../../images/default.jpg")}
              className="img-fluid"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SpaceResImages;
