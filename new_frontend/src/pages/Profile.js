import { React, useEffect, useState } from "react";
import { Paper, Grid, styled } from "@mui/material";
import playBtn from "../asset/images/home/playBtn.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const axios = require("axios");
toast.configure();
function Profile() {

  // MenuBar 

  const [CloseMenu, SetCloseMenu] = useState(false); 
  const closeMenu = () => {
    SetCloseMenu(true);
  }
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
  }
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    if(CloseMenu == true){
      document.getElementsByClassName("dropDown")[0].classList.add('hidden');
     }
    document.getElementsByClassName("header")[0].style.display = "flex";
    document.getElementsByClassName("footer")[0].style.display = "block";
    document.getElementsByClassName(
      "css-1g7fu7m-MuiContainer-root"
    )[0].style.maxWidth = "1200px";
    document.body.style.height = "auto";
    document.getElementsByClassName("main-container")[0].style.height = "100%";
    SetCloseMenu(false);
  });
  const [userPlaylist, setUserPlaylist] = useState([]);
  const [userImage, setUserImage] = useState(null);
  const [userBio, setUserBio] = useState(null);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/playlist/getPlayListData")
      .then((res) => {
        var userPlaylist = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].users[0] != undefined) {
            if (
              res.data[i].users[0]._id ==
              JSON.parse(sessionStorage.getItem("userDetails")).user_id
            ) {
              if (userBio == null) setUserBio(res.data[i].users[0].userbio);
              if (userImage == null) setUserImage(res.data[i].users[0].profile);
              userPlaylist.push(res.data[i]);
            }
          }
        }
        setUserPlaylist(userPlaylist);
      });
  }, []);

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
          if(response.data.length >= 0){

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
  

  const updateBio = (event) => {
    setUserBio(event.target.value);
    // console.log(event.target.value);
    axios
      .post(
        process.env.REACT_APP_API_URL +
          "/user/bioupdate?" +
          JSON.parse(sessionStorage.getItem("userDetails")).user_id,
        {
          user: JSON.parse(sessionStorage.getItem("userDetails")).user_id,
          data: event.target.value,
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

 

  return (
    <>
      <Grid onClick={closeMenu} container className="mt-3">
        <Grid item xs={12} className="transparent">
          <Grid className="transparent" container justifyContent="center">
            <Grid className="profileBox" item xs={12} md={5}>
              <h3 className="profileHeadeing">User Profile</h3>
              <Grid
                className="transparent"
                container
                style={{ position: "reletive" }}
              >
                <Grid
                  className="transparent UserImgBox"
                  item
                  xs={12}
                  md={4}
                  style={{ position: "relative" }}
                >
                  <form
                    action=""
                    method="post"
                    enctype="multipart/form-data"
                    style={{ opacity: "0" }}
                  >
                    <input
                      onChange={(e) => uploadFile(e)}
                      style={{ position: "absolute", top: "0", height: "100%" }}
                      type="file"
                      name=""
                      id="input_file"
                      accept=".jpg,.jpeg,.png"
                      class="form-control"
                      value=""
                    />
                  </form>
                  {uploadProfileLoader ? (
                    <div class="main_loader_box">
                      <div class="loader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  ) : (
                    <div className="UserImg">
                      {userImage ? (
                        <img
                          id="proFileImage"
                          src={require("../asset/profile/" + userImage)}
                          className="img-fluid"
                          alt=""
                        />
                      ) : (
                        <img
                          id="proFileImage"
                          src={require("../asset/images/DefaultProfilePic.jpg")}
                          className="img-fluid"
                          alt=""
                        />
                      )}

                      {uploadProfileLoader ? (
                        <div className="main_loader_box">
                          <h5
                            style={{
                              lineHeight: "11px",
                              margin: "20px",
                              color: "#fff",
                            }}
                          >
                            Uploading
                          </h5>
                          <div className="loader">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} md={8}>
                  <div className="bioTextBox">
                    <textarea
                      value={userBio}
                      id="bioText"
                      onChange={(e) => updateBio(e)}
                      placeholder="Bio Text"
                      className="w-100 textArea"
                      style={{ height: "120px" }}
                    ></textarea>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid className="reSpaceBox" item xs={12} md={2}>
              <Item className="reSpace">
              {allData ? 
              (<img
                id="proFileImage"
                src={"http://190.92.153.226:5000/assets/images/reserved/"+allData[7].resimage}
                className="img-fluid"
                alt=""
                
              />) 
              : 
              (<img
                id="proFileImage"
                src={require("../asset/reserved/default.jpg")}
                className="img-fluid"
                alt=""
                
              />)
              }
              </Item>
            </Grid>
          </Grid>
          <Grid className="mt-4 mb-4" container justifyContent="center">
            {userPlaylist.map((val, index) => (
              <>
                <Grid onClick={playlistWithId} style={{cursor:"pointer"}} container className="profileVideoes" xs={12} md={7.1}>
                  {val.videos.slice(0, 4).map((videos, VideoIndex) => (
                    <>
                      <Grid item xs={12} md={3} className="profileVideoesItems">
                        {VideoIndex == 0 ? (
                          <Item className="aboutVideo transparent">
                            <img  className="playBtn" src={playBtn} alt="" />
                            {val.title.substring(0, 8)}...
                          </Item>
                        ) : (
                          <Item className="aboutVideo transparent">
                            <img
                              className="playBtn"
                              style={{ visibility: "hidden" }}
                              src={playBtn}
                              alt=""
                            />
                          </Item>
                        )}
                        <Item className="videoImg transparent p-0">
                          <img  src={videos.thumbnail} alt="" />
                        </Item>
                      </Grid>
                    </>
                  ))}
                </Grid>
              </>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
export default Profile;
