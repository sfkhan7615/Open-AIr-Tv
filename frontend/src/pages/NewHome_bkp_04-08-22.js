import React, { useState, useEffect } from "react";
import { Paper, Grid, styled } from "@mui/material";
import playBtn from "../asset/images/home/playBtn.png";
import todayTopList from "../asset/images/home/todayTopList.png";
import { NavLink, useNavigate } from "react-router-dom";
import todayMixlist from "../asset/images/home/todayMixlist.png";
import ReactPlayer from "react-player";
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
  const navigate = useNavigate();
  // Api Key
  const YoutubeApiKey = "AIzaSyDOlMF3B52Ssd0wFzEZO8vaxgCoSCY-0v0";
  // Suggestions Hide and Show
  const [showSuggetionVideos, setShowSuggetionVideos] = useState(true);
  const [CloseMenu, SetCloseMenu] = useState(false);
  const [OpenMenuBar, setOpenMenuBar] = useState(false);
  const closeMenu = () => {
    SetCloseMenu(true);
  };
  // End
  const [PlayUrl, setPlayUrl] = useState("");
  const [UrlDetails, setUrlDetails] = useState("");
  const [allPlaylistData, SetPlaylist] = useState([]);
  const [topPlaylistData, TopPlaylist] = useState([]);
  const [loadData, SetLoadData] = useState(false);
  const [allLiveVideolistData, SetLiveVideolist] = useState([]);
  const [allVideolistData, SetVideolist] = useState([]);
  const [allData, setallData] = useState("");
  const [videoIndex, setVideoIndex] = useState(0);
  const videoIndexx = (index) => {
    setVideoIndex(index + 1);
  };
  // Channel Data
  // console.log(UrlDetails);
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
                res.data.items.ChannelDetailFromDb = response.data[index];
                SetChannelArray(res.data.items);
                // console.log(res.data.items);
                // }
              });
          }
        }
        SetAllChannelArray(ChannelArray);
      });
  }, []);
  console.log(allchannelArray);

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
        SetVideolist(res.data);
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

  // console.log(channelArray);
  // Get Location
  const [CurrentLocationData, SetCurrentLocationData] = useState(
    new Date().toString().split("(")[1].split(" ")[0]
  );
  // console.log(CurrentLocationData);
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
  const products = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "Six",
    "one",
    "two",
    "three",
    "four",
    "five",
    "Six",
    "one",
    "two",
    "three",
    "four",
    "five",
    "Six",
    "one",
    "two",
    "three",
    "four",
    "five",
    "Six",
  ];

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
                style={{ height: "82vh", overflow: "scroll" }}
              >
                {allchannelArray.map((val, index) => (
                  <div>
                    {val.ChannelDetailFromDb.position.includes("channel") &&
                    !val.ChannelDetailFromDb.position.includes("topchannel") ? (
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
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-8 mb-3  order-1 order-md-2">
            <Grid
              item
              className="displayVideoBox my-2 borderRadius todayList mainDisplay"
            >
              <Item className="displayVideo py-2">
                <div
                  className="PlaylistPlayer__player-wrapper height-118"
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
                <div style={{ background: "#004D73", height: "12.6%" }}>
                  <div className="row h-100">
                    <div className="col-md-6 col-md-6 ps-0 pt-0 pe-0 pb-0">
                      {allData ? (
                        <img
                          id=""
                          src={
                            "http://190.92.153.226:5000/assets/images/reserved/" +
                            allData[0].resimage
                          }
                          className="img-fluid"
                          alt=""
                          style={{ marginLeft: "12px", width: "97%" }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      className="col col-md-4 font-size-9"
                      style={{ background: "rgba(0,0,0,0.5)", color: "#fff" }}
                    >
                      <div>
                        {" "}
                        <marquee>{UrlDetails.title}</marquee> <br />
                        {UrlDetails.channel_name}
                        <br />
                        {UrlDetails.posted_date}
                      </div>
                    </div>
                    <div className="col col-md-2 p-0 d-flex">
                      <ul className="p-0" style={{ margin: "auto" }}>
                        <li style={{ display: "inline", margin: "0" }}>
                          <img
                            style={{ cursor: "pointer", width: "25%" }}
                            src={require(`../asset/images/logo.png`)}
                            className="img-fluid"
                            alt=""
                          />
                        </li>
                        <li style={{ display: "inline", margin: "-2px" }}>
                          <img
                            style={{ cursor: "pointer", width: "25%" }}
                            onClick={() => {
                              setPlayUrl(allVideolistData[videoIndex + 1].url);
                              setUrlDetails(allVideolistData[videoIndex + 1]);
                              videoIndexx(videoIndex);
                            }}
                            src={require(`../asset/images/Button_play2.png`)}
                            className="img-fluid"
                            alt=""
                          />
                        </li>
                        <li style={{ display: "inline", margin: "0" }}>
                          <img
                            style={{ cursor: "pointer", width: "25%" }}
                            src={require(`../asset/images/ButtonNext.png`)}
                            className="img-fluid"
                            alt=""
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Item>
            </Grid>
          </div>
          <div className="col-12 col-md-3 col-lg-2 mb-3 order-3">
            <div className="sideVideos Categories mt-2 borderRadius todayList p-0">
              <h5 className="text-center text-white text-uppercase border-bottom mb-0 my-2">
                Top Channel
              </h5>
              <div
                className="hideScrollBar"
                style={{ height: "82vh", overflow: "scroll" }}
              >
                {allchannelArray.map((val, index) => (
                  <div>
                    {val.ChannelDetailFromDb.position.includes("topchannel") ? (
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
              className="sideVideos Categories mt-2 borderRadius todayList p-0"
              style={{ overflow: "auto", height: "55rem" }}
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
                    {val.ChannelDetailFromDb.position.includes("explore") ? (
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
          <div className="col-12 col-sm-12 col-md-6 col-lg-8 mb-3 ">
            <Grid
              item
              container
              xs={12}
              sm={12}
              md={12}
              className="sideVideos todayList borderRadius mainDisplay"
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
                    {val.ChannelDetailFromDb.position.includes(
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
                    )}
                  </div>
                ))}
                <Item className="videoDesc transparent"></Item>
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
                    {val.ChannelDetailFromDb.position.includes("supermusic") ? (
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
                    )}
                  </div>
                ))}
                <Item className="videoDesc transparent"></Item>
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
                  videos.thumbnail !== "" ? (
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
              className="sideVideos Categories mt-2 borderRadius todayList p-0"
              style={{ height: "55rem" }}
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
                    {val.ChannelDetailFromDb.position.includes("trending") ? (
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
