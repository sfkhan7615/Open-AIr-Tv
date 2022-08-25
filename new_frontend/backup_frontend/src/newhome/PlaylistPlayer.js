import { useState, useRef, useEffect } from "react";
import classnames from "classnames";
import ReactPlayer from "react-player";
import "bootstrap/dist/css/bootstrap.min.css";
import "./asset/css/index.css";
import { Tabs, Tab } from "react-bootstrap";
import { ShareSocial } from "react-share-social";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { toast } from "react-toastify";
toast.configure();

const axios = require("axios");
const moment = require("moment");


export const PlaylistPlayer = ({ playlists }) => {

  const [catagrayPlay, setCatagrayPlay] = useState(false);
  const [introplay,setIntroPlay] = useState(true);


  const [allVideolistData, SetVideolist] = useState([]);
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


  const navigate = useNavigate();
  const setOpenSettingBarChange = () => {
    if (OpenSettingBar) setOpenSettingBar(false);
    else {
      if (socialMediaMenu) { setSocialMediaMenu(false); setOpenSettingBar(false); }
      else setOpenSettingBar(true);
    }
  };
  //  Set Runtime Of playlist
  for (let i = 0; i < playlists.length; i++) {
    var total = 0;
    for (let j = 0; j < playlists[i].videos.length; j++)
      total = total + parseInt(playlists[i].videos[j].duration);
    playlists[i].runtime = moment("2015-01-01").startOf("day").seconds(total).format("H:mm:ss");
  }


  //  Top Playlist
  for (let i = 0; i < playlists.length; i++) {
    if (playlists[i].videos != undefined) {
      var total = 0;
      for (let j = 0; j < playlists[i].videos.length; j++)
        total = total + parseInt(playlists[i].videos[j].likes);
    }
    playlists[i].likes = total;
  }
  var topPlayListData = playlists;
  topPlayListData.sort(function (b, a) {
    var keyA = a.likes, keyB = b.likes;
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  // console.log(topPlayListData);
  const [countUserPlaylist, setCountUserPlaylist] = useState(topPlayListData.length);
  const [videoIndex, setVideoIndex] = useState(0);
  const [playlistIndex, setPlaylistIndex] = useState(0);

  const [currentPlaylist, setCurrentPlaylist] = useState(topPlayListData[playlistIndex]);
  const [introvideoUrl,setintrovideoUrl] = useState(null);

  var currentVideo = null;
  if (currentPlaylist) {
    if (currentPlaylist.videos.length != 0)
      currentVideo = currentPlaylist.videos[videoIndex];
  }
  const onEnded = () => 
  {
    if (currentPlaylist.videos[videoIndex + 1]) { setVideoIndex(videoIndex + 1); }
    else if (playlists[playlistIndex + 1])
    {
       setPlaylistIndex(playlistIndex + 1); setVideoIndex(0); 
       setIntroPlay(true)
    }
    else { setPlaylistIndex(0); setVideoIndex(0); }
  };
  useEffect(() => {
    document.body.style.height = "auto";

    document.getElementsByClassName("header")[0].style.display = "flex";
    document.getElementsByClassName("css-1g7fu7m-MuiContainer-root")[0].style.maxWidth = "1200px";
    document.getElementsByClassName("main-container")[0].style.height = "100%";
    document.getElementsByClassName("main-container")[0].style.paddingLeft = "0px";
    document.getElementsByClassName("main-container")[0].style.paddingRight = "0px";
  }, []);
  const changePlaylist = (ind) => 
  {
    setPlaylistIndex(ind);
    setVideoIndex(videoIndex);
    setCurrentPlaylist(playlists[playlistIndex]);
    if(introplay)
    {
      if(currentPlaylist.introVideo!=null)
      {
        setintrovideoUrl(require("../asset/introvideo/" +currentPlaylist.introVideo));
        setIntroPlay(true);
      }
      else
      {
         setIntroPlay(false);
      }
    }
  };
  useEffect(()=>{
    if(currentPlaylist.introVideo!=null)
      setIntroPlay(true);
  },[])
  useEffect(() => { changePlaylist(playlistIndex); });
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(3);
  const moreVideos = () => {
    let mixminimum = min + 4, mixmaximum = max + 4;
    if (mixmaximum < playlists.length) { setMin(min + 4); setMax(max + 4); }
    if (mixmaximum >= playlists.length) { setMin(0); setMax(3); }
  };
  const style = { background: "transparent", borderRadius: 3, border: 0, color: "white", };
  // Open Settings
  const [OpenSettingBar, setOpenSettingBar] = useState(false);
  // Social Media Menu Bar
  const [socialMediaMenu, setSocialMediaMenu] = useState(false);
  const reDirectTohome = () => { navigate("/home"); };
  // Like and dislike 
  const LikeDislike = (video_id) => {
    if (!sessionStorage.getItem("userDetails")) {
      toast.warning("Please Login First!");
    } else {
      const user_id = JSON.parse(sessionStorage.getItem("userDetails")).user_id;
      axios.post(process.env.REACT_APP_API_URL + "/playlist/like", { user: user_id, video: video_id, opr: "like", }).then((res) => { console.log("Video Like"); })
        .catch((err) => { console.log("error Video not like") });
    }
  };
  const Dislike = (video_id) => {
    if (!sessionStorage.getItem("userDetails")) { toast.warning("Please Login First!"); }
    else {
      const user_id = JSON.parse(sessionStorage.getItem("userDetails")).user_id;
      axios
        .post(process.env.REACT_APP_API_URL + "/playlist/like", { user: user_id, video: video_id, opr: "dislike", })
        .then((res) => { currentVideo.likes = user_id; console.log(res); })
        .catch((err) => { console.log(err) });
    }
  };
  // copy Embed Code
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);
  function copyToClipboard(e) { textAreaRef.current.select(); document.execCommand('copy'); e.target.focus(); setCopySuccess('Copied!'); };
  const MoveToNowPlaying = () => {
    document.getElementById('noanim-tab-example-tab-home').click();
  }


  //  Get Live Video and check Live videos


  const [playAnotherVideo, setPlayAnotherVideo] = useState(false);
  const [playUrl, setPlayUrl] = useState("");

  const [allvideos, setAllvideos] = useState([]);
  const [alllivevideos, setalllivevideos] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + "/playlist/getVideoData", { headers: { Token: "sdsndsddbsbdjsfdbsfdJDSKDjldfsd" } })
      .then((res) => {

        SetVideolist(res.data);
        // set categ....
        res.data.forEach((element, index) => {
          const Categories = res.data[index].category;
          if (Categories != null) {
            if (Categories == "Film & Animation")
              setFilm_Animation(film_Animation => [...film_Animation, element]);
            else if (Categories == "Autos & Vehicles")
              setAutos_Vehicles(autos_Vehicles => [...autos_Vehicles, element]);
            else if (Categories == "Pets & Animals")
              setPets_Animals(pets_Animals => [...pets_Animals, element]);
            else if (Categories == "Music")
              setMusic(music => [...music, element]);
            else if (Categories == "Sports")
              setSports(Sports => [...Sports, element])
            else if (Categories == "Short & Movies")
              setShort_Movies(short_Movies => [...short_Movies, element])
            else if (Categories == "Travel & Events")
              setTravel_Events(travel_Events => [...travel_Events, element])
            else if (Categories == "Gaming")
              setGaming(gaming => [...gaming, element])
            else if (Categories == "Videoblogging")
              setVideoblogging(videoblogging => [...videoblogging, element])
            else if (Categories == "People & Blogs")
              setPeople_Blogs(people_Blogs => [...people_Blogs, element])
            else if (Categories == "Comedy")
              setComedy(Comedy => [...Comedy, element])
            else if (Categories == "Entertainment")
              setEntertainment(entertainment => [...entertainment, element])
            else if (Categories == "News & Politics")
              setNews_Politics(news_Politics => [...news_Politics, element])
            else if (Categories == "Howto & Style")
              setHowto_Style(howto_Style => [...howto_Style, element])
            else if (Categories == "Education")
              setEducation(education => [...education, element])
            else if (Categories == "Science & Technology")
              setScience_Technology(science_Technology => [...science_Technology, element])
            else if (Categories == "Nonprofits & Activism")
              setNonprofits_Activism(nonprofits_Activism => [...nonprofits_Activism, element])
            else if (Categories == "Movies")
              setMovies(Movies => [...Movies, element])
            else if (Categories == "Anime/Animation")
              setAnime_and_Animation(anime_and_Animation => [...anime_and_Animation, element])
            else if (Categories == "Action/Adventure")
              setAction_Adventure(action_Adventure => [...action_Adventure, element])
            else if (Categories == "Classics")
              setClassics(classics => [...classics, element])
            else if (Categories == "Documentary")
              setDocumentary(documentary => [...documentary, element])
            else if (Categories == "Drama")
              setDrama(drama => [...drama, element])
            else if (Categories == "Family")
              setFamily(family => [...family, element])
            else if (Categories == "Foreign")
              setForeign(foreign => [...foreign, element])
            else if (Categories == "Horror")
              setHorror(horror => [...horror, element])
            else if (Categories == "Sci-Fi/Fantasy")
              setSci_fi_and_Fantasy(sci_fi_and_Fantasy => [...sci_fi_and_Fantasy, element])
            else if (Categories == "Thriller")
              setThriller(thriller => [...thriller, element])
            else if (Categories == "Shorts")
              setShorts(shorts => [...shorts, element])
            else if (Categories == "Shows")
              setShows(shows => [...shows, element])
            else if (Categories == "Trailers")
              setTrailers(trailers => [...trailers, element])
          }
        });

        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].duration == 0) {
            setalllivevideos((alllivevideos) => [...alllivevideos, res.data[index]]);
          }
        }
        setAllvideos(res.data)
      })
  }, [])


  const [playliveVideo, setPlayliveVideo] = useState(false);
  const chnageplayUrl = (url) => {
    setPlayliveVideo(true);
    setPlayCatUrl(url)
  }

  var catCreate = [];
  const [playCat, setPlayCat] = useState([]);
  const [playCatUrl, setPlayCatUrl] = useState([]);
  const [playcatVideoInd,setPlaycatIndex] = useState(0);
  const [catArrayLen,setcatArrayLen] = useState(0);
  const catagray = (data) => 
  {
    setPlaycatIndex(0)
    setCatagrayPlay(true);
    catCreate.videos = data;
    setPlayCat(catCreate)
    setPlayCatUrl(data[playcatVideoInd].url);
  }

  useEffect(()=>{

      if(catagrayPlay)
        setPlayCatUrl(playCat.videos[playcatVideoInd].url);

  })

  const playnexVideo = (howCome) => {

    if (howCome == "cat") 
    {
          if(playcatVideoInd+1<playCat.videos.length)
            setPlaycatIndex(playcatVideoInd+1);
          else
            setPlaycatIndex(0);
            
    }
    else
    {
      if (currentPlaylist.videos[videoIndex + 1] == undefined) {
        setVideoIndex(0)
      }
      else {
        setVideoIndex(videoIndex + 1);
      }

    }

  }

  return (
    <>
      <div className="App__player">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-12 col-lg-9 p-0">
                <div className="PlaylistPlayer__player-wrapper">
                  {
                    catagrayPlay || playliveVideo ? (
                      <ReactPlayer url={playCatUrl} className="PlaylistPlayer__player" width="100%" height="100%" onEnded={()=>playnexVideo('cat')} playing controls />
                    ) :
                      (
                        currentVideo ? 
                        (
                          introplay?(
                            <ReactPlayer url={introvideoUrl} className="PlaylistPlayer__player" width="100%" height="100%" onEnded={()=>setIntroPlay(false)} playing controls />
                          ):(
                            <ReactPlayer url={currentVideo.url} className="PlaylistPlayer__player" width="100%" height="100%" onEnded={onEnded} playing controls />
                          )
                        ) : (
                          <>
                            <div className="d-block d-md-none" style={{ position: "absolute", top: "34%", left: "15%" }} >
                              <img src={require("../asset/images/empty.png")} className="img-fluid" alt="" />
                            </div>
                            <div className="d-none d-md-block" style={{ position: "absolute", top: "50%", left: "50%", transform: 'translate(-50%,-50%)' }} >
                              <img src={require("../asset/images/empty.png")} className="img-fluid" alt="" />
                            </div>
                          </>
                        )
                      )
                  }

                </div>
              </div>
              {
                window.location.href.split("id=")[1] ? ("") : (
                  <div className="col-12 col-lg-3" style={{ background: "tra" }}>
                    {/* tab manage */}
                    <div className="row position-relative h-100 p-0">
                      <div className="col-12 p-0">
                        <Tabs defaultActiveKey="home" transition={true} id="noanim-tab-example" style={{ border: "none" }}>
                          <Tab eventKey="home" title="Now Playing" style={{ width: "100%" }}>
                            <div className="row m-0">
                              <div className="col-12 PlaylistPlayer__badge" style={{ overflowY: "scroll", height: "404px" }}>
                                {
                                  catagrayPlay ?
                                    (
                                      playCat.videos.map((video, index) => (
                                        <VideoBadge key={index} video={video} onClick={() => {setPlaycatIndex(index); setPlayCatUrl(video.url); }} active={index === playcatVideoInd} />
                                      ))
                                    ) :
                                    (
                                      currentPlaylist == undefined ?
                                        (
                                          <img src={require("../asset/images/empty.png")} className="img-fluid m-0 p-0" alt="" style={{ width: "100%", height: "60%" }} />
                                        ) : currentPlaylist.videos == undefined ?
                                          (
                                            <img src={require("../asset/images/empty.png")} className="img-fluid m-0 p-0" alt="" style={{ width: "100%", height: "60%" }} />
                                          ) : currentPlaylist.videos.length == 0 ?
                                            (
                                              <img src={require("../asset/images/empty.png")} className="img-fluid m-0 p-0" alt="" style={{ width: "100%", height: "60%" }} />
                                            ) : (
                                              currentPlaylist.videos.map((video, index) => (
                                                <VideoBadge key={index} video={video} onClick={() => { setVideoIndex(index); }} active={index === videoIndex} />
                                              ))
                                            )
                                    )
                                }

                              </div>
                            </div>
                          </Tab>
                          <Tab eventKey="profile" title="Top Playlist">
                            <div className="PlaylistPlayer__playlists" style={{ overflowY: "scroll", height: "404px" }}>
                              {topPlayListData.length == 0 ? (
                                <img src={require("../asset/images/empty.png")} className="img-fluid m-0 p-0" alt="" style={{ width: "100%", height: "60%" }} />
                              ) : (
                                topPlayListData.map((playlist, index) => (
                                  <PlaylistButton key={index} playlist={playlist} onClick={() => { setIntroPlay(true); setCatagrayPlay(false); setPlayliveVideo(false); setPlaylistIndex(index); setVideoIndex(0); changePlaylist(index); MoveToNowPlaying(); }} active={index === playlistIndex} />
                                ))
                              )}
                            </div>
                          </Tab>
                        </Tabs>
                      </div>
                      <div className="row playlist_bottom_header">
                        <div className="col-12 d-flex">
                          <div onClick={reDirectTohome} className="m-auto">
                            <img style={{ cursor: "pointer", maxWidth: '70%' }} src={require(`../asset/images/MainPlayer_Logo.png`)} className="img-fluid" alt="" />
                          </div>
                          <div className="m-auto">
                            <img style={{ cursor: "pointer", maxWidth: '70%' }} onClick={() => catagrayPlay ? (playnexVideo("cat")) : (playnexVideo("pal"))} src={require(`../asset/images/Button_play2.png`)} className="img-fluid" alt="" />
                          </div>
                          <div className="m-auto">
                            <ul className={OpenSettingBar ? "dropDownSetting" : "dropDownSetting hidden"}>
                              <li style={{ cursor: "pointer" }} onClick={() => { setOpenSettingBar(false); setSocialMediaMenu(true); }} className="p-1" to="/">Share to Social</li>
                              <li style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#exampleModal" className="p-1" to="/playlist">Share Embed</li>
                            </ul>
                            <ul className={socialMediaMenu ? "dropDownSetting" : "dropDownSetting hidden"} style={{ padding: "0 18px" }} >
                              {socialMediaMenu ? (
                                <ShareSocial style={style} url={"http://190.92.153.226:3000/playlist?id=" + currentPlaylist._id} socialTypes={["facebook", "twitter", "reddit", "linkedin", "email", "pinterest", "whatsapp",]} />
                              ) : ("")}
                            </ul>
                            <img style={{ cursor: "pointer", maxWidth: '70%' }} onClick={setOpenSettingBarChange} src={require(`../asset/images/MoreShare.png`)} className="img-fluid" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* end tabs */}
                  </div>
                )
              }
            </div>
          </div>
          <div className="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">Embed Code</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div>
                    {document.queryCommandSupported('copy') && <div><button className="btn btn-dark" onClick={copyToClipboard}>Copy</button> {copySuccess}</div>}
                    {currentPlaylist ? (<form><textarea className="embedTextArea" ref={textAreaRef} value={"<iframe width='560' src='http://190.92.153.226:3000/playlist?id=" + currentPlaylist._id + "'title='YouTube video player' frameborder='0' allow='autoplay; fullscreen; picture-in-picture;' allowfullscreen style='position:absolute;top:0;left:0;width:100%;height:100%;'></iframe>"} /></form>) : ("")}
                  </div>
                </div>
                <div className="modal-footer"><button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button></div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-12 col-md-2 p-0">
            <h1 style={{ fontSize: '17px', background: 'rgba(0,0,0,0.5)' }} className="p-2">Live</h1>
            <div className="PlaylistPlayer__playlists p-0" style={{ overflow: 'hidden', overflowY: "scroll", height: "345px" }}>
              {alllivevideos.length == 0 ? (
                <img  src={require("../asset/images/empty.png")} className="img-fluid m-0 p-0" alt="" style={{ width: "100%", height: "60%" , cursor: "pointer" }} />
              ) :
                (
                  alllivevideos.map((val, index) => {
                    return (
                      <div onClick={() => { chnageplayUrl(val.url); }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px' , cursor: "pointer" }}>
                        <img src={val.thumbnail} style={{ maxWidth: '100%' }} />
                      </div>
                    )
                  })
                )}
            </div>
            <div className="col-12 p-5 my-2" style={{ background: "rgba(0,0,0,0.5)", color: '#fff' }}>Space Re...</div>
            <div className="col-12 p-5 my-2" style={{ background: "rgba(0,0,0,0.5)", color: '#fff' }}>Space Re...</div>
          </div>

          <div className="col-12 col-md-8">
            <div className="row">
              <div className="col-12 col-md-6">
                <img style={{ maxWidth: '100%' }} src="http://190.92.153.226:3000/static/media/todayTopList.00d529f1cae7bfd4c94d.png" />
              </div>
              <div className="col-12 col-md-6">
                <img style={{ maxWidth: '100%' }} src="http://190.92.153.226:3000/static/media/todayMixlist.5166efb41ed483dad9ec.png" />
              </div>
            </div>
            <div className="row mt-2">
              {

                playlists.map((playlist, index) =>
                  <>
                    <div className="col-12">
                      <div className="row px-2 mb-1">
                        {
                          playlist.videos.slice(0, 4).map((playlistvideo, videoindex) =>

                            <div className="col-3 m-0 p-0 d-flex" style={{ justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.5)', position: 'relative' , cursor: "pointer" }}>
                              <p title={playlist.title} style={{ position: 'absolute', left: '0', height:'20px', top: '0', background: 'rgba(0,0,0,0.7)', color: '#fff', width: '100%',  textTransform: 'capitalize', fontSize: '18px' }}>
                                {
                                  videoindex == 0 ? (
                                    playlist.title.substring(0,8)+".."
                                  ) : (<span style={{ visibility: 'hidden' }}>Hi</span>)
                                }
                              </p>
                              <img onClick={() => { setCatagrayPlay(false); setPlayliveVideo(false); setPlaylistIndex(index); setVideoIndex(videoIndex) }} src={playlistvideo.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} />
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </>
                )
              }
            </div>
          </div>
          <div className="col-12 col-md-2 p-0">
            <h1 style={{ fontSize: '17px', background: 'rgba(0,0,0,0.5)' }} className="p-2">Category</h1>
            <div className="PlaylistPlayer__playlists p-0" style={{ overflow: 'hidden', overflowY: "scroll", height: "345px" }}>
              {alllivevideos.length == 0 ? (
                <img src={require("../asset/images/empty.png")} className="img-fluid m-0 p-0" alt="" style={{ width: "100%", height: "60%" , cursor: "pointer" }} />
              ) :
                (
                  <>
                    <>{film_Animation.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(film_Animation) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{autos_Vehicles.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(autos_Vehicles) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{pets_Animals.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(pets_Animals) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{music.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(music) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{Sports.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(Sports) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{short_Movies.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(short_Movies) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{travel_Events.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(travel_Events) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{gaming.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(gaming) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{videoBlogging.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(videoBlogging) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{people_Blogs.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(people_Blogs) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{Comedy.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(Comedy) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{entertainment.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(entertainment) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{news_Politics.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(news_Politics) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{howto_Style.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(howto_Style) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{education.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(education) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{science_Technology.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(science_Technology) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{nonprofits_Activism.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(nonprofits_Activism) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{Movies.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(Movies) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{anime_and_Animation.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(anime_and_Animation) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{action_Adventure.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(action_Adventure) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{classics.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(classics) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{documentary.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(documentary) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{drama.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(drama) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{family.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(family) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{foreign.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(foreign) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{horror.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(horror) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{sci_fi_and_Fantasy.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(sci_fi_and_Fantasy) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{thriller.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(thriller) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{shorts.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(shorts) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{shows.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(shows) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>
                    <>{trailers.slice(0, 1).map((val, index) => { return (<div onClick={() => { catagray(trailers) }} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', background: 'rgba(0,0,0,0.5)', padding: '5px', position: 'relative' }}><img src={val.thumbnail} style={{ maxWidth: '100%' , cursor: "pointer" }} /><p style={{ position: 'absolute', top: '0', left: '0', padding: '5px', background: 'rgba(0,0,0,0.8)', width: '100%', color: '#fff' }}>{val.category}</p></div>) })}</>

                  </>
                )}
            </div>
            <div className="col-12 p-5 my-2" style={{ background: "rgba(0,0,0,0.5)", color: '#fff' }}>Space Re...</div>
            <div className="col-12 p-5 my-2" style={{ background: "rgba(0,0,0,0.5)", color: '#fff' }}>Space Re...</div>
          </div>
        </div>
      </div>
    </>
  );
};

const VideoBadge = ({ video, onClick, active }) => {
  const className = classnames({ VideoBadge: true, "VideoBadge--clickable": onClick, "VideoBadge--active": active, });
  return (
    <div className={className} onClick={onClick}>
      <div className="VideoBadge__logo" style={{ backgroundImage: `url(${video.thumbnail})` }} />
      <div className="VideoBadge__info">
        <div className="VideoBadge__title">{video.title.slice(0, 30) + "..."}</div>
        <div className="VideoBadge__title">Creator : {video.channel_name}</div>
        <div className="VideoBadge__title">Posted Date : {video.posted_date}</div>
        <div className="VideoBadge__title">duration :{" "} {moment("2015-01-01").startOf("day").seconds(video.duration).format("H:mm:ss")}</div>
      </div>
    </div>
  );
};

const PlaylistButton = ({ playlist, onClick, active }) => {
  const className = classnames({ PlaylistButton: true, "PlaylistButton--active": active, });
  return (
    <>
      <div className={className} onClick={onClick}>
        {playlist.image == "no" ? (
          <div className="PlaylistButton__logo" style={{ background: "#fff", justifyContent: "center", alignItems: "center", display: "flex", padding: "10px" }}>
            <img src="https://img.icons8.com/ios/90/000000/no-video--v1.png" style={{ width: "60%" }} />
          </div>
        ) :
          (<div className="PlaylistButton__logo" style={{ backgroundImage: `url(${playlist.image})` }} />)}
        <div className="PlaylistButton__info">
          <div className="PlaylistButton__title">{playlist.title}</div>
          <p style={{ fontSize: "10px", margin: "0" }}>{/* Username - {playlist.users[0].username} */}</p>
          <p style={{ fontSize: "10px", margin: "0" }}>Created At - {playlist.createdAt}</p>
          <p style={{ fontSize: "10px", margin: "0" }}>Playlist Runtime - {playlist.runtime}</p>
        </div>
      </div>
    </>
  );
};

const PlaylistButtonThumb = ({ playlist, onClick, active }) => {
  const className = classnames({ PlaylistButton: true, "PlaylistButton--active": active, });
  return (
    <>
      <div className={className} style={{ height: '119px' }} onClick={onClick}>
        <div className="PlaylistButton__logo" style={{ width: '12rem', height: '8rem', backgroundImage: `url(${playlist.image})` }} />
      </div>
    </>
  );
};