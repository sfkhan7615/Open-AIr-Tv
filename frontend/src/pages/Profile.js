import { React, useEffect, useState } from "react";
import { Paper, Grid, styled } from "@mui/material";
import playBtn from "../asset/images/home/playBtn.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const axios = require("axios");
toast.configure();
function Profile() {
  const [TextArea, setTextArea] = useState(false);
  const setTextAreaChange = () => {
    if (TextArea) {
      setTextArea(false);
    } else {
      setTextArea(true);
    }
  };

  // MenuBar

  const [CloseMenu, SetCloseMenu] = useState(false);
  const closeMenu = () => {
    SetCloseMenu(true);
  };
  // auth
  const navigate = useNavigate();
  useEffect(() => {
    const user_id = sessionStorage.getItem("userDetails");
    if (!user_id) {
      navigate("/login?from=p1&r%odfbchebf5254652dnsfydf");
    }
  }, []);

  const playlistWithId = () => {
    navigate("/playlist");
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    if (CloseMenu == true) {
      document.getElementsByClassName("dropDown")[0].classList.add("hidden");
    }
    document.getElementsByClassName("header")[0].style.display = "flex";
    document.getElementsByClassName("footer")[0].style.display = "none";
    document.getElementsByClassName(
      "css-1g7fu7m-MuiContainer-root"
    )[0].style.maxWidth = "1200px";
    document.getElementsByClassName(
      "css-1g7fu7m-MuiContainer-root"
    )[0].style.paddingTop = "40px";
    document.body.style.height = "auto";
    document.getElementsByClassName("main-container")[0].style.height = "100%";
    SetCloseMenu(false);
  });
  const [userPlaylist, setUserPlaylist] = useState([]);
  const [userImage, setUserImage] = useState(null);
  const [userBio, setUserBio] = useState(null);
  const [Name, setName] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Phone, setPhone] = useState(null);
  const [Mobile, setMobile] = useState(null);
  const [Address, setAddress] = useState(null);
  const [userAbout, setUserAbout] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get(process.env.REACT_APP_API_URL + "/playlist/getPlayListData")
  //     .then((res) => {
  //       // console.log(res.data);
  //       var userPlaylist = [];
  //       for (let i = 0; i < res.data.length; i++) {
  //         if (res.data[i].users[0] != undefined) {
  //           if (
  //             res.data[i].users[0]._id ==
  //             JSON.parse(sessionStorage.getItem("userDetails")).user_id
  //           ) {
  //             console.log(res.data[i].users[i].email);
  //             if (userBio == null) setUserBio(res.data[i].users[0].userbio);
  //             setName(res.data[i].users[0].Name);
  //             if (Phone == null) setPhone(res.data[i].users[0].Phone);
  //             if (Email == null) setEmail(res.data[i].users[0].email);
  //             if (Mobile == null) setMobile(res.data[i].users[0].Mobile);
  //             if (Address == null) setAddress(res.data[i].users[0].Address);
  //             if (userImage == null) setUserImage(res.data[i].users[0].profile);
  //             if (userAbout == null)
  //               setUserAbout(res.data[i].users[0].userAbout);

  //             userPlaylist.push(res.data[i]);
  //           }
  //         }
  //       }
  //       setUserPlaylist(userPlaylist);
  //     });
  // }, []);

  //Get User Data
  const [allUserData, setallUserData] = useState([]);
  const [CurrentUserDetails, setCurrentUserDetails] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    // Featch All Data
    axios
      .get(process.env.REACT_APP_API_URL + "/user/getUserAlldata", {
        headers: { Token: token },
      })
      .then((response) => {
        setallUserData(response.data);
        response.data.forEach((element, index) => {
          if (
            element._id ==
            JSON.parse(sessionStorage.getItem("userDetails")).user_id
          ) {
            if (Name == null) setName(element.Name);
            if (userBio == null) setUserBio(element.userbio);
            if (Phone == null) setPhone(element.Phone);
            if (Mobile == null) setMobile(element.Mobile);
            if (Address == null) setAddress(element.Address);
            if (userAbout == null) setUserAbout(element.userAbout);
            setCurrentUserDetails(element);
            console.log(element);
          }
        });
      });
  }, []);
  // console.log(allUserData);
  // console.log(JSON.parse(sessionStorage.getItem("userDetails")).user_id);

  // Get Reserved Space
  const [allData, setallData] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/user/getResspaceData", {
        headers: { Token: token },
      })
      .then((response) => {
        for (let index = 0; index < response.data.length; index++) {
          if (response.data.length >= 0) {
            // if (userBio == null) setUserBio(res.data[i].users[0].userbio);
            setallData(response.data);
          }
        }
      });
  }, []);
  const [uploadProfileLoader, setUploadProfileLoader] = useState(false);
  const uploadFile = (event) => {
    setUploadProfileLoader(true);

    const formdata = new FormData();
    formdata.append("avtar", event.target.files[0]);
    axios
      .post(
        process.env.REACT_APP_API_URL +
          "/user/profileupload?" +
          JSON.parse(sessionStorage.getItem("userDetails")).user_id,
        formdata,
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

  const updateBio = (e) => {
    e.preventDefault();
    axios
      .post(
        process.env.REACT_APP_API_URL +
          "/user/bioupdate?" +
          JSON.parse(sessionStorage.getItem("userDetails")).user_id,
        {
          user: JSON.parse(sessionStorage.getItem("userDetails")).user_id,
          // data: event.target.value,
          data: userBio,
          Name: Name,
          Email: Email,
          Phone: Phone,
          Mobile: Mobile,
          Address: Address,
          userAbout: userAbout,
        }
      )
      .then((res) => {
        // console.log(res.data);
        toast.success("Data Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div onClick={closeMenu} className="container">
        <div className="main-body">
          <div className="row">
            <div className="col-lg-4 card h-100">
              <div className="">
                <div className="card-body">
                  <form
                    action=""
                    method="post"
                    enctype="multipart/form-data"
                    style={{ opacity: "0" }}
                  >
                    <input
                      onChange={(e) => uploadFile(e)}
                      style={{
                        position: "absolute",
                        top: "15px",
                        left: "135px",
                        height: "35%",
                        width: "30%",
                      }}
                      type="file"
                      name=""
                      id="input_file"
                      accept=".jpg,.jpeg,.png"
                      className="form-control"
                      value=""
                    />
                  </form>
                  <div className="d-flex flex-column align-items-center text-center">
                    {CurrentUserDetails.profile ? (
                      <img
                        style={{ height: "100px" }}
                        src={"/asset/profile/" + CurrentUserDetails.profile}
                        alt="Admin"
                        className="rounded-circle p-1 bg-primary"
                        width="110"
                      />
                    ) : (
                      <img
                        src={"/asset/images/default-profile.jpg"}
                        alt="Admin"
                        className="rounded-circle p-1 bg-primary"
                        width="110"
                      />
                    )}
                    <div className="mt-3 text-white">
                      <h4>{CurrentUserDetails.Name}</h4>
                      <p className="mb-1">{CurrentUserDetails.userbio}</p>
                      <p className="font-size-sm">
                        {CurrentUserDetails.Address}
                      </p>
                      <button className="btn btnLight">Follow</button> &nbsp;
                      <button className="btn btnLight">Message</button>
                    </div>
                  </div>
                  <hr className="my-4 " />
                  {/* <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="feather feather-globe me-2 icon-inline"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="2" y1="12" x2="22" y2="12"></line>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        Website
                      </h6>
                      <span className="">https://codervent.com</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="feather feather-github me-2 icon-inline"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        Github
                      </h6>
                      <span className="">codervent</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="feather feather-twitter me-2 icon-inline"
                        >
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                        Twitter
                      </h6>
                      <span className="">@codervent</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="feather feather-instagram me-2 icon-inline"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="20"
                            height="20"
                            rx="5"
                            ry="5"
                          ></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                        Instagram
                      </h6>
                      <span className="">codervent</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="feather feather-facebook me-2 icon-inline"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                        Facebook
                      </h6>
                      <span className="">codervent</span>
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card">
                <form>
                  <div className="card-body text-white">
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9">
                        <input
                          disabled
                          type="text"
                          className="form-control"
                          value={CurrentUserDetails.email}
                          // onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Full Name</h6>
                      </div>
                      <div className="col-sm-9">
                        <input
                          onChange={(e) => setName(e.target.value)}
                          value={Name}
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">User Bio</h6>
                      </div>
                      <div className="col-sm-9">
                        <input
                          onChange={(e) => setUserBio(e.target.value)}
                          value={userBio}
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Mobile</h6>
                      </div>
                      <div className="col-sm-9">
                        <input
                          type="number"
                          className="form-control"
                          onChange={(e) => setMobile(e.target.value)}
                          value={Mobile}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Address</h6>
                      </div>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setAddress(e.target.value)}
                          value={Address}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3"></div>
                      <div className="col-sm-9">
                        <button
                          type="submit"
                          onClick={(e) => {
                            updateBio(e);
                          }}
                          className="btn btnLight px-4"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="card">
                    <form>
                      <div className="card-body">
                        <h5 className="d-flex align-items-center mb-3 text-white">
                          About ME:
                        </h5>
                        {TextArea ? (
                          <button
                          type="button"
                            className="btn btn-primary float-end  mb-3"
                            // onClick={setTextAreaChange}
                            onClick={(e) => {
                              setTextAreaChange();
                              updateBio(e);
                            }}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-primary float-end  mb-3"
                            // onClick={setTextAreaChange}
                            onClick={() => {
                              setTextAreaChange();
                            }}
                          >
                            Edit
                          </button>
                        )}

                        {TextArea ? (
                          <textarea
                            value={userAbout}
                            id="Text"
                            // onChange={(e) => updateAbout(e)}
                            onChange={(e) => setUserAbout(e.target.value)}
                            className="form-control"
                            name=""
                            cols="30"
                            rows="10"
                          >
                            {userAbout}
                          </textarea>
                        ) : (
                          <textarea
                            value={userAbout}
                            className="form-control"
                            disabled
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                          >
                            {userAbout}
                          </textarea>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
