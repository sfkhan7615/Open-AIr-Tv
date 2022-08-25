import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { PlaylistPlayer } from './PlaylistPlayer'
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

import LinearProgress from '@mui/material/LinearProgress';
// import './App.scss'
import './asset/css/index.css';
const axios = require('axios');


function PlayList() {
  // auth
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.location.href.split("id=")[1]) {
      const user_id = sessionStorage.getItem('userDetails');
      if (!user_id)
        navigate('/login?from=dfbchebf5254652dnsfydf');
    }
  }, []);

  // code
  const [allPlaylistData, SetPlaylist] = useState([]);
  const [loadData, SetLoadData] = useState(false);
  var playThumbnail = [];

  useEffect(() => {
    // document.getElementsByClassName("css-1g7fu7m-MuiContainer-root")[0].style.maxWidth = "1330px";

    axios.get(process.env.REACT_APP_API_URL + '/playlist/getPlayListData').then((res) => {
      if (res.data.length != 0) {

        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].title == "test")
            res.data.splice(i, 1);
        }

        for (let i = 0; i < res.data.length; i++) {
          for (let j = 0; j < 1; j++) {
            if (res.data[i].videos.length != 0)
              playThumbnail.push(res.data[i].videos[j].thumbnail);
            else if (res.data[i].videos.length == 0) {
              playThumbnail.push("no");
            }
          }
        }
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].image = playThumbnail[i];
        }

        if (!window.location.href.split("id=")[1]) {
          for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res.data[i].videos.length; j++) {
              if (res.data[i].videos[j].likes_by != null) {

                // String Search

                if (res.data[i].videos[j].likes_by.search(JSON.parse(sessionStorage.getItem("userDetails")).user_id) != -1) {
                  res.data[i].videos[j].likesThisUser = true;
                }
                else {
                  res.data[i].videos[j].likesThisUser = false;
                }

              }
              else {
                res.data[i].videos[j].likesThisUser = false;
              }
            }
          }
        }

        SetPlaylist(res.data)
        SetLoadData(true);
      }
    }).catch((err) => {
      SetLoadData(false);
    });
  })
// console.log(allPlaylistData.length);
  return (
    <>
    
      <div>
      {
        loadData ?
          (
            window.location.href.split("id=")[1] ? (
              <div className="App" style={{marginTop:'24px'}}>
                <div className="App__player">
                  <PlaylistPlayer playlists={allPlaylistData} />
                </div>
              </div>
            ) : (
              <div className="App">
                <div className="App__player">
                  <PlaylistPlayer playlists={allPlaylistData} />
                </div>
              </div>
            )
          ) :
          (
            <React.Fragment>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={10}>
                      <LinearProgress />
                      <Skeleton animation="wave" variant="rectangular" style={{ width: "100%", height: '400px', background: 'rgb(255 255 255 / 22%)' }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Skeleton animation="wave" variant="rectangular" style={{ width: "100%", height: '400px' }} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={10}>
                      <Skeleton animation="wave" variant="rectangular" style={{ width: "100%", height: '90px' }} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <Skeleton animation="wave" variant="rectangular" style={{ width: "100%", height: '90px' }} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          )
      }
      </div>
       
      
    
      

    </>

  )
}

export default PlayList
