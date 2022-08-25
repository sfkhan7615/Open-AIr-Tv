import React, { useState, useRef, useEffect } from "react";
import { Paper, Grid, styled } from "@mui/material";
import playBtn from "../asset/images/home/playBtn.png";
import todayTopList from "../asset/images/home/todayTopList.png";
import { NavLink, useNavigate } from "react-router-dom";
import todayMixlist from "../asset/images/home/todayMixlist.png";
import ReactPlayer from "react-player";
import { ShareSocial } from "react-share-social";
import "../asset/css/index.css";
import { array } from "prop-types";

const axios = require("axios");
//  Set Item for Matrial Ui
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
//  Home page main function
function Home() {
  const style = {
    background: "transparent",
    borderRadius: 3,
    border: 0,
    color: "white",
  };
  //Share Button

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

  const [OpenSettingBar, setOpenSettingBar] = useState(false);

  // Social Media Menu Bar
  const [socialMediaMenu, setSocialMediaMenu] = useState(false);

  const navigate = useNavigate();
  // Api Key
  const YoutubeApiKey = "AIzaSyDOlMF3B52Ssd0wFzEZO8vaxgCoSCY-0v0";
  // Suggestions Hide and Show
  const [showSuggetionVideos, setShowSuggetionVideos] = useState(true);
  const [morePoolOn, SetmorePoolOn] = useState(true);
  const [CloseMenu, SetCloseMenu] = useState(false);
  const [OpenMenuBar, setOpenMenuBar] = useState(false);
  const closeMenu = () => {
    SetCloseMenu(true);
  };
  // End
  const [PlayUrl, setPlayUrl] = useState("");
  const [UrlDetails, setUrlDetails] = useState("");
  const [PlaylistDetails, setPlaylistDetails] = useState([]);
  const [allPlaylistData, SetPlaylist] = useState([]);
  const [topPlaylistData, TopPlaylist] = useState([]);
  const [loadData, SetLoadData] = useState(false);
  const [allLiveVideolistData, SetLiveVideolist] = useState([]);
  const [allVideolistData, SetVideolist] = useState([]);
  const [MoreVideoData, setMoreVideoData] = useState([]);
  const [RandomVideoData, setRandomVideoData] = useState([]);
  const [allData, setallData] = useState("");
  const [videoIndex, setVideoIndex] = useState(0);
  const videoIndexx = (index) => {
    setVideoIndex(index + 1);
  };
  // Channel Data
  const [channelArray, SetChannelArray] = useState([]);
  const [allchannelArray, SetAllChannelArray] = useState([]);
  const [ChannelDetailFromDb, SetChannelDetailFromDb] = useState([]);

  // Get Channel Url From DataBase
  const [AllChannelsArray, GetAllChannelsArray] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/homecontrol/getAlldata", {
        headers: { Token: token },
      })
      .then((response) => {
        var ChannelArray = [];
        var count = 0;
        for (let index = 0; index < response.data.length; index++) {
          if (response.data.length !== 0) {
            SetChannelDetailFromDb(response.data);
            //Get Channel Data From youtube
            axios
              .get(
                `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=` +
                  response.data[index].url +
                  `&key=` +
                  YoutubeApiKey
              )
              .then((res) => {
                ChannelArray[count] = res.data.items;
                count++;
                // console.log(res.data);
                // for (let index = 0; index < res.data.items.length; index++) {
                //   var newListArray = {
                //     title: res.data.items[index].snippet.title,
                //     url: `https://www.youtube.com/watch?v=` + res.data.items[index].contentDetails.videoId,
                //     posted_date: res.data.items[index].snippet.publishedAt,
                //     channel_name: res.data.items[index].snippet.channelTitle,
                //     channel_url:
                //       `https://www.youtube.com/channel/` +
                //       res.data.items[index].snippet.channelId,
                //     description: res.data.items[index].snippet.description,
                //     embeded_code: res.data.items[index].contentDetails.videoId,
                //     location: null,
                //     plays_at: null,
                //   };
                //   console.log(newListArray);
                if (res.data.items)
                  res.data.items.ChannelDetailFromDb = response.data[index];
                SetChannelArray(res.data.items);
              });
          }
        }
        SetAllChannelArray(ChannelArray);
      });
  }, []);

  //  Set Style For Home Page(main)
  useEffect(() => {
    if (CloseMenu == true) {
      document.getElementsByClassName("dropDown")[0].classList.add("hidden");
    }
    document.body.style.backgroundRepeat = "repeat-y";
    document.body.style.height = "auto";
    document.getElementsByClassName(
      "css-1g7fu7m-MuiContainer-root"
    )[0].style.maxWidth = "100%";
    document.getElementsByClassName("main-container")[0].style.height = "100%";
    document.getElementsByClassName("main-container")[0].style.width = "100%";

    document.getElementsByClassName("footer")[0].style.display = "none";
    document.getElementsByClassName("header")[0].style.display = "flex";
    document.getElementsByClassName(
      "css-1g7fu7m-MuiContainer-root"
    )[0].style.paddingTop = "10px";
    // document.getElementsByClassName("header")[0].style.height = "unset";
    SetCloseMenu(false);
  });
  var allLiveVideos = [];
  useEffect(() => {
    //  Call All Playlist Data
    axios
      .get(process.env.REACT_APP_API_URL + "/playlist/getPlayListData")
      .then((res) => {
        SetPlaylist(res.data);
        // 1. Set top playlist using likes
        if (res.data.length != 0) {
          if (res.data[0].videos.length != 0) {
            setPlayUrl(res.data[0].videos[0].url);
            setUrlDetails(res.data[0].videos[0]);
            setPlaylistDetails(res.data[0].videos);
          }
        }
        var tempPlaylistData = res.data;
        for (let i = 0; i < tempPlaylistData.length; i++) {
          var totalLikes = 0;
          for (let j = 0; j < tempPlaylistData[i].videos.length; j++) {
            totalLikes =
              totalLikes + parseInt(tempPlaylistData[i].videos[j].likes);
          }
          tempPlaylistData[i].likes = totalLikes;
        }
        var tempData = null;
        for (let i = 0; i < tempPlaylistData.length; i++) {
          for (let j = i + 1; j < tempPlaylistData.length; j++) {
            if (tempPlaylistData[i].likes < tempPlaylistData[j].likes) {
              tempData = tempPlaylistData[i];
              tempPlaylistData[i] = tempPlaylistData[j];
              tempPlaylistData[j] = tempData;
            }
          }
        }
        TopPlaylist(tempPlaylistData);
      });
    axios
      .get(process.env.REACT_APP_API_URL + "/playlist/getVideoData", {
        headers: { Token: "sdsndsddbsbdjsfdbsfdJDSKDjldfsd" },
      })
      .then((res) => {
        // Set All Videos
        var randomData = [];
        var moreData = [];
        SetVideolist(res.data);
        res.data.forEach((element, index) => {
          if (res.data[index].MorelocationStatus == "morePool") {
            moreData.push(element);
          }
          if (res.data[index].RandomlocationStatus == "randomPool") {
            randomData.push(element);
          }
        });
        setRandomVideoData(randomData);
        setMoreVideoData(moreData);
        // Set All Live Videos
        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].duration == 0) {
            var VideoIdis = "";
            let UslIs = res.data[index].url;
            let paramString = UslIs.split("?")[1];
            let queryString = new URLSearchParams(paramString);
            for (let pair of queryString.entries()) {
              VideoIdis = pair[1];
            }
            axios
              .get(
                `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=` +
                  VideoIdis +
                  `&key=AIzaSyDOlMF3B52Ssd0wFzEZO8vaxgCoSCY-0v0`
              )
              .then((videores) => {
                if (videores.data.items[0].snippet) {
                  if (
                    videores.data.items[0].snippet.liveBroadcastContent ==
                    "live"
                  ) {
                    allLiveVideos.push(res.data[index]);
                    SetLiveVideolist((allLiveVideos) => [
                      ...allLiveVideos,
                      res.data[index],
                    ]);
                  }
                }
              });
          }
        }
      });
  }, []);
  // Get Location
  const [CurrentLocationData, SetCurrentLocationData] = useState(
    new Date().toString().split("(")[1].split(" ")[0]
  );
  // End Location
  const [LocalPlayListData, SetLocalPlayListData] = useState(null);
  var playThumbnail = [];
  useEffect(() => {
    if (topPlaylistData.length != 0) {
      for (let i = 0; i < topPlaylistData.length; i++) {
        for (let j = 0; j < 1; j++) {
          if (topPlaylistData[i].videos.length != 0)
            playThumbnail.push(topPlaylistData[i].videos[j].thumbnail);
          else if (topPlaylistData[i].videos.length == 0) {
            topPlaylistData.splice(i, 1);
          }
        }
      }
      for (let i = 0; i < topPlaylistData.length; i++) {
        topPlaylistData[i].image = playThumbnail[i];
      }
      SetLoadData(true);
    }
    if (allPlaylistData.length != 0) {
      for (let i = 0; i < allPlaylistData.length; i++) {
        for (let j = 0; j < 1; j++) {
          if (allPlaylistData[i].videos.length != 0)
            playThumbnail.push(allPlaylistData[i].videos[j].thumbnail);
          else if (allPlaylistData[i].videos.length == 0) {
            allPlaylistData.splice(i, 1);
          }
        }
      }
      for (let i = 0; i < allPlaylistData.length; i++) {
        allPlaylistData[i].image = playThumbnail[i];
      }
      SetLoadData(true);
      allPlaylistData.forEach((element, index) => {
        element.videos.forEach((LocalPlaylistData, index) => {
          // console.log(JSON.parse(LocalPlaylistData.location).country)
          if (LocalPlaylistData.location !== null) {
            if (
              JSON.parse(LocalPlaylistData.location).country ==
              CurrentLocationData
            ) {
              SetLocalPlayListData(LocalPlaylistData);
            }
          }
        });
      });
    }
  }, []);
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
  }, []);
  // console.log(allData[0]);

  const onEnded = () => {
    if (allVideolistData[videoIndex + 1]) {
      setVideoIndex(videoIndex + 1);
    }
    setUrlDetails(allVideolistData[videoIndex]);
    setPlayUrl(allVideolistData[videoIndex].url);
  };

  const onBack = () => {
    if (allVideolistData[videoIndex - 1]) {
      setVideoIndex(videoIndex - 1);
    }
    setUrlDetails(allVideolistData[videoIndex]);
    setPlayUrl(allVideolistData[videoIndex].url);
  };
  // copy Embed Code
  const [copySuccess, setCopySuccess] = useState("");
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
      <main onClick={closeMenu}>
        <div className="row">
          <div className="col-12 col-md-3 col-lg-2 mb-3 order-2 order-md-1">
            <div className="sideVideos Categories mt-2 borderRadius todayList p-0">
              <h5 className="text-center text-white text-uppercase border-bottom mb-0 my-2">
                Channel
              </h5>
              <div
                className="hideScrollBar"
                style={{ height: "80vh", overflow: "scroll" }}
              >
                {allchannelArray.map((val, index) => (
                  <div>
                    {val ? (
                      val.ChannelDetailFromDb.position.includes("channel") &&
                      !val.ChannelDetailFromDb.position.includes(
                        "topchannel"
                      ) ? (
                        <div
                          onClick={() => {
                            setPlayUrl(
                              "https://www.youtube.com/watch?v=" +
                                val[0].contentDetails.videoId
                            );
                            navigate("/newplaylist?channelId=" + val[0].id);
                          }}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <div
                            title={val[0].snippet.title}
                            className="bg-dark text-white p-1"
                          >
                            <img className="playBtn" src={playBtn} alt="" />{" "}
                            {val[0].snippet.title.substring(0, 18)}...
                          </div>
                          <div
                            className="videoImg transparent p-0"
                            style={{ height: "18vh" }}
                          >
                            {val[0].snippet.thumbnails.default == undefined ? (
                              <img
                                src={
                                  "https://i.ytimg.com/vi/R5i60_TZuhY/default.jpg"
                                }
                                alt=""
                                className="w-100 h-100"
                              />
                            ) : (
                              <img
                                src={val[0].snippet.thumbnails.default.url}
                                alt=""
                                className="w-100 h-100"
                              />
                            )}
                          </div>
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-8 mb-3  order-1 order-md-2">
            <div className="row borderRadius">
              <Grid
                item
                className="displayVideoBox my-2 borderRadius todayList mainDisplay"
              >
                <Item className="displayVideo ">
                  <div className="row">
                    <div className="col-10">
                      <div
                        className="PlaylistPlayer__player-wrapper"
                        style={{ position: "relative", overflow: "hidden" }}
                      >
                        <ReactPlayer
                          url={PlayUrl ? PlayUrl : ""}
                          className="PlaylistPlayer__player"
                          width="100%"
                          height="100%"
                          playing
                          controls
                        />
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="col-12 col-md-11 ">
                        <div
                          className="row hideScrollBar setHeigthofScroller"
                          style={{
                            overflow: "scroll",
                          }}
                        >
                          {allVideolistData.map((videos, index) => (
                            <div
                              className=""
                              style={{
                                background: "#fff",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "block",
                                padding: "0",
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
                                <img
                                  src="https://img.icons8.com/ios/90/000000/no-video--v1.png"
                                  style={{ width: "30%" }}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: "#004D73", height: "12.6%" }}>
                    <div className="col-12">
                      <div className="row m-0">
                        <div
                          className="col-12 col-md-10"
                          style={{ background: "#004D73" }}
                        >
                          <div className="row">
                            <div className="col-12 col-md-8 p-0">
                              {allData ? (
                                <img
                                  src={
                                    "http://190.92.153.226:5000/assets/images/reserved/" +
                                    allData[0].resimage
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
                              style={{ color: "#fff" }}
                            >
                              <div>
                                <div
                                  style={{ fontSize: "18px" }}
                                  className="border-bottom "
                                  title={UrlDetails.title}
                                >
                                  {UrlDetails
                                    ? UrlDetails.title.substring(0, 20) + "..."
                                    : "Untitled"}
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
                                            onClick={() =>
                                              setOpenSettingBar(false)
                                            }
                                            style={{
                                              cursor: "pointer",
                                              width: "23%",
                                            }}
                                            src={require(`../asset/images/LoginLogo.png`)}
                                            className="img-fluid"
                                            alt=""
                                          />
                                        </li>
                                        <li
                                          onClick={() => {
                                            setOpenSettingBar(false);
                                          }}
                                          style={{ display: "inline" }}
                                        >
                                          <img
                                            onClick={onBack}
                                            src={require(`../asset/images/ButtonBACK.png`)}
                                            className="img-fluid m-auto"
                                            alt=""
                                            style={{
                                              width: "16%",
                                              cursor: "pointer",
                                            }}
                                          />
                                        </li>

                                        <li
                                          onClick={() => {
                                            setOpenSettingBar(false);
                                          }}
                                          style={{ display: "inline" }}
                                        >
                                          <img
                                            onClick={onEnded}
                                            src={require(`../asset/images/Button_PLAY.png`)}
                                            className="img-fluid m-auto"
                                            alt=""
                                            style={{
                                              width: "16%",
                                              cursor: "pointer",
                                            }}
                                          />
                                        </li>

                                        <li
                                          onClick={() => {
                                            setOpenSettingBar(false);
                                          }}
                                          style={{ display: "inline" }}
                                        >
                                          <img
                                            onClick={onEnded}
                                            src={require(`../asset/images/ButtonNext.png`)}
                                            className="img-fluid m-auto"
                                            alt=""
                                            style={{
                                              width: "16%",
                                              cursor: "pointer",
                                            }}
                                          />
                                        </li>

                                        <li
                                          style={{
                                            display: "inline",
                                            margin: "2px",
                                          }}
                                        >
                                          <img
                                            onClick={() => {
                                              setOpenSettingBar(false);
                                              alert("Please Login First");
                                            }}
                                            style={{
                                              cursor: "pointer",
                                              width: "16%",
                                            }}
                                            src={require(`../asset/images/ButtonNotLike.png`)}
                                            className="img-fluid"
                                            alt=""
                                          />
                                        </li>

                                        <li
                                          style={{
                                            display: "inline",
                                            margin: "2px",
                                          }}
                                        >
                                          <ul
                                            className={
                                              OpenSettingBar
                                                ? "dropDownSettingHome"
                                                : "dropDownSettingHome hidden"
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
                                                ? "dropDownSettingHome"
                                                : "dropDownSettingHome hidden"
                                            }
                                            style={{ padding: "0 18px" }}
                                          >
                                            {socialMediaMenu ? (
                                              <ShareSocial
                                                style={style}
                                                url={
                                                  "http://190.92.153.226:3000/playlist?id=" +
                                                  UrlDetails._id
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
                                            style={{
                                              cursor: "pointer",
                                              width: "16%",
                                            }}
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
                            </div>
                            <div
                              onClick={() => {
                                setOpenSettingBar(false);
                              }}
                              className="col-12"
                            >
                              <div className="row border-top">
                                <div className="col-12 col-md-11 ">
                                  {morePoolOn ? (
                                    <div className="row">
                                      {MoreVideoData.slice(0, 5).map(
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
                                      onClick={() => {
                                        SetmorePoolOn(true);
                                      }}
                                      style={{ cursor: "pointer" }}
                                      className="col-6 col-sm-12 d-flex"
                                    >
                                      <img
                                        src={require(`../asset/images/ButtonNext.png`)}
                                        className="img-fluid m-auto ButtonNext"
                                        alt=""
                                      />
                                    </div>
                                    <div
                                      onClick={() => {
                                        SetmorePoolOn(false);
                                      }}
                                      style={{ cursor: "pointer" }}
                                      className="col-6 col-sm-12 d-flex p-0"
                                    >
                                      <img
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
                          className="col-12 col-md-2 p-0"
                          style={{ background: "#004D73", color: "#fff" }}
                        >
                          {allData ? (
                            <img
                              src={
                                "http://190.92.153.226:5000/assets/images/reserved/" +
                                allData[6].resimage
                              }
                              className="img-fluid"
                              style={{ width: "100%" }}
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
                      </div>
                    </div>
                  </div>
                </Item>
              </Grid>
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
                    {UrlDetails ? (
                      <form>
                        <textarea
                          className="embedTextArea"
                          ref={textAreaRef}
                          value={
                            "<iframe width='560' src='http://190.92.153.226:3000/playlist?id=" +
                            UrlDetails._id +
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
          <div className="col-12 col-md-3 col-lg-2 mb-3 order-3">
            <div className="sideVideos Categories mt-2 borderRadius todayList p-0">
              <h5 className="text-center text-white text-uppercase border-bottom mb-0 my-2">
                Top Channel
              </h5>
              <div
                className="hideScrollBar"
                style={{ height: "80vh", overflow: "scroll" }}
              >
                {allchannelArray.map((val, index) => (
                  <div>
                    {val ? (
                      val.ChannelDetailFromDb.position.includes(
                        "topchannel"
                      ) ? (
                        <div
                          onClick={() => {
                            setPlayUrl(
                              "https://www.youtube.com/watch?v=" +
                                val[0].contentDetails.videoId
                            );
                            navigate("/newplaylist?channelId=" + val[0].id);
                          }}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <div
                            title={val[0].snippet.title}
                            className="bg-dark text-white p-1"
                          >
                            <img className="playBtn" src={playBtn} alt="" />{" "}
                            {val[0].snippet.title.substring(0, 18)}...
                          </div>
                          <div
                            className="videoImg transparent p-0"
                            style={{ height: "18vh" }}
                          >
                            {val[0].snippet.thumbnails.default == undefined ? (
                              <img
                                src={
                                  "https://i.ytimg.com/vi/R5i60_TZuhY/default.jpg"
                                }
                                alt=""
                                className="w-100 h-100"
                              />
                            ) : (
                              <img
                                src={val[0].snippet.thumbnails.default.url}
                                alt=""
                                className="w-100 h-100"
                              />
                            )}
                          </div>
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <main onClick={closeMenu}>
        <div className="row">
          <div className="col-12 col-md-3 col-lg-2 mb-3">
            <div
              className="sideVideos Categories borderRadius todayList p-0"
              style={{ height: "auto" }}
            >
              <h5 className="text-center text-white text-uppercase border-bottom mb-0 my-2">
                EXPLORE
              </h5>
              <div
                className="hideScrollBar"
                style={{ height: "70vh", overflow: "scroll" }}
              >
                {allchannelArray.map((val, index) => (
                  <div>
                    {val ? (
                      val.ChannelDetailFromDb.position.includes("explore") ? (
                        <div
                          onClick={() => {
                            setPlayUrl(
                              "https://www.youtube.com/watch?v=" +
                                val[0].contentDetails.videoId
                            );
                            navigate("/newplaylist?channelId=" + val[0].id);
                          }}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <div
                            title={val[0].snippet.title}
                            className="bg-dark text-white p-1"
                          >
                            <img className="playBtn" src={playBtn} alt="" />{" "}
                            {val[0].snippet.title.substring(0, 18)}...
                          </div>
                          <div
                            className="videoImg transparent p-0"
                            style={{ height: "18vh" }}
                          >
                            {val[0].snippet.thumbnails.default == undefined ? (
                              <img
                                src={
                                  "https://i.ytimg.com/vi/R5i60_TZuhY/default.jpg"
                                }
                                alt=""
                                className="w-100 h-100"
                              />
                            ) : (
                              <img
                                src={val[0].snippet.thumbnails.default.url}
                                alt=""
                                className="w-100 h-100"
                              />
                            )}
                          </div>
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
              <Grid
                style={{ cursor: "pointer" }}
                className="videoItem"
                item
                xs={12}
                sm={12}
                md={12}
              >
                {allData ? (
                  <img
                    src={
                      "http://190.92.153.226:5000/assets/images/reserved/" +
                      allData[1].resimage
                    }
                    className="img-fluid resImageHome"
                    alt=""
                    style={{ width: "100%", height: "20vh" }}
                  />
                ) : (
                  <img
                    src={"http://190.92.153.226:5000/assets/images/reserved/"}
                    className="img-fluid resImageHome"
                    alt=""
                  />
                )}
              </Grid>
              <Grid
                style={{ cursor: "pointer" }}
                className="videoItem"
                item
                xs={12}
                sm={12}
                md={12}
              >
                {allData ? (
                  <img
                    src={
                      "http://190.92.153.226:5000/assets/images/reserved/" +
                      allData[2].resimage
                    }
                    className="img-fluid resImageHome"
                    alt=""
                    style={{ width: "100%", height: "20vh" }}
                  />
                ) : (
                  <img
                    src={"http://190.92.153.226:5000/assets/images/reserved/"}
                    className="img-fluid resImageHome"
                    alt=""
                  />
                )}
              </Grid>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-8 mb-3 todayList borderRadius">
            <Grid
              item
              container
              xs={12}
              sm={12}
              md={12}
              className="sideVideos mainDisplay"
            >
              <Grid
                style={{ cursor: "pointer" }}
                className="videoItem"
                item
                xs={6}
                sm={12}
                md={6}
              >
                <Item className="aboutVideo transparent todayList">
                  <img className="playBtn" src={playBtn} alt="" />
                  Today List{" "}
                </Item>
                {allchannelArray.map((val, index) => (
                  <div>
                    {val ? (
                      val.ChannelDetailFromDb.position.includes(
                        "todayTopclip"
                      ) ? (
                        <Item
                          onClick={() => {
                            setPlayUrl(
                              "https://www.youtube.com/watch?v=" +
                                val[0].contentDetails.videoId
                            );
                            navigate("/newplaylist?channelId=" + val[0].id);
                          }}
                          className="videoImg transparent p-0"
                        >
                          {val[0].snippet.thumbnails.default == undefined ? (
                            <img
                              src={
                                "https://i.ytimg.com/vi/R5i60_TZuhY/default.jpg"
                              }
                              alt=""
                            />
                          ) : (
                            <img
                              src={val[0].snippet.thumbnails.default.url}
                              alt=""
                            />
                          )}
                        </Item>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                ))}
                <Item
                  className="videoDesc transparent"
                  style={{ height: "100px", background: "transparent" }}
                ></Item>
              </Grid>
              <Grid
                style={{ cursor: "pointer" }}
                className="videoItem"
                item
                xs={6}
                sm={12}
                md={6}
              >
                <Item className="aboutVideo transparent todayList">
                  <img className="playBtn" src={playBtn} alt="" />
                  Music
                </Item>
                {allchannelArray.map((val, index) => (
                  <div>
                    {val ? (
                      val.ChannelDetailFromDb.position.includes(
                        "supermusic"
                      ) ? (
                        <Item
                          onClick={() => {
                            setPlayUrl(
                              "https://www.youtube.com/watch?v=" +
                                val[0].contentDetails.videoId
                            );
                            navigate("/newplaylist?channelId=" + val[0].id);
                          }}
                          className="videoImg transparent p-0"
                        >
                          {val[0].snippet.thumbnails.default == undefined ? (
                            <img
                              src={
                                "https://i.ytimg.com/vi/R5i60_TZuhY/default.jpg"
                              }
                              alt=""
                            />
                          ) : (
                            <img
                              src={val[0].snippet.thumbnails.default.url}
                              alt=""
                            />
                          )}
                        </Item>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                ))}
                <Item
                  className="videoDesc transparent"
                  style={{ height: "100px", background: "transparent" }}
                ></Item>
              </Grid>
              {/* center divs */}
              <Grid
                style={{ cursor: "pointer" }}
                item
                container
                xs={12}
                sm={12}
                md={12}
                className="moreVideos"
              >
                {allVideolistData.slice(0, 24).map((videos, index) =>
                  videos.thumbnail !== "" &&
                  videos.locationStatus == "homePlay" ? (
                    <Grid
                      onClick={() => {
                        setPlayUrl(videos.url);
                        setUrlDetails(videos);
                      }}
                      className="videoItem"
                      item
                      xs={12}
                      sm={12}
                      md={3}
                      key={index}
                    >
                      <Item className="aboutVideo transparent todayList">
                        {index == 0 ? (
                          <>
                            {" "}
                            <img
                              className="playBtn"
                              src={playBtn}
                              alt=""
                            />{" "}
                            {videos.title.substring(0, 10)}
                          </>
                        ) : (
                          <img
                            className="playBtn"
                            src={playBtn}
                            alt=""
                            style={{ visibility: "hidden" }}
                          />
                        )}
                      </Item>
                      <Item className="videoImg transparent p-0">
                        <img src={videos.thumbnail} alt="" />
                      </Item>
                    </Grid>
                  ) : videos.thumbnail !== "" ? (
                    <Grid
                      onClick={() => {
                        setPlayUrl(videos.url);
                        setUrlDetails(videos);
                      }}
                      className="videoItem"
                      item
                      xs={12}
                      sm={12}
                      md={3}
                      key={index}
                    >
                      <Item className="aboutVideo transparent todayList">
                        {index == 0 ? (
                          <>
                            {" "}
                            <img
                              className="playBtn"
                              src={playBtn}
                              alt=""
                            />{" "}
                            {videos.title.substring(0, 10)}
                          </>
                        ) : (
                          <img
                            className="playBtn"
                            src={playBtn}
                            alt=""
                            style={{ visibility: "hidden" }}
                          />
                        )}
                      </Item>
                      <Item className="videoImg transparent p-0">
                        <img src={videos.thumbnail} alt="" />
                      </Item>
                    </Grid>
                  ) : (
                    ""
                  )
                )}
              </Grid>
            </Grid>
          </div>
          <div className="col-12 col-md-3 col-lg-2 mb-3">
            <div
              className="sideVideos Categories borderRadius todayList p-0"
              style={{ height: "auto" }}
            >
              <h5 className="text-center text-white text-uppercase border-bottom mb-0 my-2">
                TRENDING
              </h5>
              <div
                className="hideScrollBar"
                style={{ height: "68vh", overflow: "scroll" }}
              >
                {allchannelArray.map((val, index) => (
                  <div>
                    {val ? (
                      val.ChannelDetailFromDb.position.includes("trending") ? (
                        <div
                          onClick={() => {
                            setPlayUrl(
                              "https://www.youtube.com/watch?v=" +
                                val[0].contentDetails.videoId
                            );
                            navigate("/newplaylist?channelId=" + val[0].id);
                          }}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <div
                            title={val[0].snippet.title}
                            className="bg-dark text-white p-1"
                          >
                            <img className="playBtn" src={playBtn} alt="" />{" "}
                            {val[0].snippet.title.substring(0, 18)}...
                          </div>
                          <div
                            className="videoImg transparent p-0"
                            style={{ height: "18vh" }}
                          >
                            {val[0].snippet.thumbnails.default == undefined ? (
                              <img
                                src={
                                  "https://i.ytimg.com/vi/R5i60_TZuhY/default.jpg"
                                }
                                alt=""
                                className="w-100 h-100"
                              />
                            ) : (
                              <img
                                src={val[0].snippet.thumbnails.default.url}
                                alt=""
                                className="w-100 h-100"
                              />
                            )}
                          </div>
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
              <Grid
                style={{ cursor: "pointer", marginTop: "2px" }}
                className="videoItem"
                item
                xs={12}
                sm={12}
                md={12}
              >
                {allData ? (
                  <img
                    src={
                      "http://190.92.153.226:5000/assets/images/reserved/" +
                      allData[3].resimage
                    }
                    className="img-fluid resImageHome"
                    alt=""
                    style={{ width: "100%", height: "20vh" }}
                  />
                ) : (
                  <img
                    src={require("../asset/reserved/default.jpg")}
                    className="img-fluid resImageHome"
                    alt=""
                  />
                )}
              </Grid>
              <Grid
                style={{ cursor: "pointer" }}
                className="videoItem"
                item
                xs={12}
                sm={12}
                md={12}
              >
                {allData ? (
                  <img
                    src={
                      "http://190.92.153.226:5000/assets/images/reserved/" +
                      allData[4].resimage
                    }
                    className="img-fluid resImageHome"
                    alt=""
                    style={{ width: "100%", height: "20vh" }}
                  />
                ) : (
                  <img
                    src={require("../asset/reserved/default.jpg")}
                    className="img-fluid resImageHome"
                    alt=""
                  />
                )}
              </Grid>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default Home;
