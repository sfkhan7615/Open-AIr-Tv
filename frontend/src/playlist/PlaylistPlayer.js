import { useState, useRef, useEffect } from "react";
import classnames from "classnames";
import ReactPlayer from "react-player";
import "bootstrap/dist/css/bootstrap.min.css";
import "./asset/css/index.css";
import { Tabs, Tab } from "react-bootstrap";
import { ShareSocial } from "react-share-social";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import user_menu_logo from "../asset/images/Button_goToUserPage2.png";
import $ from "jquery";
import { toast } from "react-toastify";
toast.configure();

const axios = require("axios");
const moment = require("moment");

export const PlaylistPlayer = ({ playlists }) => {
  const navigate = useNavigate();
  const setOpenSettingBarChange = () => {
    if (OpenSettingBar) setOpenSettingBar(false);
    else {
      if (socialMediaMenu) {
        setSocialMediaMenu(false);
        setOpenSettingBar(false);
      } else setOpenSettingBar(true);
    }
  };

  const alertDiv = () => {
    if (OpenMenuBar == true) {
      setOpenMenuBar(false);
    }
    if (OpenSettingBar == true) {
      setOpenSettingBar(false);
    }
  };

  const userDetails = sessionStorage.getItem("userDetails");

  // Menu Bar

  const [OpenMenuBar, setOpenMenuBar] = useState(false);

  const setOpenMenuBarChange = () => {
    if (OpenMenuBar) {
      setOpenMenuBar(false);
    } else {
      setOpenMenuBar(true);
    }
  };

  //  Set Runtime Of playlist
  for (let i = 0; i < playlists.length; i++) {
    var total = 0;
    for (let j = 0; j < playlists[i].videos.length; j++)
      total = total + parseInt(playlists[i].videos[j].duration);
    playlists[i].runtime = moment("2015-01-01")
      .startOf("day")
      .seconds(total)
      .format("H:mm:ss");
  }
  // select My Playlist
  const userPlaylist = [];
  if (window.location.href.split("id=")[1]) {
    var playlistId = window.location.href.split("id=")[1];
    playlists.forEach((element, index) => {
      if (element._id == playlistId) userPlaylist.push(playlists[index]);
    });
  } else {
    if (JSON.parse(sessionStorage.getItem("userDetails"))) {
      const user_id = JSON.parse(sessionStorage.getItem("userDetails")).user_id;
      for (let i = 0; i < playlists.length; i++) {
        for (let j = 0; j < playlists[i].users.length; j++) {
          if (playlists[i].users[j]._id == user_id)
            userPlaylist.push(playlists[i]);
        }
      }
    }
  }
  //  Top Playlist
  // for (let i = 0; i < playlists.length; i++) {
  //   if (playlists[i].videos != undefined) {
  //     var total = 0;
  //     for (let j = 0; j < playlists[i].videos.length; j++)
  //       total = total + parseInt(playlists[i].videos[j].likes);
  //   }
  //   playlists[i].likes = total;
  // }
  // var topPlayListData = playlists;
  // topPlayListData.sort(function (b, a) {
  //   var keyA = a.likes,
  //     keyB = b.likes;
  //   if (keyA < keyB) return -1;
  //   if (keyA > keyB) return 1;
  //   return 0;
  // });

  // console.log(topPlayListData);
  const [countUserPlaylist, setCountUserPlaylist] = useState(
    userPlaylist.length
  );
  const [videoIndex, setVideoIndex] = useState(0);
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [currentPlaylist, setCurrentPlaylist] = useState(
    userPlaylist[playlistIndex]
  );

  var currentVideo = null;
  if (currentPlaylist) {
    if (currentPlaylist.videos.length != 0)
      currentVideo = currentPlaylist.videos[videoIndex];
  }
  const onEnded = () => {
    if (currentPlaylist.videos[videoIndex + 1]) {
      setVideoIndex(videoIndex + 1);
    } else if (playlists[playlistIndex + 1]) {
      setPlaylistIndex(playlistIndex + 1);
      setVideoIndex(0);
    } else {
      setPlaylistIndex(0);
      setVideoIndex(0);
    }
  };

  const onBack = () => {
    if (currentPlaylist.videos[videoIndex - 1]) {
      setVideoIndex(videoIndex - 1);
    } else if (playlists[playlistIndex - 1]) {
      setPlaylistIndex(playlistIndex - 1);
      setVideoIndex(0);
    } else {
      setPlaylistIndex(0);
      setVideoIndex(0);
    }
  };
  useEffect(() => {
    document.body.style.height = "auto";
    document.getElementsByClassName("main-container")[0].style.height = "100%";
    document.getElementsByClassName("main-container")[0].style.width = "75%";
    document.getElementsByClassName("main-container")[0].style.paddingLeft =
      "0px";
    document.getElementsByClassName("main-container")[0].style.paddingRight =
      "0px";
    // document.getElementsByClassName("css-43wt9-MuiContainer-root")[0].style.marginTop = "-133px";

    // document.getElementsByClassName("PlaylistPlayer__player-wrapper-RemoveThis")[0].style.position = "relative";
    // document.getElementsByClassName("PlaylistPlayer__player-wrapper-RemoveThis")[0].style.paddingTop = "56.25%";
    // document.getElementsByTagName("video")[0].style.width = "unset";

    if (window.location.href.split("id=")[1] == undefined) {
      // document.getElementsByClassName("header")[0].style.display = "none";
      // document.getElementsByClassName("header")[0].style.height = "70px";
      document.getElementsByClassName("footer")[0].style.display = "none";
      document.getElementsByClassName(
        "css-1g7fu7m-MuiContainer-root"
      )[0].style.paddingTop = "10px";
      // document.getElementsByClassName("css-43wt9-MuiContainer-root")[0].style.marginTop = "-133px";
    }
    if (window.location.href.includes("?id=")) {
      document.getElementsByClassName(
        "css-43wt9-MuiContainer-root"
      )[0].style.marginTop = "-80px";
      document.getElementsByClassName("main-container")[0].style.width = "95%";
    }
  }, []);

  const [currentPlaylistFrom, setCurrentPlaylistFrom] = useState("user");
  const changePlaylist = (ind) => {
    setPlaylistIndex(ind);
    setVideoIndex(videoIndex);
    if (currentPlaylistFrom == "user") {
      setCurrentPlaylist(userPlaylist[playlistIndex]);
    } else {
      setCurrentPlaylist(playlists[playlistIndex]);
      console.log(playlists);
    }
  };

  useEffect(() => {
    changePlaylist(playlistIndex);
  });

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(3);
  const moreVideos = () => {
    let mixminimum = min + 4,
      mixmaximum = max + 4;
    if (mixmaximum < playlists.length) {
      setMin(min + 4);
      setMax(max + 4);
    }
    if (mixmaximum >= playlists.length) {
      setMin(0);
      setMax(3);
    }
  };
  const style = {
    background: "transparent",
    borderRadius: 3,
    border: 0,
    color: "white",
  };
  // Open Settings
  const [OpenSettingBar, setOpenSettingBar] = useState(false);
  // Social Media Menu Bar
  const [socialMediaMenu, setSocialMediaMenu] = useState(false);
  const reDirectTohome = () => {
    navigate("/home");
  };
  // Like and dislike
  const LikeDislike = (video_id) => {
    if (!sessionStorage.getItem("userDetails")) {
      toast.warning("Please Login First!");
    } else {
      const user_id = JSON.parse(sessionStorage.getItem("userDetails")).user_id;
      axios
        .post(process.env.REACT_APP_API_URL + "/playlist/like", {
          user: user_id,
          video: video_id,
          opr: "like",
        })
        .then((res) => {
          console.log("Video Like");
        })
        .catch((err) => {
          console.log("error Video not like");
        });
    }
  };

  // Get Reserved Space
  const [MoreVideoData, setMoreVideoData] = useState([]);
  const [RandomVideoData, setRandomVideoData] = useState([]);
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
            setallData(response.data);
          }
        }
      });

    axios
      .get(process.env.REACT_APP_API_URL + "/playlist/getVideoData", {
        headers: { Token: "sdsndsddbsbdjsfdbsfdJDSKDjldfsd" },
      })
      .then((res) => {
        // Set All Videos
        var moreData = [];
        var randomData = [];
        res.data.forEach((element, index) => {
          if (res.data[index].MorelocationStatus == "morePool") {
            moreData.push(element);
          }
          if (res.data[index].RandomlocationStatus == "randomPool") {
            randomData.push(element);
          }
        });
        setMoreVideoData(moreData);
        setRandomVideoData(randomData);
        // Set All Live Videos
      });
  }, []);
  const Dislike = (video_id) => {
    if (!sessionStorage.getItem("userDetails")) {
      toast.warning("Please Login First!");
    } else {
      const user_id = JSON.parse(sessionStorage.getItem("userDetails")).user_id;
      axios
        .post(process.env.REACT_APP_API_URL + "/playlist/like", {
          user: user_id,
          video: video_id,
          opr: "dislike",
        })
        .then((res) => {
          currentVideo.likes = user_id;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // copy Embed Code
  const [copySuccess, setCopySuccess] = useState("");
  const [morePoolOn, SetmorePoolOn] = useState(true);
  const [PlayUrl, setPlayUrl] = useState("");
  const [UrlDetails, setUrlDetails] = useState("");

  const textAreaRef = useRef(null);
  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopySuccess("Copied!");
  }
  const MoveToNowPlaying = () => {
    document.getElementById("noanim-tab-example-tab-home").click();
  };
  const EmptyCopy = () => {
    setCopySuccess("");
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div
              className="col-12 col-lg-9 p-0"
              style={{ position: "relative" }}
            >
              {currentPlaylist ? (
                currentPlaylist.videos.length != 0 ? (
                  <button className="skip-button" onClick={onEnded}>
                    Skip
                  </button>
                ) : (
                  ""
                )
              ) : (
                ""
              )}

              <div
                className={
                  window.location.href.split("id=")[1]
                    ? "PlaylistPlayer__player-wrapper"
                    : "PlaylistPlayer__player-wrapper-RemoveThis"
                }
              >
                {currentVideo ? (
                  PlayUrl !== "" ? (
                    <ReactPlayer
                      url={PlayUrl}
                      className="PlaylistPlayer__player"
                      width="100%"
                      height="100%"
                      onEnded={onEnded}
                      playing
                      controls
                    />
                  ) : (
                    <ReactPlayer
                      url={currentVideo.url}
                      className="PlaylistPlayer__player"
                      width="100%"
                      height="100%"
                      onEnded={onEnded}
                      playing
                      controls
                    />
                  )
                ) : (
                  <>
                    <div
                      className="d-block d-md-none"
                      style={{ position: "absolute", top: "4%", left: "15%" }}
                    >
                      <img
                        src={require("../asset/images/empty.png")}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div
                      className="d-none d-md-block"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                      }}
                    >
                      <img
                        src={require("../asset/images/empty.png")}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="col-12 col-lg-3" style={{ background: "tra" }}>
              {/* tab manage */}
              <div className="row position-relative h-100 p-0">
                <div className="col-12 p-0">
                  <Tabs
                    defaultActiveKey="home"
                    transition={true}
                    id="noanim-tab-example"
                    style={{ border: "none" }}
                  >
                    <Tab
                      eventKey="home"
                      title="Now Playing"
                      style={{ width: "100%" }}
                    >
                      <div className="row m-0">
                        <div
                          className="col-12 PlaylistPlayer__badge"
                          style={{ overflowY: "scroll", height: "404px" }}
                        >
                          {currentPlaylist == undefined ? (
                            <img
                              src={require("../asset/images/empty.png")}
                              className="img-fluid m-0 p-0"
                              alt=""
                              style={{ width: "100%", height: "60%" }}
                            />
                          ) : currentPlaylist.videos == undefined ? (
                            <img
                              src={require("../asset/images/empty.png")}
                              className="img-fluid m-0 p-0"
                              alt=""
                              style={{ width: "100%", height: "60%" }}
                            />
                          ) : currentPlaylist.videos.length == 0 ? (
                            <img
                              src={require("../asset/images/empty.png")}
                              className="img-fluid m-0 p-0"
                              alt=""
                              style={{ width: "100%", height: "60%" }}
                            />
                          ) : (
                            currentPlaylist.videos.map((video, index) => (
                              <VideoBadge
                                key={index}
                                video={video}
                                onClick={() => {
                                  setPlayUrl("");
                                  setVideoIndex(index);
                                  setUrlDetails("");
                                }}
                                active={index === videoIndex}
                              />
                            ))
                          )}
                        </div>
                      </div>
                    </Tab>
                    <Tab
                      eventKey="profile"
                      title={
                        window.location.href.split("id=")[1]
                          ? "Share Playlist"
                          : "My Playlist"
                      }
                    >
                      <div
                        className="PlaylistPlayer__playlists"
                        style={{ overflowY: "scroll", height: "404px" }}
                      >
                        {userPlaylist.length == 0 ? (
                          <img
                            src={require("../asset/images/empty.png")}
                            className="img-fluid m-0 p-0"
                            alt=""
                            style={{ width: "100%", height: "60%" }}
                          />
                        ) : (
                          userPlaylist.map((playlist, index) => (
                            <PlaylistButton
                              key={index}
                              playlist={playlist}
                              onClick={() => {
                                setPlaylistIndex(index);
                                setVideoIndex(0);
                                setCurrentPlaylistFrom("user");
                                changePlaylist(index);
                                MoveToNowPlaying();
                              }}
                              active={index === playlistIndex}
                            />
                          ))
                        )}
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>

              {/* end tabs */}
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Embed Code
                </h5>
                <button
                  onClick={EmptyCopy}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div>
                  {document.queryCommandSupported("copy") && (
                    <div>
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={copyToClipboard}
                      >
                        Copy
                      </button>{" "}
                      {copySuccess}
                    </div>
                  )}
                  {currentPlaylist ? (
                    <form>
                      <textarea
                        className="embedTextArea"
                        ref={textAreaRef}
                        value={
                          "<iframe width='560' src='http://190.92.153.226:3000/playlist?id=" +
                          currentPlaylist._id +
                          "'title='YouTube video player' frameborder='0' allow='autoplay; fullscreen; picture-in-picture;' allowfullscreen style='position:absolute;top:0;left:0;width:100%;height:119%;'></iframe>"
                        }
                      />
                    </form>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div onClick={EmptyCopy} className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {window.location.href.split("id=")[1] ? (
          ""
        ) : (
          <div className="col-12">
            <div className="row">
              <div
                className="col-12 col-md-9"
                style={{ background: "#004D73" }}
              >
                <div className="row">
                  <div className="col-12 col-md-8 p-0">
                    {allData ? (
                      <img
                        src={
                          "http://190.92.153.226:5000/assets/images/reserved/" +
                          allData[5].resimage
                        }
                        className="img-fluid"
                        style={{ width: "100%", height: "68px" }}
                        alt=""
                      />
                    ) : (
                      <img
                        src={
                          "http://190.92.153.226:5000/assets/images/reserved/"
                        }
                        className="img-fluid"
                        alt=""
                      />
                    )}
                  </div>
                  <div
                    className="col-12 col-md-4 bg-black"
                    style={{ color: "#fff", background: "black" }}
                  >
                    {currentVideo ? (
                      <div>
                        <div
                          style={{ fontSize: "18px" }}
                          className="border-bottom "
                        >
                          {UrlDetails !== ""
                            ? UrlDetails.title.substring(0, 12) + "..."
                            : currentVideo.channel_name}{" "}
                          <br />{" "}
                        </div>
                        <div>
                          <div className="row playlist_bottom_header1">
                            <div className="col-12 p-0 d-flex">
                              <ul style={{ margin: "auto" }}>
                                <li
                                  style={{
                                    display: "inline",
                                    margin: "2px 0px 0px -22px",
                                  }}
                                >
                                  <img
                                    style={{ cursor: "pointer", width: "23%" }}
                                    src={require(`../asset/images/LoginLogo.png`)}
                                    className="img-fluid"
                                    alt=""
                                  />
                                </li>
                                <li style={{ display: "inline" }}>
                                  <img
                                    src={require(`../asset/images/ButtonBACK.png`)}
                                    onClick={onBack}
                                    className="img-fluid m-auto"
                                    alt=""
                                    style={{ width: "16%", cursor: "pointer" }}
                                  />
                                </li>

                                <li style={{ display: "inline" }}>
                                  <img
                                    src={require(`../asset/images/Button_PLAY.png`)}
                                    onClick={onEnded}
                                    className="img-fluid m-auto"
                                    alt=""
                                    style={{ width: "16%", cursor: "pointer" }}
                                  />
                                </li>

                                <li style={{ display: "inline" }}>
                                  <img
                                    src={require(`../asset/images/ButtonNext.png`)}
                                    onClick={onEnded}
                                    className="img-fluid m-auto"
                                    alt=""
                                    style={{ width: "16%", cursor: "pointer" }}
                                  />
                                </li>

                                <li
                                  style={{ display: "inline", margin: "2px" }}
                                >
                                  {window.location.href.split("id=")[1] ? (
                                    <img
                                      onClick={() =>
                                        alert("Please Login First")
                                      }
                                      style={{
                                        cursor: "pointer",
                                        width: "16%",
                                      }}
                                      src={require(`../asset/images/ButtonNotLike.png`)}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  ) : currentVideo ? (
                                    currentVideo.likesThisUser ? (
                                      <img
                                        style={{
                                          cursor: "pointer",
                                          width: "16%",
                                        }}
                                        onClick={() =>
                                          Dislike(currentVideo._id)
                                        }
                                        src={require(`../asset/images/ButtonLike.png`)}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    ) : (
                                      <img
                                        style={{
                                          cursor: "pointer",
                                          width: "16%",
                                        }}
                                        onClick={() =>
                                          LikeDislike(currentVideo._id)
                                        }
                                        src={require(`../asset/images/ButtonNotLike.png`)}
                                        className="img-fluid"
                                        alt=""
                                      />
                                    )
                                  ) : (
                                    <img
                                      onClick={() => alert("No Video Found")}
                                      style={{
                                        cursor: "pointer",
                                        width: "16%",
                                      }}
                                      src={require(`../asset/images/ButtonNotLike.png`)}
                                      className="img-fluid"
                                      alt=""
                                    />
                                  )}
                                </li>

                                <li
                                  style={{ display: "inline", margin: "2px" }}
                                >
                                  <ul
                                    className={
                                      OpenSettingBar
                                        ? "dropDownSetting"
                                        : "dropDownSetting hidden"
                                    }
                                  >
                                    <li
                                      style={{
                                        cursor: "pointer",
                                        width: "16%",
                                      }}
                                      onClick={() => {
                                        setOpenSettingBar(false);
                                        setSocialMediaMenu(true);
                                      }}
                                      className="p-1"
                                      to="/"
                                    >
                                      Share to Social
                                    </li>
                                    <li
                                      style={{
                                        cursor: "pointer",
                                        width: "16%",
                                      }}
                                      data-bs-toggle="modal"
                                      data-bs-target="#exampleModal"
                                      className="p-1"
                                      to="/playlist"
                                    >
                                      Share Embed
                                    </li>
                                  </ul>
                                  <ul
                                    className={
                                      socialMediaMenu
                                        ? "dropDownSetting"
                                        : "dropDownSetting hidden"
                                    }
                                    style={{ padding: "0 18px" }}
                                  >
                                    {socialMediaMenu ? (
                                      <ShareSocial
                                        style={style}
                                        url={
                                          "http://190.92.153.226:3000/playlist?id=" +
                                          currentPlaylist._id
                                        }
                                        socialTypes={[
                                          "facebook",
                                          "twitter",
                                          "reddit",
                                          "linkedin",
                                          "email",
                                          "pinterest",
                                          "whatsapp",
                                        ]}
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </ul>
                                  <img
                                    style={{ cursor: "pointer", width: "16%" }}
                                    onClick={() => {
                                      setOpenSettingBarChange();
                                      setOpenMenuBar(false);
                                    }}
                                    src={require(`../asset/images/MoreShare.png`)}
                                    className="img-fluid"
                                    alt=""
                                  />
                                </li>

                                {/* <img style={{ cursor: "pointer" , width:'14%' }} onClick={setOpenMenuBar} src={require(`../asset/images/Button_goToUserPage2.png`)} className="img-fluid" alt="" /> */}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      "Video Not found in Current Playlist"
                    )}
                  </div>
                  <div className="col-12">
                    <div className="row border-top">
                      <div className="col-12 col-md-11 ">
                        {morePoolOn ? (
                          <div className="row">
                            {MoreVideoData.slice(0, 5).map((videos, index) => (
                              <div
                                className=""
                                style={{
                                  background: "#fff",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  display: "flex",
                                  padding: "0",
                                  width: "20%",
                                  height: "auto",
                                }}
                              >
                                {videos.thumbnail !== "" ? (
                                  <div
                                    onClick={() => {
                                      setPlayUrl(videos.url);
                                      setUrlDetails(videos);
                                    }}
                                    style={{
                                      backgroundImage: `url(${videos.thumbnail})`,
                                      backgroundSize: "cover",
                                      backgroundPosition: "center",
                                      height: "6em",
                                      width: "100%",
                                      backgroundRepeat: "no-repeat",
                                      cursor: "pointer",
                                    }}
                                  ></div>
                                ) : (
                                  <div
                                    onClick={() => {
                                      setPlayUrl(videos.url);
                                      setUrlDetails(videos);
                                    }}
                                    style={{
                                      backgroundImage: `url(${videos.thumbnail})`,
                                      backgroundSize: "cover",
                                      backgroundPosition: "center",
                                      height: "6em",
                                      width: "100%",
                                      backgroundRepeat: "no-repeat",
                                      cursor: "pointer",
                                    }}
                                  ></div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="row">
                            {RandomVideoData.slice(0, 5).map(
                              (videos, index) => (
                                <div
                                  className=""
                                  style={{
                                    background: "#fff",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    display: "flex",
                                    padding: "0",
                                    width: "20%",
                                    height: "auto",
                                  }}
                                >
                                  {videos.thumbnail !== "" ? (
                                    <div
                                      onClick={() => {
                                        setPlayUrl(videos.url);
                                        setUrlDetails(videos);
                                      }}
                                      style={{
                                        backgroundImage: `url(${videos.thumbnail})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        height: "6em",
                                        width: "100%",
                                        backgroundRepeat: "no-repeat",
                                        cursor: "pointer",
                                      }}
                                    ></div>
                                  ) : (
                                    <div
                                      onClick={() => {
                                        setPlayUrl(videos.url);
                                        setUrlDetails(videos);
                                      }}
                                      style={{
                                        backgroundImage: `url(${videos.thumbnail})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        height: "6em",
                                        width: "100%",
                                        backgroundRepeat: "no-repeat",
                                        cursor: "pointer",
                                      }}
                                    ></div>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                      <div className="col-12 col-md-1 bg-black">
                        <div className="row">
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={moreVideos}
                            className="col-6 col-sm-12 d-flex"
                          >
                            <img
                              onClick={() => {
                                SetmorePoolOn(true);
                              }}
                              src={require(`../asset/images/ButtonNext.png`)}
                              className="img-fluid m-auto ButtonNext"
                              alt=""
                            />
                          </div>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={moreVideos}
                            className="col-6 col-sm-12 d-flex p-0"
                          >
                            <img
                              onClick={() => {
                                SetmorePoolOn(false);
                              }}
                              src={require(`../asset/images/Button_mix.png`)}
                              className="img-fluid m-auto ButtonMix"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-12 col-md-3 p-0"
                style={{ background: "#004D73", color: "#fff" }}
              >
                {allData ? (
                  <img
                    src={
                      "http://190.92.153.226:5000/assets/images/reserved/" +
                      allData[6].resimage
                    }
                    className="img-fluid"
                    style={{ width: "100%", height: "159px" }}
                    alt=""
                  />
                ) : (
                  <img
                    src={"http://190.92.153.226:5000/assets/images/reserved/"}
                    className="img-fluid"
                    alt=""
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
const VideoBadge = ({ video, onClick, active }) => {
  const className = classnames({
    VideoBadge: true,
    "VideoBadge--clickable": onClick,
    "VideoBadge--active": active,
  });

  return (
    <div className={className} onClick={onClick}>
      <div
        className="VideoBadge__logo"
        style={{ backgroundImage: `url(${video.thumbnail})` }}
      />
      <div className="VideoBadge__info">
        <div
          style={{ fontSize: "12px" }}
          className="VideoBadge__title PlaylistButton__title"
        >
          {video.title.slice(0, 20) + "..."}
        </div>
        <div className="VideoBadge__title">Creator : {video.channel_name}</div>
        <div className="VideoBadge__title">
          {/* Posted Date : {video.posted_date} */}
        </div>
        <div className="VideoBadge__title">
          duration :{" "}
          {moment("2015-01-01")
            .startOf("day")
            .seconds(video.duration)
            .format("H:mm:ss")}
        </div>
      </div>
    </div>
  );
};
const PlaylistButton = ({ playlist, onClick, active }) => {
  const className = classnames({
    PlaylistButton: true,
    "PlaylistButton--active": active,
  });
  return (
    <>
      <div className={className} onClick={onClick}>
        {playlist.image == "no" ? (
          <div
            className="PlaylistButton__logo"
            style={{
              background: "#fff",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              padding: "10px",
            }}
          >
            <img
              src="https://img.icons8.com/ios/90/000000/no-video--v1.png"
              style={{ width: "30%" }}
            />
          </div>
        ) : (
          <div
            className="PlaylistButton__logo"
            style={{ backgroundImage: `url(${playlist.image})` }}
          />
        )}
        <div className="PlaylistButton__info">
          <div className="PlaylistButton__title">{playlist.title}</div>
          <p style={{ fontSize: "10px", margin: "0" }}>
            {/* Username - {playlist.users[0].username} */}
          </p>
          <p style={{ fontSize: "10px", margin: "0" }}>
            Created At - {playlist.createdAt}
          </p>
          <p style={{ fontSize: "10px", margin: "0" }}>
            Playlist Runtime - {playlist.runtime}
          </p>
        </div>
      </div>
    </>
  );
};
