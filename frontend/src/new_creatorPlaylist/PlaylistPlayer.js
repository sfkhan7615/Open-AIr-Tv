import { useState, useRef, useEffect } from "react";
import classnames from "classnames";
import ReactPlayer from "react-player";
import "./css/PlaylistPlayer.css";
import { toast } from "react-toastify";
import { ShareSocial } from "react-share-social";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "@mui/material/Skeleton";
import swal from "sweetalert";
import $ from "jquery";
import { NavLink, useNavigate } from "react-router-dom";

var moment = require("moment");
const axios = require("axios");
toast.configure();

export const PlaylistPlayer = ({ playlists }) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    // Featch All Data
    axios
      .get(process.env.REACT_APP_API_URL + "/user/getUserAlldata", {
        headers: { Token: token },
      })
      .then((response) => {
        response.data.forEach((element, index) => {
          if (
            element._id !=
            JSON.parse(sessionStorage.getItem("userDetails")).user_id
          ) {
            sessionStorage.clear();
            navigate("/logout");
          }
        });
      });
  }, []);
  // Auth
  const navigate = useNavigate();

  // Api Key
  const YoutubeApiKey = "AIzaSyDOlMF3B52Ssd0wFzEZO8vaxgCoSCY-0v0";
  // const YoutubeApiKey = "AIzaSyCLQyNNoRtwWCFCVnTaOd3wiVPen1-oFvs";
  // Style Sheet
  useEffect(() => {
    document.getElementsByClassName("main-container")[0].style.height = "100%";
    document.getElementsByClassName("header")[0].style.display = "flex";
    // document.getElementsByClassName("modal-backdrop")[0].style.zIndex = "-1";
    document.getElementsByClassName(
      "css-1g7fu7m-MuiContainer-root"
    )[0].style.maxWidth = "100%";
    document.getElementsByClassName(
      "css-1g7fu7m-MuiContainer-root"
    )[0].style.paddingTop = "0";
    document.body.style.height = "auto";
    document.getElementsByClassName("main-container")[0].style.height = "100%";
    document.getElementsByClassName("main-container")[0].style.width = "100%";
    document.getElementsByClassName("main-container")[0].style.paddingLeft =
      "0.75rem";
    document.getElementsByClassName("main-container")[0].style.paddingRight =
      "0.75rem";
    changePalylistData(0);
  }, []);
  // Video and Playlist Default Selected
  const [videoIndex, setVideoIndex] = useState(0);
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const currentPlaylist = playlists[playlistIndex]; // 0
  // const currentVideo = currentPlaylist.videos[videoIndex];
  // Loop Playlist
  const [loopPlayList, setLoopPlayList] = useState(false);
  // Video Ended
  const onEnded = () => {
    if (YoutubeTempPlaylist[videoIndex + 1]) {
      setVideoIndex(videoIndex + 1);
    } else if (playlists[playlistIndex + 1]) {
      if (!loopPlayList) {
        if (playlists[playlistIndex + 1].title == "Temp") {
          setPlaylistIndex(0);
          setVideoIndex(0);
          changePalylistData(0);
        } else {
          setPlaylistIndex(playlistIndex + 1);
          setVideoIndex(0);
          changePalylistData(playlistIndex + 1);
        }
      } else {
        setVideoIndex(0);
      }
    } else {
      setPlaylistIndex(0);
      setVideoIndex(0);
      changePalylistData(0);
    }
  };
  // Youtube Temp Data
  const [YoutubeTempPlaylist, setYoutubeTempPlaylist] = useState([]);

  const [intoplay, setIntroplay] = useState(false);
  const [intoPlayUrl, setIntoPlayUrl] = useState("");

  const changePalylistData = (ind) => {
    setYoutubePlay(false);
    if (playlists.length != 0) {
      setYoutubeTempPlaylist(playlists[ind].videos);
      if (playlists[ind].introVideo) {
        setYoutubePlay(true);
        setYoutubePlayUrl(
          require("../asset/introvideo/" + playlists[ind].introVideo)
        );
      }
    }
  };
  const onYoutubeVideoEndend = () => {
    setYoutubePlay(false);
  };

  // Update Runtime Time
  const [playListRunTime, setPlayListRunTime] = useState(0);
  useEffect(() => {
    var sec = 0;
    for (let i = 0; i < YoutubeTempPlaylist.length; i++) {
      sec = sec + parseInt(YoutubeTempPlaylist[i].duration);
    }
    setPlayListRunTime(sec);
  });

  //  Youtube Search Video using api
  const [searchKeyword, setSearchKeyword] = useState("");
  const [indexing, setIndexing] = useState(0);
  const [showSearchVideo, setshowSearchVideo] = useState(true);
  const [allYoutubeSearchVideoData, SetallYoutubeSearchVideoData] = useState(
    []
  );
  const searchYoutubeVideo = (e) => {
    e.preventDefault();
    if (searchKeyword == "") {
      alert("Please Enter Something");
    } else {
      setshowSearchVideo(false);
      if (searchKeyword.length > 1) {
        let catagrorys = [
          "Film & Animation",
          "Autos & Vehicles",
          "Music",
          "Pets & Animals",
          "Sports",
          "Short Movies",
          "Travel & Events",
          "Gaming",
          "Videoblogging",
          "People & Blogs",
          "Comedy",
          "Entertainment",
          "News & Politics",
          "Howto & Style",
          "Education",
          "Science & Technology",
          "Nonprofits & Activism",
          "Movies",
          "Anime/Animation",
          "Action/Adventure",
          "Classics",
          "Comedy",
          "Documentary",
          "Drama",
          "Family",
          "Foreign",
          "Horror",
          "Sci-Fi/Fantasy",
          "Thriller",
          "Shorts",
          "Shows",
          "Trailers",
        ];

        setYoutubeSearchLoader(true);

        var videosData = [];
        axios
          .get(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&q=` +
              searchKeyword +
              `&key=` +
              YoutubeApiKey
          )
          .then(async (videos) => {
            for (let i = 0; i < videos.data.items.length; i++) {
              await axios
                .get(
                  `https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatus%2CcontentDetails%2Cstatistics&id=` +
                    videos.data.items[i].id.videoId +
                    `&key=` +
                    YoutubeApiKey
                )
                .then(async (res) => {
                  if (res.data.items.length != 0)
                    await axios
                      .post(
                        process.env.REACT_APP_API_URL +
                          "/manageplaylist/findYoutubeValidater",
                        {
                          videoURL:
                            `https://www.youtube.com/embed/` +
                            videos.data.items[i].id.videoId,
                        }
                      )
                      .then((resNew) => {
                        if (resNew.data.status == "PLAYABLE") {
                          console.log(
                            videos.data.items[i].id.videoId +
                              " " +
                              resNew.data.status
                          );
                          videos.data.items[i].likes =
                            res.data.items[0].statistics.likeCount;
                          videos.data.items[i].views =
                            res.data.items[0].statistics.viewCount;
                          videos.data.items[i].category =
                            catagrorys[res.data.items[0].snippet.categoryId];
                          videos.data.items[i].tags =
                            res.data.items[0].snippet.tags;
                          videos.data.items[i].duration =
                            res.data.items[0].contentDetails.duration;

                          videosData.push(videos.data.items[i]);
                        }
                      });
                });
            }

            if (videosData.length > 0) {
              setYoutubeSearchLoader(false);
              // console.log("-------------", videosData.length);
              SetallYoutubeSearchVideoData(videosData);
            }

            /*
            for (let i = 0; i < videos.data.items.length; i++) {
              axios
                .get(
                  `https://www.googleapis.com/youtube/v3/videos?id=` +
                    videos.data.items[i].id.videoId +
                    `&part=status&key=` +
                    YoutubeApiKey
                )
                .then((res) => {
                  if (
                    res.data.items[0].status.embeddable == true &&
                    res.data.items[0].status.privacyStatus == "public"
                  ) {
                  }
                });
            }
			*/
          });
      }
    }
  };
  // console.log(allYoutubeSearchVideoData);
  // NEXT Youtube Video
  const [tempSearchKeyword, setTempSearchKeyword] = useState(""); // ps
  const [tempSearchKeywordNum, setTempSearchKeywordNum] = useState(0); // ps
  const nextyoutuberesults = (e) => {
    if (tempSearchKeyword == "") setTempSearchKeyword(searchKeyword);

    let num = tempSearchKeywordNum + 1; // ps
    setTempSearchKeywordNum(num); // ps
    if (tempSearchKeyword != "")
      // ps
      setSearchKeyword(tempSearchKeyword + num);
    // ps
    else setSearchKeyword(searchKeyword + 1);
    // alert(searchKeyword);
    searchYoutubeVideo(e);
  };

  // Previous Youtube Video

  const previousyoutuberesults = (e) => {
    // if (tempSearchKeyword == "") setTempSearchKeyword(searchKeyword);

    let num = searchKeyword - num;
    setTempSearchKeywordNum(num - 1);
    if (searchKeyword != "") setSearchKeyword(searchKeyword - num);
    else setSearchKeyword(searchKeyword - 1);
    searchYoutubeVideo(e);
    // alert(searchKeyword);
  };

  const setYoutubeDatainState = (
    title,
    video_url,
    views,
    likes,
    publishTime,
    duration,
    tags,
    channelTitle,
    channel_url,
    thumbnail,
    description,
    embeded_code,
    category,
    location_details
  ) => {
    let newListArray = {
      title: title,
      url: video_url,
      views: views,
      likes: likes,
      posted_date: publishTime,
      duration: duration,
      keywords: tags,
      channel_name: channelTitle,
      channel_url: channel_url,
      thumbnail: thumbnail,
      description: description,
      embeded_code: embeded_code,
      category: category,
      location: JSON.stringify(location_details),
      plays_at: null,
    };
    setYoutubeTempPlaylist((YoutubeTempPlaylist) => [
      ...YoutubeTempPlaylist,
      newListArray,
    ]);
    setTimeout(() => {
      var objDiv = document.getElementById("tempPlaylist");
      var postionDiv = objDiv.scrollHeight;
      objDiv.scrollTop = postionDiv;
    }, 500);
  };
  //  Add New Playlist
  const [newplaylistName, setnewplaylistName] = useState("");
  const addNewPlaylistSubmit = () => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    if (newplaylistName.length > 1 && !newplaylistName.includes("https://")) {
      var temp = 0;
      playlists.forEach((element) => {
        if (element.title == newplaylistName) temp++;
      });
      if (temp == 0) {
        const userData = JSON.parse(sessionStorage.getItem("userDetails"));
        axios
          .post(process.env.REACT_APP_API_URL + "/manageplaylist/add", {
            title: newplaylistName,
            opration: "add",
            user: userData.user_id,
          })
          .then((res) => {
            toast.success("playlist Updated Successfully", {});
            setnewplaylistName("");
          })
          .catch((err) => {
            if (
              err.response &&
              err.response.data &&
              err.response.data.errorMessage
            )
              toast.error(err.response.data.errorMessage, {});
          });
        changePalylistData(0);
        setYoutubeTempPlaylist([]);
      } else {
        toast.error("Playlist Alredy Exist !", {});
      }
    } else {
      toast.error("Please Enter Valid Name !");
      setnewplaylistName("");
    }
  };

  //  Up Down Manage
  const tempPlayListVideoTop = (ind) => {
    if (ind != 0) {
      let newListArray = YoutubeTempPlaylist;
      setYoutubeTempPlaylist([]);
      var element = newListArray[ind];
      newListArray.splice(ind, 1);
      newListArray.splice(ind - 1, 0, element);
      setYoutubeTempPlaylist(newListArray);
    }
  };
  const tempPlayListVideoDown = (ind) => {
    if (ind != YoutubeTempPlaylist.length - 1) {
      let newListArray = YoutubeTempPlaylist;
      setYoutubeTempPlaylist([]);
      var element = newListArray[ind];
      newListArray.splice(ind, 1);
      newListArray.splice(ind + 1, 0, element);
      setYoutubeTempPlaylist(newListArray);
    }
  };
  //  Temp PlayList Remove Btn
  const tempPlayListVideoRemove = (ind) => {
    let newListArray = YoutubeTempPlaylist;
    newListArray.splice(ind, 1);
    setYoutubeTempPlaylist(newListArray);
  };
  // play video
  const playYoutubeTempList = (ind) => {
    setVideoIndex(ind);
  };
  // delete
  const deleteCurrentPlaylist = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        if (playlists.length == 1)
          axios.post(process.env.REACT_APP_API_URL + "/manageplaylist/add", {
            title: "Temp",
            opration: "add",
          });
        if (currentPlaylist) {
          for (let index = 0; index < currentPlaylist.users.length; index++) {
            if (
              currentPlaylist.users[index]._id ==
              JSON.parse(sessionStorage.getItem("userDetails")).user_id
            ) {
              axios
                .post(
                  process.env.REACT_APP_API_URL + "/manageplaylist/delete",
                  { ids: currentPlaylist._id }
                )
                .then((res) => {
                  toast.success("Delete Successfully", {});
                  changePalylistData(0);
                })
                .catch((err) => {
                  if (
                    err.response &&
                    err.response.data &&
                    err.response.data.errorMessage
                  )
                    toast.error(err.response.data.errorMessage, {});
                });
            } else {
              setYoutubeTempPlaylist([]);
            }
          }
        }
      }
    });
  };
  //Get User Data

  //  Save Playlist
  const saveYoutubePalylist = () => {
    if (YoutubeTempPlaylist.length == 0) toast.error("Video Not Found !");
    else {
      // console.log(currentPlaylist);
      var userId = JSON.parse(sessionStorage.getItem("userDetails")).user_id;
      if (currentPlaylist.users[0]._id === userId) {
        axios
          .post(process.env.REACT_APP_API_URL + "/playlist/savePlayListData", {
            all_playlist_data: YoutubeTempPlaylist,
            playlist_id: currentPlaylist._id,
            user: "alreday",
            user_id: JSON.parse(sessionStorage.getItem("userDetails")).user_id,
            title: currentPlaylist.title,
          })
          .then((res) => {
            toast.success(res.data.title);
          })
          .catch((err) => {
            toast.error(err.data.error);
          });
      } else {
        axios
          .post(process.env.REACT_APP_API_URL + "/playlist/savePlayListData", {
            all_playlist_data: YoutubeTempPlaylist,
            playlist_id: currentPlaylist._id,
            user: "new",
            user_id: userId,
            title: currentPlaylist.title,
          })
          .then((res) => {
            toast.success(res.data.title);
          })
          .catch((err) => {
            toast.error(err.data.error);
          });
      }
    }
  };
  //  Set Embed Code
  const [PlayableStatus, setPlayableStatus] = useState("");
  const [PlayableList, setPlayableList] = useState([]);

  const [embedInput, setembedInput] = useState("");
  const addEmbedVideoInTeampPlayList = () => {
    var EmbadeCode = document.getElementById("EmbadeCodeInputId").value;
    if (EmbadeCode == "") {
      toast.error("Please Enter Video Embed Code");
      return;
    }
    if (EmbadeCode.includes("https://youtu.be/")) {
      var EmbadeCode = EmbadeCode.replace(
        "https://youtu.be/",
        "https://www.youtube.com/watch?v="
      );
    }
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator

    if (pattern.test(EmbadeCode)) {
      var videoId_is = "";
      let UslIs = EmbadeCode;
      let paramString = UslIs.split("?")[1];
      let queryString = new URLSearchParams(paramString);
      for (let pair of queryString.entries()) videoId_is = pair[1];
      // console.log(videoId_is);

      let catagrorys = [
        "Film & Animation",
        "Autos & Vehicles",
        "Music",
        "Pets & Animals",
        "Sports",
        "Short Movies",
        "Travel & Events",
        "Gaming",
        "Videoblogging",
        "People & Blogs",
        "Comedy",
        "Entertainment",
        "News & Politics",
        "Howto & Style",
        "Education",
        "Science & Technology",
        "Nonprofits & Activism",
        "Movies",
        "Anime/Animation",
        "Action/Adventure",
        "Classics",
        "Comedy",
        "Documentary",
        "Drama",
        "Family",
        "Foreign",
        "Horror",
        "Sci-Fi/Fantasy",
        "Thriller",
        "Shorts",
        "Shows",
        "Trailers",
      ];
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatus%2CcontentDetails%2Cstatistics&id=` +
            videoId_is +
            `&key=` +
            YoutubeApiKey
        )
        .then((res) => {
          axios
            .post(
              process.env.REACT_APP_API_URL +
                "/manageplaylist/findYoutubeValidater",
              { videoURL: process.env.YOUTUBE_URL + videoId_is }
            )
            .then((res) => {
              setPlayableStatus(res.data.status);
            });
          if (PlayableStatus == "PLAYABLE") {
            var newListArray = {
              title: res.data.items[0].snippet.title,
              url: `https://www.youtube.com/watch?v=` + res.data.items[0].id,
              views: res.data.items[0].statistics.viewCount,
              likes: res.data.items[0].statistics.likeCount,
              posted_date: res.data.items[0].snippet.publishedAt,
              duration: moment
                .duration(res.data.items[0].contentDetails.duration)
                .asSeconds(),
              keywords: JSON.stringify(res.data.items[0].snippet.tags),
              channel_name: res.data.items[0].snippet.channelTitle,
              channel_url:
                `https://www.youtube.com/channel/` +
                res.data.items[0].snippet.channelId,
              thumbnail: res.data.items[0].snippet.thumbnails.high.url,
              description: res.data.items[0].snippet.description,
              embeded_code: res.data.items[0].id,
              category: catagrorys[res.data.items[0].snippet.categoryId],
              location: null,
              plays_at: null,
            };
            setYoutubeTempPlaylist((YoutubeTempPlaylist) => [
              ...YoutubeTempPlaylist,
              newListArray,
            ]);
            setembedInput("");
          } else {
            toast.error("This Video is Not Playable due to security reason");
            setembedInput("");
          }
        });
    } else {
      setembedInput("");
      toast.error("Invalid Video Url");
    }
  };

  const [youtubePlay, setYoutubePlay] = useState(false);
  const [youtubePlayUrl, setYoutubePlayUrl] = useState("");

  // Close Menu

  const [CloseMenu, SetCloseMenu] = useState(false);
  const closeMenu = () => {
    SetCloseMenu(true);
  };
  useEffect(() => {
    if (CloseMenu == true) {
      document.getElementsByClassName("dropDown")[0].classList.add("hidden");
    }
    SetCloseMenu(false);
  });

  // End

  //  Vimeo api
  const [vimeoSearchLoader, setVimeoSearchLoader] = useState(false);
  const [youtubeSearchLoader, setYoutubeSearchLoader] = useState(false);
  const [searchVimeoKeyword, setSearchVimeoKeyword] = useState("");
  const [videoAllSearchData, setVideoAllSearchData] = useState([]);
  const searchVimeoVideo = (e) => {
    e.preventDefault();
    if (searchVimeoKeyword == "") {
      alert("Please Enter Search Value");
    } else {
      setVimeoSearchLoader(true);
      axios
        .get(
          "https://v1.nocodeapi.com/prakashsolanki/vimeo/qULUDodMlttbEuRW/search?q=" +
            searchVimeoKeyword +
            "&page=1&perPage=1"
        )
        .then((res) => {
          if (res.data.length != 0) setVimeoSearchLoader(false);
          setVideoAllSearchData(res.data.data);
        });
    }
  };
  // console.log(videoAllSearchData);

  // NEXT Vimeo Video
  const [tempVimeoSearchKeyword, setTempVimeoSearchKeyword] = useState(""); // ps
  const [tempVimeoSearchKeywordNum, setTempVimeoSearchKeywordNum] = useState(0); // ps
  const nextVimeoresults = (e) => {
    if (tempVimeoSearchKeyword == "")
      // ps
      setTempVimeoSearchKeyword(searchVimeoKeyword);

    let num = tempVimeoSearchKeywordNum + 1; // ps
    setTempVimeoSearchKeywordNum(num); // ps
    if (tempVimeoSearchKeyword != "")
      // ps
      setSearchVimeoKeyword(tempVimeoSearchKeyword + num);
    // ps
    else setSearchVimeoKeyword(searchVimeoKeyword + 1);
    // alert(searchKeyword);
    searchVimeoVideo(e);
  };

  // Previous Vimeo Video
  const previousVimeoresults = (e) => {
    if (tempVimeoSearchKeyword == "")
      // ps
      setTempVimeoSearchKeyword(searchVimeoKeyword);

    let num = tempVimeoSearchKeywordNum - 1; // ps
    setTempVimeoSearchKeywordNum(num); // ps
    if (tempVimeoSearchKeyword != "")
      // ps
      setSearchVimeoKeyword(tempVimeoSearchKeyword - num);
    // ps
    else setSearchVimeoKeyword(searchVimeoKeyword - 1);
    // alert(searchKeyword);
    searchVimeoVideo(e);
  };

  //  Randomize playlist
  const randomizePlaylist = () => {
    var randomArray = YoutubeTempPlaylist;
    let currentIndex = YoutubeTempPlaylist.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [randomArray[currentIndex], randomArray[randomIndex]] = [
        randomArray[randomIndex],
        randomArray[currentIndex],
      ];
    }
    setYoutubeTempPlaylist(randomArray);
  };
  const isLogin = sessionStorage.getItem("userDetails");
  // const navigate = useNavigate();
  const redirectNorLogin = () => {
    toast.error("Please Login First !");
    navigate("/login?from=as655dsw@3%g&ds");
  };
  const [newVideoVideo, setnewVideoVideo] = useState([]);
  const [uploadIntroLoader, setUploadInroLoader] = useState(false);

  const onFormSubmit = (e) => {
    e.preventDefault();
    setUploadInroLoader(true);
    const formdata = new FormData();
    formdata.append("avtarvid", newVideoVideo);
    axios
      .post(
        process.env.REACT_APP_API_URL +
          "/manageplaylist/upload?" +
          currentPlaylist._id,
        formdata,
        { user: JSON.parse(sessionStorage.getItem("userDetails")).user_id }
      )
      .then((res) => {
        if (res.data.length != 0) setUploadInroLoader(false);
        window.location.reload();
        toast.success("Video Added Successfully", {});
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.errorMessage
        ) {
          setUploadInroLoader(false);
          toast.error(err.response.data.errorMessage, {});
        }
      });
  };

  const saveThisPlaylistForthisUser = (data) => {
    if (
      JSON.parse(sessionStorage.getItem("userDetails")).user_id ===
      data.users[0]._id
    ) {
      // console.log("alreay exit");
    }
    // console.log(data);
  };

  const [socialMediaMenu, setSocialMediaMenu] = useState(false);

  const style = {
    background: "transparent",
    borderRadius: 3,
    border: 0,
    color: "white",
  };
  // copy Embed Code
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);
  const textAreaRef1 = useRef(null);
  function copyToClipboard(e) {
    textAreaRef.current.select();
    textAreaRef1.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopySuccess("Copied!");
  }
  const EmptyCopy = () => {
    setCopySuccess("");
  };

  const DeleteIntro = () => {
    const CurrentplayListId = currentPlaylist._id;
    const CurrentIntroLocation = currentPlaylist.introVideo;
    // console.log(CurrentplayListId);
    axios
      .post(process.env.REACT_APP_API_URL + "/manageplaylist/add", {
        opration: "deleteIntro",
        currentplaylistid: CurrentplayListId,
        fileLocation: CurrentIntroLocation,
      })
      .then((res) => {
        // try {
        //   fs.unlinkSync('../asset/introvideo/'+currentPlaylist.introVideo)
        //   console.log("file Removed");
        // } catch(err) {
        //   console.error(err)
        // }
        toast.success("Intro Removed", {});
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errorMessage)
          toast.error(err.response.data.errorMessage, {});
      });
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal1"
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
                    {" "}
                    <button className="btn btn-dark" onClick={copyToClipboard}>
                      Copy
                    </button>{" "}
                    {copySuccess}
                  </div>
                )}
                {currentPlaylist ? (
                  <form>
                    <textarea
                      className="embedTextArea"
                      ref={textAreaRef1}
                      value={
                        "<iframe width='560' height='315' src='http://190.92.153.226:3000/playlist?id=" +
                        currentPlaylist._id +
                        "'title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen style='position:absolute;top:0;left:0;width:100%;height:119%;'></iframe>"
                      }
                    />
                  </form>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={EmptyCopy}
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
      <div
        className="row todayList"
        style={{ borderBottom: "none", borderLeft: "none" }}
        onClick={closeMenu}
      >
        {/* FirsT Section  */}
        <div className="col-12 col-md-3  p-0">
          <div className="borderRadius todayList">
            <div className="row">
              <div className="col-6">
                <div className=" todayList" style={{ borderRadius: "2px" }}>
                  {isLogin != null ? (
                    <button
                      style={{ outline: "none !important", margin: "-6px" }}
                      data-bs-toggle="modal"
                      data-bs-target="#addPlaylist"
                      className="btn w-100 text-white rounded-0 border-0 d-flex p-0 "
                    >
                      <img
                        src={require("../asset/images/Button_morePlaylists2.png")}
                        className="img-fluid"
                        alt=""
                        style={{ width: "30px" }}
                      />
                      <span
                        className="m-auto astroSpace"
                        style={{
                          textTransform: "uppercase",
                          fontSize: "90%",
                        }}
                      >
                        NEW LIST
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={redirectNorLogin}
                      style={{ outline: "none !important", margin: "-6px" }}
                      className="btn w-100 text-white rounded-0 border-0 d-flex p-0 "
                    >
                      <img
                        src={require("../asset/images/Button_morePlaylists2.png")}
                        className="img-fluid"
                        alt=""
                        style={{ width: "30px" }}
                      />
                      <span
                        className="m-auto astroSpace"
                        style={{
                          textTransform: "uppercase",
                          fontSize: "90%",
                        }}
                      >
                        New List
                      </span>
                    </button>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className=" todayList" style={{ borderRadius: "2px" }}>
                  {isLogin !== null ? (
                    <button
                      style={{ outline: "none !important", margin: "-6px" }}
                      data-bs-toggle="modal"
                      data-bs-target="#pasteEmbedCode"
                      className="btn w-100 text-white rounded-0 border-0 d-flex p-0 "
                    >
                      <img
                        src={require("../asset/images/Button_sharePlaylist2.png")}
                        className="img-fluid"
                        alt=""
                        style={{ width: "30px", marginRight: "1px" }}
                      />
                      <span
                        className="m-auto astroSpace"
                        style={{
                          textTransform: "uppercase",
                          fontSize: "90%",
                        }}
                      >
                        PASTE URL
                      </span>
                    </button>
                  ) : (
                    <button
                      style={{ outline: "none !important", margin: "-6px" }}
                      onClick={redirectNorLogin}
                      className="btn w-100 text-white rounded-0 border-0 d-flex p-0 "
                    >
                      <img
                        src={require("../asset/images/Button_sharePlaylist2.png")}
                        className="img-fluid"
                        alt=""
                        style={{ width: "30px", marginRight: "1px" }}
                      />
                      <span
                        className="m-auto astroSpace"
                        style={{
                          textTransform: "uppercase",
                          fontSize: "90%",
                        }}
                      >
                        Paste URL
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <hr style={{ margin: "0.5rem", color: "#fff" }} />
            <div className="row ms-2 text-white">
              {currentPlaylist ? currentPlaylist.title + " playlist" : ""}
            </div>
            <hr style={{ margin: "0.5rem", color: "#fff" }} />

            <div className="row mt-2" style={{ margin: "0px -25px 0px -25px" }}>
              <div
                className="creator_PlaylistPlayer__menu playlistEdit"
                id="tempPlaylist"
              >
                {YoutubeTempPlaylist.length == 0 ? (
                  <img
                    src={require("../asset/images/empty.png")}
                    className="img-fluid m-0 p-0"
                    alt=""
                    style={{ width: "100%", height: "80%" }}
                  />
                ) : (
                  ""
                )}
                {YoutubeTempPlaylist.map((val, index) => {
                  return (
                    <div
                      key={index}
                      className="mainBox"
                      style={{ position: "relative", cursor: "pointer" }}
                    >
                      <div
                        className="creator_VideoBadge"
                        onClick={() => {
                          playYoutubeTempList(index);
                          setYoutubePlay(false);
                        }}
                      >
                        <div
                          className="creator_VideoBadge__logo"
                          style={{ backgroundImage: `url(${val.thumbnail})` }}
                        />
                        <div
                          className="creator_VideoBadge__info"
                          style={{ padding: "3px" }}
                        >
                          <div className="info">
                            <p
                              style={{
                                lineHeight: "15px",
                                fontSize: "10px",
                                margin: "2px",
                                color: "#fff",
                                width: "88%",
                              }}
                            >
                              {/* <l style={{fontSize:"12px"}}>{val.title.substring(0,10)}</l><br /><l>{val.description.substring(0,50)}...</l> */}
                              <l title={val.title} style={{ fontSize: "12px" }}>
                                {val.title.length <= 30 ? (
                                  val.title.substring(0, 30)
                                ) : (
                                  <marquee
                                    style={{ marginTop: "-340px" }}
                                    scrollamount={3}
                                  >
                                    {val.title}
                                  </marquee>
                                )}
                              </l>
                              <br />
                              <l title={val.description}>
                                {val.description.substring(0, 50)}...
                              </l>
                              <br />
                              {val.channel_name} -{" "}
                              {moment(val.publishTime)
                                .utc()
                                .format("MM/DD/YYYY")}
                              <br />
                              <img
                                src={require("../asset/images/Button_sharePlaylist2.png")}
                                className="img-fluid"
                                alt=""
                                style={{ width: "22px", cursor: "pointer" }}
                              />
                              {val.views > 999 && val.views < 1000000
                                ? (val.views / 1000).toFixed(1) + "K"
                                : val.views > 1000000
                                ? (val.views / 1000000).toFixed(1) + "M"
                                : val.views}
                              <img
                                src={require("../asset/images/ButtonNotLike.png")}
                                className="img-fluid"
                                alt=""
                                style={{ width: "22px", cursor: "pointer" }}
                              />
                              {val.likes > 999 && val.likes < 1000000
                                ? (val.likes / 1000).toFixed(1) + "K"
                                : val.likes > 1000000
                                ? (val.likes / 1000000).toFixed(1) + "M"
                                : val.likes}
                              <br />
                              {moment("2015-01-01")
                                .startOf("day")
                                .seconds(val.duration)
                                .format("H:mm:ss")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <ul
                        className="icons"
                        style={{
                          height: "100%",
                          position: "absolute",
                          top: "0",
                          right: "0",
                          listStyle: "none",
                        }}
                      >
                        <li onClick={() => tempPlayListVideoTop(index)}>
                          <img
                            src={require("../asset/images/Button_moveUp2.png")}
                            className="img-fluid"
                            style={{ width: "22px" }}
                          />
                        </li>
                        <li
                          onClick={() => {
                            playYoutubeTempList(index);
                            setYoutubePlay(false);
                          }}
                        >
                          <img
                            src={require("../asset/images/Button_play2.png")}
                            className="img-fluid"
                            alt=""
                            style={{ width: "22px" }}
                          />
                        </li>
                        <li onClick={() => tempPlayListVideoRemove(index)}>
                          <img
                            src={require("../asset/images/Button_subtract2.png")}
                            className="img-fluid"
                            alt=""
                            style={{ width: "22px" }}
                          />
                        </li>
                        <li onClick={() => tempPlayListVideoDown(index)}>
                          <img
                            src={require("../asset/images/Button_moveDown2.png")}
                            className="img-fluid"
                            alt=""
                            style={{ width: "22px" }}
                          />
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
            <hr style={{ margin: "0.4rem", color: "#fff" }} />
            <div className="row">
              <div className="col-4">
                <div className=" todayList buttonPadding">
                  {isLogin !== null ? (
                    <button
                      onClick={saveYoutubePalylist}
                      className="btn w-100  rounded-0 border-0 d-flex p-0"
                    >
                      <img
                        src={require("../asset/images/Button_new2.png")}
                        className="img-fluid"
                        alt=""
                        style={{ width: "28px" }}
                      />
                      <span
                        className="m-auto text-white astroSpace"
                        style={{
                          textTransform: "uppercase",
                          fontSize: "90%",
                        }}
                      >
                        Save
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={redirectNorLogin}
                      className="btn w-100  rounded-0 border-0 d-flex p-0"
                    >
                      <img
                        src={require("../asset/images/Button_new2.png")}
                        className="img-fluid"
                        alt=""
                        style={{ width: "28px" }}
                      />
                      <span
                        className="m-auto text-white astroSpace"
                        style={{
                          textTransform: "uppercase",
                          fontSize: "90%",
                        }}
                      >
                        Save
                      </span>
                    </button>
                  )}
                </div>
              </div>
              <div className="col-4 p-0">
                <div className=" todayList buttonPadding">
                  {isLogin !== null ? (
                    <button
                      onClick={deleteCurrentPlaylist}
                      className="btn w-100  rounded-0 border-0 d-flex p-0"
                    >
                      <img
                        src={require("../asset/images/Button_delete-removebg-preview.png")}
                        className="img-fluid"
                        alt=""
                        style={{ width: "28px" }}
                      />
                      <span
                        className="m-auto text-white astroSpace"
                        style={{
                          textTransform: "uppercase",
                          fontSize: "90%",
                        }}
                      >
                        Delete{" "}
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={redirectNorLogin}
                      className="btn w-100  rounded-0 border-0 d-flex p-0"
                    >
                      <img
                        src={require("../asset/images/Button_delete-removebg-preview.png")}
                        className="img-fluid"
                        alt=""
                        style={{ width: "28px" }}
                      />
                      <span
                        className="m-auto text-white astroSpace"
                        style={{
                          textTransform: "uppercase",
                          fontSize: "90%",
                        }}
                      >
                        Delete{" "}
                      </span>
                    </button>
                  )}
                </div>
              </div>
              <div className="col-4">
                <div className=" todayList buttonPadding">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#sharePlaylist"
                    onClick={() => {
                      {
                        socialMediaMenu
                          ? setSocialMediaMenu(false)
                          : setSocialMediaMenu(true);
                      }
                    }}
                    className="btn w-100  rounded-0 border-0 d-flex p-0"
                  >
                    <img
                      src={require("../asset/images/Button_social2.png")}
                      className="img-fluid"
                      alt=""
                      style={{ width: "28px" }}
                    />
                    <span
                      className="m-auto text-white astroSpace"
                      style={{
                        textTransform: "uppercase",
                        fontSize: "90%",
                      }}
                    >
                      Share{" "}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End First Section */}

        {/* Second Section */}

        <div className="col-12 col-md-6">
          <div className="borderRadius todayList">
            <div className="creator_PlaylistPlayer__player-wrapper">
              {youtubePlay ? (
                <ReactPlayer
                  url={youtubePlayUrl}
                  className="creator_PlaylistPlayer__player"
                  width="100%"
                  height="100%"
                  onEnded={onYoutubeVideoEndend}
                  playing
                  controls
                />
              ) : YoutubeTempPlaylist.length == 0 ? (
                <div className="playerWrapperEmpty">
                  <img
                    src={require("../asset/images/empty.png")}
                    className="img-fluid"
                    alt=""
                  />
                </div>
              ) : (
                <ReactPlayer
                  url={YoutubeTempPlaylist[videoIndex].url}
                  className="creator_PlaylistPlayer__player"
                  width="100%"
                  height="100%"
                  onEnded={onEnded}
                  playing
                  controls
                />
              )}
            </div>
            <div className="row my-3">
              <div className="col-4 my-2">
                <div className="todayList  buttonPadding">
                  {allYoutubeSearchVideoData.length != 0 ? (
                    <button
                      onClick={() => {
                        {
                          if (searchKeyword !== "") {
                            setYoutubePlay(true);

                            setYoutubePlayUrl(
                              "https://www.youtube.com/watch?v=" +
                                allYoutubeSearchVideoData[videoIndex - 1].id
                                  .videoId
                            );
                            setVideoIndex(videoIndex - 1);
                            setYoutubePlay(true);
                            setYoutubePlayUrl(
                              videoAllSearchData[videoIndex - 1].link
                            );
                            setYoutubePlay(true);
                            setYoutubePlayUrl(
                              videoAllSearchData[videoIndex - 1].link
                            );
                            setVideoIndex(videoIndex - 1);
                          }
                        }
                      }}
                      className="btn w-100  rounded-0 border-0 d-flex p-0"
                    >
                      <img
                        src={require("../asset/images/ButtonNext-removebg-preview--.png")}
                        className="img-fluid"
                        alt=""
                        style={{ width: "35px" }}
                      />
                      <span
                        className="m-auto astroSpace"
                        style={{
                          textTransform: "uppercase",
                          fontSize: "90%",
                          color: "white",
                        }}
                      >
                        BACK
                      </span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="btn w-100  rounded-0 border-0 d-flex p-0"
                    >
                      <img
                        src={require("../asset/images/ButtonNext-removebg-preview--.png")}
                        className="img-fluid"
                        alt=""
                        style={{ width: "35px" }}
                      />
                      <span
                        className="m-auto astroSpace"
                        style={{
                          textTransform: "uppercase",
                          fontSize: "90%",
                          color: "white",
                        }}
                      >
                        BACK
                      </span>
                    </button>
                  )}
                </div>
              </div>
              {videoAllSearchData ? (
                <div
                  onClick={() => {
                    setYoutubeDatainState(
                      videoAllSearchData[videoIndex].name,
                      videoAllSearchData[videoIndex].link,
                      null,
                      videoAllSearchData[videoIndex].metadata.connections.likes
                        .total,
                      videoAllSearchData[videoIndex].created_time,
                      videoAllSearchData[videoIndex].duration,
                      null,
                      videoAllSearchData[videoIndex].user.name,
                      videoAllSearchData[videoIndex].user.link,
                      videoAllSearchData[videoIndex].pictures.base_link,
                      videoAllSearchData[videoIndex].description,
                      videoAllSearchData[videoIndex].embed.html,
                      videoAllSearchData[videoIndex].categories.length != 0
                        ? videoAllSearchData[videoIndex].categories[0].name
                        : null,
                      videoAllSearchData[videoIndex].user.location_details
                    );
                  }}
                  className="col-4 my-2 addListButton"
                >
                  <div className="todayList  buttonPadding">
                    {searchKeyword !== "" ? (
                      <button
                        onClick={() => {
                          setYoutubeDatainState(
                            allYoutubeSearchVideoData[videoIndex].snippet.title,
                            "https://www.youtube.com/watch?v=" +
                              allYoutubeSearchVideoData[videoIndex].id.videoId,
                            allYoutubeSearchVideoData[videoIndex].views,
                            allYoutubeSearchVideoData[videoIndex].likes,
                            allYoutubeSearchVideoData[videoIndex].snippet
                              .publishTime,
                            moment
                              .duration(
                                allYoutubeSearchVideoData[videoIndex].duration
                              )
                              .asSeconds(),
                            (allYoutubeSearchVideoData[videoIndex].tags = null),
                            allYoutubeSearchVideoData[videoIndex].snippet
                              .channelTitle,
                            "https://www.youtube.com/channel/" +
                              allYoutubeSearchVideoData[videoIndex].snippet
                                .channelId,
                            allYoutubeSearchVideoData[videoIndex].snippet
                              .thumbnails.high.url,
                            allYoutubeSearchVideoData[videoIndex].snippet
                              .description,
                            '<iframe width="560" height="315" src="https://www.youtube.com/embed/' +
                              allYoutubeSearchVideoData[videoIndex].id.videoId +
                              '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                            allYoutubeSearchVideoData[videoIndex].category,
                            null
                          );
                        }}
                        className="btn w-100  rounded-0 border-0 d-flex p-0"
                      >
                        <img
                          src={require("../asset/images/Button_Add2.png")}
                          className="img-fluid"
                          alt=""
                          style={{
                            width: "35px",
                            marginRight: "5px",
                          }}
                        />
                        <span
                          className="m-auto astroSpace"
                          style={{
                            textTransform: "uppercase",
                            fontSize: "90%",
                            color: "white",
                          }}
                        >
                          <strong>ADD</strong>
                        </span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="btn w-100  rounded-0 border-0 d-flex p-0"
                      >
                        <img
                          src={require("../asset/images/Button_Add2.png")}
                          className="img-fluid"
                          alt=""
                          style={{
                            width: "35px",
                            marginRight: "5px",
                          }}
                        />
                        <span
                          className="m-auto astroSpace"
                          style={{
                            textTransform: "uppercase",
                            fontSize: "90%",
                            color: "white",
                          }}
                        >
                          <strong>ADD</strong>
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}

              <div
                onClick={() => {
                  if (searchKeyword !== "") {
                    setYoutubePlay(true);
                    setYoutubePlayUrl(videoAllSearchData[videoIndex + 1].link);
                    setVideoIndex(videoIndex + 1);
                  }
                }}
                className="col-4 my-2 addListButton"
              >
                <div className="todayList  buttonPadding">
                  {searchKeyword !== "" ? (
                    <button
                      onClick={() => {
                        {
                          setYoutubePlay(true);

                          setYoutubePlayUrl(
                            "https://www.youtube.com/watch?v=" +
                              allYoutubeSearchVideoData[videoIndex + 1].id
                                .videoId
                          );
                          setVideoIndex(videoIndex + 1);
                          setYoutubePlay(true);
                          setYoutubePlayUrl(
                            videoAllSearchData[videoIndex + 1].link
                          );
                          setYoutubePlay(true);
                          setYoutubePlayUrl(
                            videoAllSearchData[videoIndex + 1].link
                          );
                          setVideoIndex(videoIndex + 1);
                        }
                      }}
                      className="btn w-100  rounded-0 border-0 d-flex p-0"
                    >
                      <img
                        src={require("../asset/images/ButtonNext.png")}
                        className="img-fluid"
                        alt=""
                        style={{
                          width: "35px",
                          marginRight: "5px",
                        }}
                      />
                      <span
                        className="m-auto astroSpace"
                        style={{
                          textTransform: "uppercase",
                          fontSize: "90%",
                          color: "white",
                        }}
                      >
                        <strong>NEXT</strong>
                      </span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="btn w-100  rounded-0 border-0 d-flex p-0"
                    >
                      <img
                        src={require("../asset/images/ButtonNext.png")}
                        className="img-fluid"
                        alt=""
                        style={{
                          width: "35px",
                          marginRight: "5px",
                        }}
                      />
                      <span
                        className="m-auto astroSpace"
                        style={{
                          textTransform: "uppercase",
                          fontSize: "90%",
                          color: "white",
                        }}
                      >
                        <strong>NEXT</strong>
                      </span>
                    </button>
                  )}
                </div>
              </div>

              <div className="col-4">
                <div className="todayList  buttonPadding">
                  <button
                    onClick={() => {
                      loopPlayList
                        ? setLoopPlayList(false)
                        : setLoopPlayList(true);
                    }}
                    className="btn w-100  rounded-0 border-0 d-flex p-0"
                  >
                    <img
                      src={require("../asset/images/Button_Loop2.png")}
                      className="img-fluid"
                      alt=""
                      style={{ width: "35px" }}
                    />
                    <span
                      className="m-auto astroSpace"
                      style={{
                        textTransform: "uppercase",
                        fontSize: "90%",
                        color: "white",
                      }}
                    >
                      {loopPlayList ? "Unloop Playlist" : "Loop Playlist"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="col-4">
                <div className="todayList  buttonPadding">
                  <button className="btn w-100  rounded-0 border-0 d-flex p-1">
                    <img
                      src={require("../asset/images/ButtonPlaylistLength2.png")}
                      className="img-fluid"
                      alt=""
                      style={{ width: "27px" }}
                    />
                    <span
                      className="m-auto astroSpace"
                      style={{
                        textTransform: "uppercase",
                        fontSize: "90%",
                        color: "white",
                      }}
                    >
                      {moment("2015-01-01")
                        .startOf("day")
                        .seconds(playListRunTime)
                        .format("H:mm:ss")}
                    </span>
                  </button>
                </div>
              </div>

              <div className="col-4">
                <div className="todayList  buttonPadding">
                  <button
                    onClick={randomizePlaylist}
                    className="btn w-100  rounded-0 border-0 d-flex p-1"
                  >
                    <img
                      src={require("../asset/images/Button_mix.png")}
                      className="img-fluid"
                      alt=""
                      style={{ width: "27px" }}
                    />
                    <span
                      className="m-auto astroSpace"
                      style={{
                        textTransform: "uppercase",
                        fontSize: "90%",
                        color: "white",
                      }}
                    >
                      SUFFLE
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*End Second Section */}

        {/* Third Section */}

        <div className="col-12 col-md-3 p-0">
          <div className="borderRadius todayList">
            <div className="row">
              <div className="col-12">
                <div className="todayList  buttonPadding">
                  <form
                    onSubmit={(e) => searchYoutubeVideo(e)}
                    className="d-flex"
                  >
                    <img
                      onClick={(e) => searchYoutubeVideo(e)}
                      src={require("../asset/images/ButtonSearch2.png")}
                      className="img-fluid"
                      alt=""
                      style={{ width: "32px", cursor: "pointer" }}
                    />
                    <input
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      type="text"
                      placeholder="Search Youtube"
                      style={{
                        outline: "none",
                        background: "transparent",
                        color: "white",
                        border: "transparent",
                      }}
                    />
                  </form>
                </div>
              </div>
            </div>
            <hr style={{ margin: "0.5rem", color: "#fff" }} />
            <div className="row mt-2" style={{ margin: "0px -25px 0px -25px" }}>
              <div
                className="creator_PlaylistPlayer__menu userUploadVideo"
                style={{ height: "29rem" }}
              >
                {youtubeSearchLoader ? (
                  <div className="main_loader_box">
                    <div className="loader">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                ) : showSearchVideo ? (
                  <VideoLoader />
                ) : (
                  allYoutubeSearchVideoData.map((video, index) => (
                    <div
                      key={index}
                      className="mainBox"
                      style={{ position: "relative" }}
                    >
                      <div className="creator_VideoBadge">
                        <div
                          className="creator_VideoBadge__logo"
                          style={{
                            backgroundImage: `url(${video.snippet.thumbnails.default.url})`,
                          }}
                        />
                        <div
                          className="creator_VideoBadge__info"
                          style={{ padding: "3px" }}
                        >
                          <div className="info">
                            <p
                              style={{
                                lineHeight: "15px",
                                fontSize: "11px",
                                margin: "2px",
                                color: "#fff",
                              }}
                            >
                              <l
                                style={{ fontSize: "12px" }}
                                title={video.snippet.title}
                              >
                                {video.snippet.title.length <= 30 ? (
                                  video.snippet.title.substring(0, 30)
                                ) : (
                                  <marquee
                                    style={{ marginTop: "-340px" }}
                                    scrollamount={3}
                                  >
                                    {video.snippet.title}
                                  </marquee>
                                )}
                              </l>
                              <br />
                              <l title={video.snippet.description}>
                                {video.snippet.description.substring(0, 25)}...
                              </l>
                              <br />
                              {video.snippet.channelTitle} <br />
                              {moment(video.snippet.publishTime)
                                .utc()
                                .format("MM/DD/YYYY")}
                              <br />
                              <img
                                src={require("../asset/images/Button_sharePlaylist2.png")}
                                className="img-fluid"
                                alt=""
                                style={{ width: "22px", cursor: "pointer" }}
                              />
                              {video.views > 999 && video.views < 1000000
                                ? (video.views / 1000).toFixed(1) + "K"
                                : video.views > 1000000
                                ? (video.views / 1000000).toFixed(1) + "M"
                                : video.views}
                              <img
                                src={require("../asset/images/ButtonNotLike.png")}
                                className="img-fluid"
                                alt=""
                                style={{ width: "22px", cursor: "pointer" }}
                              />
                              {video.likes > 999 && video.likes < 1000000
                                ? (video.likes / 1000).toFixed(1) + "K"
                                : video.likes > 1000000
                                ? (video.likes / 1000000).toFixed(1) + "M"
                                : video.likes}
                              <br />
                              {moment("2022-01-01")
                                .startOf("day")
                                .seconds(
                                  moment.duration(video.duration).asSeconds()
                                )
                                .format("H:mm:ss")}
                            </p>
                          </div>
                        </div>
                      </div>
                      <ul
                        className="icons"
                        style={{
                          height: "100%",
                          position: "absolute",
                          top: "30%",
                          left: "-30px",
                          listStyle: "none",
                        }}
                      >
                        <li
                          onClick={() =>
                            setYoutubeDatainState(
                              video.snippet.title,
                              "https://www.youtube.com/watch?v=" +
                                video.id.videoId,
                              video.views,
                              video.likes,
                              video.snippet.publishTime,
                              moment.duration(video.duration).asSeconds(),
                              (video.tags = null),
                              video.snippet.channelTitle,
                              "https://www.youtube.com/channel/" +
                                video.snippet.channelId,
                              video.snippet.thumbnails.high.url,
                              video.snippet.description,
                              '<iframe width="560" height="315" src="https://www.youtube.com/embed/' +
                                video.id.videoId +
                                '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                              video.category,
                              null
                            )
                          }
                        >
                          <img
                            src={require("../asset/images/Button_Add2.png")}
                            className="img-fluid"
                            alt=""
                            style={{ width: "22px", cursor: "pointer" }}
                          />
                        </li>
                        <li
                          onClick={() => {
                            setYoutubePlay(true);
                            setVideoIndex(videoIndex);
                            setYoutubePlayUrl(
                              "https://www.youtube.com/watch?v=" +
                                video.id.videoId
                            );
                          }}
                        >
                          <img
                            src={require("../asset/images/Button_play2.png")}
                            className="img-fluid"
                            alt=""
                            style={{ width: "22px", cursor: "pointer" }}
                          />
                        </li>
                      </ul>
                    </div>
                  ))
                )}
              </div>
            </div>
            <hr style={{ margin: "0.4rem", color: "#fff" }} />
            <div className="row">
              <div className="col-5">
                <div className=" todayList buttonPadding">
                  <button
                    onClick={nextyoutuberesults}
                    // onClick={previousyoutuberesults}
                    className="btn w-100  rounded-0 border-0 d-flex p-0"
                  >
                    <img
                      src={require("../asset/images/Button_moveUp2-removebg-preview-1.png")}
                      className="img-fluid"
                      alt=""
                      style={{ width: "28px" }}
                    />
                    <span
                      className="m-auto text-white astroSpace"
                      style={{
                        textTransform: "uppercase",
                        fontSize: "90%",
                      }}
                    >
                      PREVIOUS
                    </span>
                  </button>
                </div>
              </div>
              <div className="col-3 p-0"></div>
              <div className="col-4">
                <div className=" todayList buttonPadding">
                  <button
                    onClick={nextyoutuberesults}
                    className="btn w-100  rounded-0 border-0 d-flex p-0"
                  >
                    <span
                      className="m-auto text-white astroSpace"
                      style={{
                        textTransform: "uppercase",
                        fontSize: "90%",
                      }}
                    >
                      NEXT
                    </span>
                    <img
                      src={require("../asset/images/Button_moveUp2-removebg-preview-2.png")}
                      className="img-fluid"
                      alt=""
                      style={{ width: "28px" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* End Third Section */}

        {/* Add New Playlist */}
        <div
          className="modal fade"
          id="addPlaylist"
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
                  Select Playlist
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form
                  id="NewsavePlayList"
                  onSubmit={(e) => {
                    e.preventDefault();
                    addNewPlaylistSubmit();
                  }}
                  className="row g-3"
                >
                  <div className="col-12">
                    <label className="form-label">Title</label>
                    <div className="input-group" id="show_hide_password">
                      <input
                        onChange={(e) => setnewplaylistName(e.target.value)}
                        value={newplaylistName}
                        type="text"
                        className="form-control border-end-0"
                        id="inputChoosePassword"
                        placeholder="Enter Playlist Title"
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      data-bs-dismiss="modal"
                      type="submit"
                      className="btn btn-primary"
                    >
                      Add Playlist
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Upload Video */}
        <div
          className="modal fade"
          id="uploadVideo"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title " id="staticBackdropLabel">
                  Intro Video
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => onFormSubmit(e)}>
                  <div className="col-12">
                    <label className="form-label">Choose Video</label>
                    <div className="input-group" id="show_hide_password">
                      <input
                        onChange={(e) => setnewVideoVideo(e.target.files[0])}
                        type="file"
                        name="myImage"
                        className=""
                        accept="video/*"
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      id="dismissModel"
                      data-bs-dismiss="modal"
                      type="submit"
                      className="btn btn-primary"
                    >
                      Upload
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Please Login */}
        <div
          className="modal fade"
          id="LoginModal"
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
                  Warning
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <h3>Please Login First !! </h3>
              </div>
              <div className="modal-footer">
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
        {/* Add Embed Code */}
        <div
          className="modal fade"
          id="pasteEmbedCode"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Add Video Embed Code
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
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addEmbedVideoInTeampPlayList();
                  }}
                >
                  <div className="form-group">
                    <label>Embed Video</label>
                    <input
                      id="EmbadeCodeInputId"
                      type="text"
                      className="form-control"
                      aria-describedby="emailHelp"
                      placeholder="Enter Video Embed Code"
                      onChange={(e) => setembedInput(e.target.value)}
                      value={embedInput}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  onClick={EmptyCopy}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>

                <button
                  data-bs-dismiss="modal"
                  onClick={addEmbedVideoInTeampPlayList}
                  type="button"
                  className="btn btn-primary"
                >
                  Add Video
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Share Playlist */}
        {/* Add Embed Code */}
        <div
          className="modal fade"
          id="sharePlaylist"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Share
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
                <div className="row">
                  <div className="col-9">
                    <ul
                      style={{
                        width: "70%",
                        height: "70px",
                        padding: "0 18px",
                      }}
                    >
                      {currentPlaylist ? (
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
                          ]}
                        />
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>
                  <div className="col-2">
                    <button
                      data-bs-dismiss="modal"
                      style={{ marginTop: "27px", cursor: "pointer" }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal1"
                      className="btn btn-primary"
                      onClick={EmptyCopy}
                    >
                      Embed
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div>
                  {currentPlaylist ? (
                    <form>
                      <div className="row">
                        <div className="col-8">
                          <input
                            style={{ width: "100%" }}
                            className="m-2"
                            ref={textAreaRef}
                            value={
                              "http://190.92.153.226:3000/playlist?id=" +
                              currentPlaylist._id
                            }
                          />
                        </div>
                        <div className="col-4">
                          {document.queryCommandSupported("copy") && (
                            <div>
                              {" "}
                              <button
                                type="button"
                                style={{ height: "30px", paddingTop: "2px" }}
                                className="btn btn-dark m-2"
                                onClick={copyToClipboard}
                              >
                                Copy
                              </button>{" "}
                              {copySuccess}
                            </div>
                          )}
                        </div>
                      </div>
                    </form>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row todayList"
        style={{ borderTop: "none", borderLeft: "none" }}
      >
        <div className="col-12 col-md-3 p-0">
          <div className="todayList borderRadius">
            <div className="row">
              <div className=" todayList" style={{ borderRadius: "2px" }}>
                <button
                  style={{ outline: "none !important", margin: "-6px" }}
                  className="btn w-100 text-white rounded-0 border-0 d-flex p-0 "
                >
                  <img
                    src={require("../asset/images/Button_morePlaylists2.png")}
                    className="img-fluid"
                    alt=""
                    style={{ width: "30px" }}
                  />
                  <span
                    className="m-2 astroSpace"
                    style={{
                      textTransform: "uppercase",
                      fontSize: "90%",
                    }}
                  >
                    User Playlists
                  </span>
                </button>
              </div>
              <div className="creator_PlaylistPlayer__playlists">
                <hr style={{ margin: "0.5rem", color: "#fff" }} />
                {playlists.length == 0 ||
                (playlists[0].title == "Temp" && playlists.length == 1) ? (
                  <img
                    src={require("../asset/images/empty.png")}
                    className="img-fluid m-0 p-0"
                    alt=""
                    style={{ width: "100%", height: "80%" }}
                  />
                ) : (
                  playlists.map((playlist, index) =>
                    playlist.title != "Temp" && playlist.videos.length != 0 ? (
                      <div
                        key={index}
                        className="playlist_main_box mt-3"
                        style={{ position: "relative", margin: "0px -15px" }}
                      >
                        <PlaylistButton
                          playlist={playlist}
                          onClick={() => {
                            setPlaylistIndex(index);
                            setVideoIndex(0);
                            changePalylistData(index);
                          }}
                          active={index === playlistIndex}
                        />
                        <ul
                          className="icons"
                          style={{
                            height: "100%",
                            position: "absolute",
                            top: "25%",
                            left: "-28px",
                            listStyle: "none",
                          }}
                        >
                          <li
                            onClick={() => {
                              setPlaylistIndex(index);
                              changePalylistData(index);
                            }}
                          >
                            <img
                              src={require("../asset/images/Button_play2.png")}
                              className="img-fluid"
                              alt=""
                              style={{ width: "22px" }}
                            />
                          </li>
                          <li
                            onClick={() => {
                              saveThisPlaylistForthisUser(playlist);
                            }}
                          >
                            {/* <img
                            src={require("../asset/images/Button_social2.png")}
                            className="img-fluid"
                            alt=""
                            style={{ width: "22px" }}
                          /> */}
                          </li>
                        </ul>
                      </div>
                    ) : (
                      ""
                    )
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="todayList borderRadius">
            {currentPlaylist ? (
              JSON.parse(sessionStorage.getItem("userDetails")) != null &&
              currentPlaylist.users[0] != null &&
              JSON.parse(sessionStorage.getItem("userDetails")).user_id ==
                currentPlaylist.users[0]._id ? (
                <div className="">
                  <div className="row">
                    <div className="col-4">
                      <div className="todayList  buttonPadding">
                        {isLogin != null ? (
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#uploadVideo"
                            className="btn w-100  rounded-0 border-0 d-flex p-0"
                          >
                            <img
                              src={require("../asset/images/Button_uploadVideo2.png")}
                              className="img-fluid"
                              alt=""
                              style={{ width: "35px" }}
                            />
                            <span
                              className="m-auto astroSpace"
                              style={{
                                textTransform: "uppercase",
                                fontSize: "90%",
                                color: "white",
                              }}
                            >
                              {currentPlaylist.introVideo
                                ? "USER MEDIA"
                                : "USER MEDIA"}
                            </span>
                          </button>
                        ) : (
                          <button
                            onClick={redirectNorLogin}
                            className="btn w-100 btn-light rounded-0 border-0 d-flex p-0"
                          >
                            <img
                              src={require("../asset/images/Button_uploadVideo2.png")}
                              className="img-fluid"
                              alt=""
                              style={{ width: "35px" }}
                            />
                            <span
                              className="m-auto astroSpace"
                              style={{
                                textTransform: "uppercase",
                                fontSize: "90%",
                                color: "white",
                              }}
                            >
                              {currentPlaylist.introVideo
                                ? "USER MEDIA"
                                : "USER MEDIA"}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="todayList  buttonPadding">
                        <button
                          onClick={randomizePlaylist}
                          className="btn w-100  rounded-0 border-0 d-flex p-1"
                        >
                          <img
                            src={require("../asset/images/Button_mix.png")}
                            className="img-fluid"
                            alt=""
                            style={{ width: "27px" }}
                          />
                          <span
                            className="m-auto astroSpace"
                            style={{
                              textTransform: "uppercase",
                              fontSize: "90%",
                              color: "white",
                            }}
                          >
                            ADS/STATS
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="todayList  buttonPadding">
                        <button
                          onClick={randomizePlaylist}
                          className="btn w-100  rounded-0 border-0 d-flex p-1"
                        >
                          <img
                            src={require("../asset/images/Button_mix.png")}
                            className="img-fluid"
                            alt=""
                            style={{ width: "27px" }}
                          />
                          <span
                            className="m-auto astroSpace"
                            style={{
                              textTransform: "uppercase",
                              fontSize: "90%",
                              color: "white",
                            }}
                          >
                            MARKETPLACE
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr style={{ margin: "0.5rem", color: "#fff" }} />
                  {uploadIntroLoader ? (
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
                  {isLogin == null ? (
                    ""
                  ) : (
                    <div>
                      {JSON.parse(sessionStorage.getItem("userDetails"))
                        .user_id == currentPlaylist.users[0]._id ? (
                        <div className="container mt-3">
                          {currentPlaylist ? (
                            currentPlaylist.introVideo != null ? (
                              <div>
                                <div
                                  className="creator_PlaylistPlayer__player-wrapper"
                                  style={{ position: "relative" }}
                                >
                                  <ReactPlayer
                                    url={require("../asset/introvideo/" +
                                      currentPlaylist.introVideo)}
                                    className="creator_PlaylistPlayer__player"
                                    width="100%"
                                    height="100%"
                                  />
                                  <div
                                    className="inroDiv"
                                    style={{
                                      position: "absolute",
                                      left: "0",
                                      top: "0",
                                      background: "rgba(0,0,0,0.5)",
                                      width: "100%",
                                      height: "100%",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <button
                                      onClick={() => {
                                        setYoutubePlay(true);
                                        setYoutubePlayUrl(
                                          require("../asset/introvideo/" +
                                            currentPlaylist.introVideo)
                                        );
                                      }}
                                      className="btn btn-primary mx-2"
                                    >
                                      Play Intro Video
                                    </button>
                                    <button
                                      onClick={DeleteIntro}
                                      className="btn btn-danger"
                                    >
                                      Delete Intro Video
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-12 col-md-3 p-0">
          <div className="todayList borderRadius">
            <div className="">
              <div className="row">
                <div className="col-12">
                  <div className="todayList  buttonPadding">
                    <form
                      onSubmit={(e) => searchVimeoVideo(e)}
                      className="d-flex"
                    >
                      <img
                        onClick={(e) => searchVimeoVideo(e)}
                        src={require("../asset/images/ButtonSearch2.png")}
                        className="img-fluid"
                        alt=""
                        style={{ width: "32px", cursor: "pointer" }}
                      />
                      <input
                        onChange={(e) => setSearchVimeoKeyword(e.target.value)}
                        type="text"
                        placeholder="Search Vimeo"
                        style={{
                          outline: "none",
                          background: "transparent",
                          color: "white",
                          border: "transparent",
                        }}
                      />
                    </form>
                  </div>
                </div>
              </div>
              <hr style={{ margin: "0.5rem", color: "#fff" }} />
              <div className="row mt-3" style={{ margin: "0px -25px" }}>
                <div className="creator_PlaylistPlayer__menu userUploadVideo">
                  {vimeoSearchLoader ? (
                    <div className="main_loader_box">
                      <div className="loader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  ) : videoAllSearchData.length != 0 ? (
                    videoAllSearchData.map((video, index) => {
                      return (
                        <div
                          key={index}
                          className="mainBox"
                          style={{ position: "relative" }}
                        >
                          <div className="creator_VideoBadge">
                            <div
                              className="creator_VideoBadge__logo"
                              style={{
                                backgroundImage: `url(${video.pictures.base_link})`,
                              }}
                            />
                            <div
                              className="creator_VideoBadge__info"
                              style={{ padding: "3px" }}
                            >
                              <div className="info">
                                <p
                                  style={{
                                    lineHeight: "11px",
                                    fontSize: "10px",
                                    margin: "2px",
                                    color: "#fff",
                                  }}
                                >
                                  {video.description
                                    ? video.description.slice(0, 75) + "..."
                                    : ""}
                                  <br />
                                  <img
                                    src={require("../asset/images/ButtonNotLike.png")}
                                    className="img-fluid"
                                    alt=""
                                    style={{ width: "22px", cursor: "pointer" }}
                                  />{" "}
                                  {video.metadata.connections.likes.total}
                                  <br />
                                  play@:
                                  {moment("2015-01-01")
                                    .startOf("day")
                                    .seconds(video.duration)
                                    .format("H:mm:ss")}
                                </p>
                              </div>
                            </div>
                          </div>
                          <ul
                            className="icons"
                            style={{
                              height: "100%",
                              position: "absolute",
                              top: "30%",
                              left: "-30px",
                              listStyle: "none",
                            }}
                          >
                            <li
                              onClick={() =>
                                setYoutubeDatainState(
                                  video.name,
                                  video.link,
                                  null,
                                  video.metadata.connections.likes.total,
                                  video.created_time,
                                  video.duration,
                                  null,
                                  video.user.name,
                                  video.user.link,
                                  video.pictures.base_link,
                                  video.description,
                                  video.embed.html,
                                  video.categories.length != 0
                                    ? video.categories[0].name
                                    : null,
                                  video.user.location_details
                                )
                              }
                            >
                              <img
                                src={require("../asset/images/Button_Add2.png")}
                                className="img-fluid"
                                alt=""
                                style={{ width: "22px", cursor: "pointer" }}
                              />
                            </li>
                            <li
                              onClick={() => {
                                setYoutubePlay(true);
                                setYoutubePlayUrl(video.link);
                              }}
                            >
                              <img
                                src={require("../asset/images/Button_play2.png")}
                                className="img-fluid"
                                alt=""
                                style={{ width: "22px", cursor: "pointer" }}
                              />
                            </li>
                          </ul>
                        </div>
                      );
                    })
                  ) : (
                    <VideoLoader />
                  )}
                </div>
              </div>
              <hr style={{ margin: "0.4rem", color: "#fff" }} />
              <div className="row">
                <div className="col-5">
                  <div className=" todayList buttonPadding">
                    <button
                      onClick={previousVimeoresults}
                      className="btn w-100  rounded-0 border-0 d-flex p-0"
                    >
                      <img
                        src={require("../asset/images/Button_moveUp2-removebg-preview-1.png")}
                        className="img-fluid"
                        alt=""
                        style={{ width: "28px" }}
                      />
                      <span
                        className="m-auto text-white astroSpace"
                        style={{
                          textTransform: "uppercase",
                          fontSize: "90%",
                        }}
                      >
                        PREVIOUS
                      </span>
                    </button>
                  </div>
                </div>
                <div className="col-3 p-0"></div>
                <div className="col-4">
                  <div className=" todayList buttonPadding">
                    <button
                      onClick={nextVimeoresults}
                      className="btn w-100  rounded-0 border-0 d-flex p-0"
                    >
                      <span
                        className="m-auto text-white astroSpace"
                        style={{
                          textTransform: "uppercase",
                          fontSize: "90%",
                        }}
                      >
                        NEXT
                      </span>
                      <img
                        src={require("../asset/images/Button_moveUp2-removebg-preview-2.png")}
                        className="img-fluid"
                        alt=""
                        style={{ width: "28px" }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const VideoBadge = ({ video, onClick, active }) => {
  const className = classnames({
    creator_VideoBadge: true,
    "creator_VideoBadge--clickable": onClick,
    "creator_VideoBadge--active": active,
  });
  return (
    <div className={className} onClick={onClick}>
      <div
        className="creator_VideoBadge__logo"
        style={{ backgroundImage: `url(${video.thumbnail})` }}
      />
      <div className="creator_VideoBadge__info" style={{ padding: "3px" }}>
        <div className="info">
          <p
            style={{
              lineHeight: "11px",
              fontSize: "10px",
              margin: "2px",
              color: "#fff",
            }}
          >
            {video.title}
            <br />
            {video.channel_name}/Youtube - {video.posted_date}
            <br />
            {video.views} views - {video.likes} likes <br />
            category : {video.category}
            <br />
            duration : {video.duration}
          </p>
        </div>
      </div>
    </div>
  );
};
const PlaylistButton = ({ playlist, onClick, active }) => {
  const className = classnames({
    creator_PlaylistButton: true,
    "creator_PlaylistButton--active": active,
  });
  return (
    <>
      <div
        style={{ padding: "0 0 0 30px", display: "flex" }}
        className={className}
        onClick={onClick}
      >
        <div className="creator_VideoBadge__logo">
          {playlist.image == "no" ? (
            <div
              className="w-100 p-3 m-0"
              style={{ height: "100%", background: "#fff" }}
            >
              <img
                src="https://img.icons8.com/ios/90/000000/no-video--v1.png"
                className="img-fluid"
                style={{ display: "inline-block", width: "100%" }}
              />
            </div>
          ) : (
            ""
          )}
          {playlist.image.length == 1 ? (
            <div
              className="w-100"
              style={{ height: "100%", background: "#fff" }}
            >
              <img
                src={playlist.image}
                className="img-fluid"
                style={{
                  display: "inline-block",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          ) : (
            ""
          )}
          {playlist.image.length == 2 ? (
            <div className="row">
              <div className="col-12">
                <img
                  src={playlist.image[0]}
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%" }}
                />
              </div>
              <div className="col-12">
                <img
                  src={playlist.image[1]}
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%" }}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          {playlist.image.length == 3 ? (
            <div className="row px-2">
              <div
                className="col-12"
                style={{
                  height: "50px",
                  background: `url(${playlist.image[0]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div
                className="col-6"
                style={{
                  height: "50px",
                  background: `url(${playlist.image[1]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div
                className="col-6"
                style={{
                  height: "50px",
                  background: `url(${playlist.image[2]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </div>
          ) : (
            ""
          )}
          {playlist.image.length >= 4 ? (
            <div className="row px-2">
              <div
                className="col-6"
                style={{
                  height: "50px",
                  background: `url(${playlist.image[0]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div
                className="col-6"
                style={{
                  height: "50px",
                  background: `url(${playlist.image[1]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div
                className="col-6"
                style={{
                  height: "50px",
                  background: `url(${playlist.image[2]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div
                className="col-6"
                style={{
                  height: "50px",
                  background: `url(${playlist.image[3]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="info" style={{ width: "80%", padding: "5px" }}>
          <p
            style={{
              lineHeight: "10px",
              fontSize: "10px",
              margin: "2px",
              color: "#fff",
            }}
          >
            {playlist.title}
            <br />
            {playlist.users.length != 0
              ? " User : " + playlist.users[0].username
              : ""}
            ,Created:{moment(playlist.createdAt).format("MM/DD/YYYY")}
            <br />
            Channel : <br />
            Notes : <br />
            Keyword : travel <br />
            Category :{" "}
            {playlist.category.length == 1
              ? playlist.category.join()
              : playlist.category.join().slice(0, 15) + "..."}
            <br />
            Total Runtime : {playlist.totalTime} <br />
            Plays: <br />
          </p>
        </div>
      </div>
    </>
  );
};
function VideoLoader() {
  return (
    <div className="row px-3 mt-3">
      <div className="col-5 mb-4">
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={"100%"}
          height={100}
        />
      </div>
      <div className="col-7 mb-4">
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
      <div className="col-5 mb-4">
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={"100%"}
          height={100}
        />
      </div>
      <div className="col-7 mb-4">
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
      <div className="col-5 mb-4">
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={"100%"}
          height={100}
        />
      </div>
      <div className="col-7 mb-4">
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
      <div className="col-5 mb-4">
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={"100%"}
          height={100}
        />
      </div>
      <div className="col-7 mb-4">
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
      <div className="col-5 mb-4">
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={"100%"}
          height={100}
        />
      </div>
      <div className="col-7 mb-4">
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </div>
    </div>
  );
}
