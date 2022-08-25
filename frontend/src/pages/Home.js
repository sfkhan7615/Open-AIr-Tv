import React, { useState, useEffect } from "react";
import { Paper, Grid, styled } from "@mui/material";
import playBtn from "../asset/images/home/playBtn.png";
import todayTopList from "../asset/images/home/todayTopList.png";
import todayMixlist from "../asset/images/home/todayMixlist.png";
import ReactPlayer from "react-player";
import "../asset/css/index.css";
import { element } from "prop-types";

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
  // Suggestions Hide and Show
  // var getsuggestButton = document.getElementById('suggestButton');

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

  //  Set Style For Home Page(main)
  useEffect(() => {
    if (CloseMenu == true) {
      document.getElementsByClassName("dropDown")[0].classList.add("hidden");
    }
    document.body.style.backgroundRepeat = "repeat-y";
    document.body.style.height = "auto";
    document.getElementsByClassName(
      "css-1g7fu7m-MuiContainer-root"
    )[0].style.maxWidth = "1200px";
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

  const [Comedy, setComedy] = useState([]);
  const [Movies, setMovies] = useState([]);
  const [Sports, setSports] = useState([]);
  const [film_Animation, setFilm_Animation] = useState([]);
  const [autos_Vehicles, setAutos_Vehicles] = useState([]);
  const [pets_Animals, setPets_Animals] = useState([]);
  const [music, setMusic] = useState([]);
  const [short_Movies, setShort_Movies] = useState([]);
  const [travel_Events, setTravel_Events] = useState([]);
  const [gaming, setGaming] = useState([]);
  const [videoBlogging, setVideoblogging] = useState([]);
  const [people_Blogs, setPeople_Blogs] = useState([]);
  const [entertainment, setEntertainment] = useState([]);
  const [news_Politics, setNews_Politics] = useState([]);
  const [howto_Style, setHowto_Style] = useState([]);
  const [education, setEducation] = useState([]);
  const [science_Technology, setScience_Technology] = useState([]);
  const [nonprofits_Activism, setNonprofits_Activism] = useState([]);
  const [anime_and_Animation, setAnime_and_Animation] = useState([]);
  const [action_Adventure, setAction_Adventure] = useState([]);
  const [classics, setClassics] = useState([]);
  const [documentary, setDocumentary] = useState([]);
  const [drama, setDrama] = useState([]);
  const [family, setFamily] = useState([]);
  const [foreign, setForeign] = useState([]);
  const [horror, setHorror] = useState([]);
  const [thriller, setThriller] = useState([]);
  const [shorts, setShorts] = useState([]);
  const [shows, setShows] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [sci_fi_and_Fantasy, setSci_fi_and_Fantasy] = useState([]);
  useEffect(() => {
    //  Call All Playlist Data
    axios
      .get(process.env.REACT_APP_API_URL + "/playlist/getPlayListData")
      .then((res) => {
        SetPlaylist(res.data);
        // 1. Set top playlist using likes
        if (res.data.length != 0) {
          if (res.data[0].videos.length != 0) {
            setPlayUrl(res.data[0].videos[0]);
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

        // set Local Viode data
        // for(let index = 0; index < res.data.length; index++)
        // {
        //     for(let i=0;i<res.data[i].videos.length;i++)
        //     {
        //        if(res.data[index].videos[i].location)
        //        {
        //          if(res.data[index].videos[i].location!="null")
        //             console.log(res.data[index].videos[i].location)
        //        }
        //     }
        // }
      });
    axios
      .get(process.env.REACT_APP_API_URL + "/playlist/getVideoData", {
        headers: { Token: "sdsndsddbsbdjsfdbsfdJDSKDjldfsd" },
      })
      .then((res) => {
        // Set All Videos
        SetVideolist(res.data);
        // set categ....
        res.data.forEach((element, index) => {
          const Categories = res.data[index].category;
          if (Categories != null) {
            if (Categories == "Film & Animation")
              setFilm_Animation((film_Animation) => [
                ...film_Animation,
                element,
              ]);
            else if (Categories == "Autos & Vehicles")
              setAutos_Vehicles((autos_Vehicles) => [
                ...autos_Vehicles,
                element,
              ]);
            else if (Categories == "Pets & Animals")
              setPets_Animals((pets_Animals) => [...pets_Animals, element]);
            else if (Categories == "Music")
              setMusic((music) => [...music, element]);
            else if (Categories == "Sports")
              setSports((Sports) => [...Sports, element]);
            else if (Categories == "Short & Movies")
              setShort_Movies((short_Movies) => [...short_Movies, element]);
            else if (Categories == "Travel & Events")
              setTravel_Events((travel_Events) => [...travel_Events, element]);
            else if (Categories == "Gaming")
              setGaming((gaming) => [...gaming, element]);
            else if (Categories == "Videoblogging")
              setVideoblogging((videoblogging) => [...videoblogging, element]);
            else if (Categories == "People & Blogs")
              setPeople_Blogs((people_Blogs) => [...people_Blogs, element]);
            else if (Categories == "Comedy")
              setComedy((Comedy) => [...Comedy, element]);
            else if (Categories == "Entertainment")
              setEntertainment((entertainment) => [...entertainment, element]);
            else if (Categories == "News & Politics")
              setNews_Politics((news_Politics) => [...news_Politics, element]);
            else if (Categories == "Howto & Style")
              setHowto_Style((howto_Style) => [...howto_Style, element]);
            else if (Categories == "Education")
              setEducation((education) => [...education, element]);
            else if (Categories == "Science & Technology")
              setScience_Technology((science_Technology) => [
                ...science_Technology,
                element,
              ]);
            else if (Categories == "Nonprofits & Activism")
              setNonprofits_Activism((nonprofits_Activism) => [
                ...nonprofits_Activism,
                element,
              ]);
            else if (Categories == "Movies")
              setMovies((Movies) => [...Movies, element]);
            else if (Categories == "Anime/Animation")
              setAnime_and_Animation((anime_and_Animation) => [
                ...anime_and_Animation,
                element,
              ]);
            else if (Categories == "Action/Adventure")
              setAction_Adventure((action_Adventure) => [
                ...action_Adventure,
                element,
              ]);
            else if (Categories == "Classics")
              setClassics((classics) => [...classics, element]);
            else if (Categories == "Documentary")
              setDocumentary((documentary) => [...documentary, element]);
            else if (Categories == "Drama")
              setDrama((drama) => [...drama, element]);
            else if (Categories == "Family")
              setFamily((family) => [...family, element]);
            else if (Categories == "Foreign")
              setForeign((foreign) => [...foreign, element]);
            else if (Categories == "Horror")
              setHorror((horror) => [...horror, element]);
            else if (Categories == "Sci-Fi/Fantasy")
              setSci_fi_and_Fantasy((sci_fi_and_Fantasy) => [
                ...sci_fi_and_Fantasy,
                element,
              ]);
            else if (Categories == "Thriller")
              setThriller((thriller) => [...thriller, element]);
            else if (Categories == "Shorts")
              setShorts((shorts) => [...shorts, element]);
            else if (Categories == "Shows")
              setShows((shows) => [...shows, element]);
            else if (Categories == "Trailers")
              setTrailers((trailers) => [...trailers, element]);
          }
        });
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

  return (
    <>
      <main onClick={closeMenu}>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid
            sx={{ display: { xs: "none", sm: "block" } }}
            className="sideVideos Categories mt-2 borderRadius"
            item
            xs={6}
            sm={2}
            md={2}
          >
            <Item className="sideVideosHeading">Categories</Item>
            <div
              className="hideScrollBar"
              style={{ height: "31rem", overflow: "auto" }}
            >
              {Sports.map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail[0]} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {Comedy.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {Movies.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {film_Animation.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {autos_Vehicles.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {pets_Animals.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {music.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {short_Movies.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {travel_Events.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {gaming.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {videoBlogging.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {people_Blogs.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {entertainment.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {news_Politics.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {howto_Style.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {education.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {science_Technology.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {nonprofits_Activism.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {anime_and_Animation.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {action_Adventure.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {classics.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {documentary.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {drama.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {family.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {foreign.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {horror.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {thriller.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {shorts.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {shows.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {trailers.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {sci_fi_and_Fantasy.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
            </div>
          </Grid>
          {/* main Display */}
          <Grid
            style={{ margin: "2px 17px 0px 17px", maxWidth: "63.666%" }}
            item
            xs={6}
            sm={4}
            md={8}
            className="displayVideoBox my-2 borderRadius todayList"
          >
            <Item className="displayVideo py-2">
              <i className="bi bi-cloud-upload"></i>
              <div
                className="PlaylistPlayer__player-wrapper height-118"
                style={{ position: "relative", overflow: "hidden" }}
              >
                <ReactPlayer
                  url={PlayUrl.url ? PlayUrl.url : ""}
                  className="PlaylistPlayer__player"
                  width="100%"
                  height="100%"
                  playing
                  controls
                />
                {topPlaylistData.length > 0 ? (
                  <button
                    id="suggestButton"
                    onClick={() =>
                      showSuggetionVideos
                        ? setShowSuggetionVideos(false)
                        : setShowSuggetionVideos(true)
                    }
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "0",
                      width: "100px",
                      zIndex: "1",
                    }}
                  >
                    {showSuggetionVideos ? "Hide Video" : "Show Video"}
                  </button>
                ) : (
                  ""
                )}

                {showSuggetionVideos ? (
                  <div
                    className="suggestVideo"
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "-9px",
                      width: "100px",
                    }}
                  >
                    {topPlaylistData.slice(0, 10).map((val, index) =>
                      val.videos.length != 0 ? (
                        <div onClick={() => setPlayUrl(val.videos[0].url)}>
                          <img
                            src={val.videos[0].thumbnail}
                            style={{ maxWidth: "100%", cursor: "pointer" }}
                          />
                        </div>
                      ) : (
                        ""
                      )
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div style={{ background: "#004D73", height: "12.6%" }}>
                <div className="row">
                  <div className="col-md-6 p-0">
                    {/* <img src="http://190.92.153.226:5000/assets/images/LoginLogo.png" width="180" alt="" /> */}
                    {allData ? (
                      <img
                        id="proFileImage"
                        src={
                          "http://190.92.153.226:5000/assets/images/reserved/" +
                          allData[0].resimage
                        }
                        className="img-fluid"
                        alt=""
                        style={{
                          height: "65px",
                          marginLeft: "12px",
                          width: "97%",
                        }}
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
                      <marquee>{PlayUrl.title}</marquee> <br />
                      {PlayUrl.channel_name}
                      <br />
                      {PlayUrl.posted_date}
                    </div>
                  </div>

                  <div className="col col-md-2 p-0 d-flex">
                    <ul className="p-0" style={{ margin: "auto" }}>
                      <li style={{ display: "inline", margin: "0" }}>
                        <img
                          style={{ cursor: "pointer", width: "30%" }}
                          src={require(`../asset/images/logo.png`)}
                          className="img-fluid"
                          alt=""
                        />
                      </li>

                      <li style={{ display: "inline", margin: "-2px" }}>
                        <img
                          style={{ cursor: "pointer", width: "30%" }}
                          onClick={() => {
                            setPlayUrl(allVideolistData[videoIndex + 1]);
                            videoIndexx(videoIndex);
                          }}
                          src={require(`../asset/images/Button_play2.png`)}
                          className="img-fluid"
                          alt=""
                        />
                      </li>

                      <li style={{ display: "inline", margin: "0" }}>
                        <img
                          style={{ cursor: "pointer", width: "30%" }}
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
          {/* show on mobile */}
          <Grid
            sx={{ display: { xs: "block", sm: "none" } }}
            className="sideVideos Categories mt-2"
            item
            xs={6}
            sm={2}
            md={2}
          >
            <Item className="sideVideosHeading">Categories</Item>
            <div
              className="hideScrollBar"
              style={{ height: "31rem", overflow: "auto" }}
            >
              {Sports.map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail[0]} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {Comedy.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {Movies.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {film_Animation.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {autos_Vehicles.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {pets_Animals.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {music.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {short_Movies.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {travel_Events.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {gaming.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {videoBlogging.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {people_Blogs.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {entertainment.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {news_Politics.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {howto_Style.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {education.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {science_Technology.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {nonprofits_Activism.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {anime_and_Animation.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {action_Adventure.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {classics.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {documentary.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {drama.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {family.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {foreign.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {horror.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {thriller.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {shorts.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {shows.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {trailers.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
              {sci_fi_and_Fantasy.slice(0, 1).map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  style={{ cursor: "pointer" }}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.category}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">{val.category}</Item>
                </Grid>
              ))}
            </div>
          </Grid>
          {/* end show on mobile */}
          <Grid
            style={{ cursor: "pointer" }}
            className="sideVideos topPlaylists mt-2 borderRadius"
            item
            xs={6}
            sm={2}
            md={2}
          >
            <Item className="sideVideosHeading">Top playlists</Item>
            <div
              className="hideScrollBar"
              style={{ overflow: "auto", height: "31rem" }}
            >
              {topPlaylistData.slice(0, 10).map((val, index) =>
                val.videos.length != 0 ? (
                  <Grid
                    onClick={() => setPlayUrl(val.videos[0])}
                    className="videoItem"
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    key={index}
                  >
                    <Item className="aboutVideo transparent">
                      {" "}
                      <img className="playBtn" src={playBtn} alt="" />{" "}
                      {val.title}
                    </Item>
                    <Item className="videoImg transparent p-0">
                      <img src={val.videos[0].thumbnail} alt="" />
                    </Item>
                    <Item className="videoDesc transparent">{val.title}</Item>
                  </Grid>
                ) : (
                  ""
                )
              )}
            </div>
          </Grid>
        </Grid>
        {/* second */}
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }} className="my-3 ">
          <Grid
            style={{ cursor: "pointer" }}
            className="sideVideos Categories borderRadius"
            item
            xs={6}
            sm={2}
            md={2}
          >
            <Item className="sideVideosHeading">Broadcast</Item>
            <div
              className="hideScrollBar"
              style={{ overflow: "auto", height: "27rem" }}
            >
              {topPlaylistData.map((val, index) =>
                val.videos.length != 0 ? (
                  <Grid
                    onClick={() => setPlayUrl(val.videos[0])}
                    className="videoItem"
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    key={index}
                  >
                    <Item className="aboutVideo transparent">
                      <img className="playBtn" src={playBtn} alt="" />
                      {val.title}
                    </Item>
                    <Item className="videoImg transparent p-0">
                      <img
                        src={val.videos[0] ? val.videos[0].thumbnail : ""}
                        alt=""
                      />
                    </Item>
                    <Item className="videoDesc transparent">
                      {val.title.substring(0, 20)}...
                    </Item>
                  </Grid>
                ) : (
                  ""
                )
              )}
            </div>
            {/* {LocalPlayListData ? LocalPlayListData.slice(0, 3).map((val, index) => (
                <Grid onClick={() => setPlayUrl(val.videos[0].url)} className="videoItem" item xs={12} sm={12} md={12} key={index}>
                  <Item className="aboutVideo transparent"> <img className="playBtn" src={playBtn} alt="" /> {val.title}</Item>
                  <Item className="videoImg transparent p-0"><img src={val.videos[0].thumbnail} alt="" />{" "}</Item>
                  <Item className="videoDesc transparent">{val.title.substring(0, 20)}...</Item>
                </Grid>
              ))
              : LocalPlayListData.slice(3, 6).map((val, index) => (
                <Grid onClick={() => setPlayUrl(val.videos[0].url)} className="videoItem" item xs={12} sm={12} md={12} key={index}>
                  <Item className="aboutVideo transparent"><img className="playBtn" src={playBtn} alt="" />{val.title}</Item>
                  <Item className="videoImg transparent p-0"><img src={val.videos[0].thumbnail} alt="" />{" "}</Item>
                  <Item className="videoDesc transparent">{val.title.substring(0, 20)}...</Item>
                </Grid>
              ))} */}
            <Grid
              style={{ cursor: "pointer" }}
              className="videoItem"
              item
              xs={12}
              sm={12}
              md={12}
            >
              {/* <Item className="videoDesc transparent p-5">Space Reserved</Item> */}
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
              {/* <Item className="videoDesc transparent p-5">Space Reserved</Item> */}
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
          </Grid>
          <Grid
            style={{ maxWidth: "63.666%", margin: "2px 17px 0px 17px" }}
            item
            container
            xs={12}
            sm={12}
            md={8}
            className="sideVideos todayList borderRadius"
          >
            <Grid
              style={{ cursor: "pointer" }}
              className="videoItem"
              item
              xs={6}
              sm={12}
              md={6}
            >
              <Item className="aboutVideo transparent">
                <img className="playBtn" src={playBtn} alt="" />
                Today List{" "}
              </Item>
              <Item className="videoImg transparent p-0">
                <img src={todayTopList} alt="" />
              </Item>
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
              <Item className="aboutVideo transparent">
                <img className="playBtn" src={playBtn} alt="" />
                Music
              </Item>
              <Item className="videoImg transparent p-0">
                <img src={todayMixlist} alt="" />
              </Item>
              <Item className="videoDesc transparent"></Item>
            </Grid>
            {/* center divs */}
            {/* <Grid style={{ cursor: "pointer" }} item container xs={12} sm={12} md={12} className="moreVideos">
              {allPlaylistData.slice(0, 4).map((val, index) =>
                val.videos.slice(0, 4).map((videos, index) => (
                  <Grid onClick={() => setPlayUrl(videos.url)} className="videoItem" item xs={12} sm={12} md={3} key={index}>
                    <Item className="aboutVideo transparent">
                      {index == 0 ? (
                        <><img className="playBtn" src={playBtn} alt="" />{val.title.substring(0, 10)}</>
                      ) : (
                        <img className="playBtn" src={playBtn} alt="" style={{ visibility: "hidden" }} />
                      )}
                    </Item>
                    <Item className="videoImg transparent p-0"><img src={videos.thumbnail} alt="" /></Item>
                  </Grid>
                ))
              )}
            </Grid> */}
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
                    onClick={() => setPlayUrl(videos)}
                    className="videoItem"
                    item
                    xs={12}
                    sm={12}
                    md={3}
                    key={index}
                  >
                    <Item className="aboutVideo transparent">
                      {index == 0 ? (
                        <>
                          <img className="playBtn" src={playBtn} alt="" />
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
          <Grid
            style={{ cursor: "pointer" }}
            className="sideVideos topPlaylists borderRadius"
            item
            xs={6}
            sm={2}
            md={2}
          >
            <Item className="sideVideosHeading">Broadcast</Item>
            <div
              className="hideScrollBar"
              style={{ overflow: "auto", height: "27rem" }}
            >
              {allLiveVideolistData.map((val, index) => (
                <Grid
                  onClick={() => setPlayUrl(val)}
                  className="videoItem"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                >
                  <Item className="aboutVideo transparent">
                    <img className="playBtn" src={playBtn} alt="" />
                    {val.channel_name}
                  </Item>
                  <Item className="videoImg transparent p-0">
                    <img src={val.thumbnail} alt="" />
                  </Item>
                  <Item className="videoDesc transparent">
                    {val.title.substring(0, 20)}...
                  </Item>
                </Grid>
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
          </Grid>
        </Grid>
      </main>
    </>
  );
}

export default Home;
