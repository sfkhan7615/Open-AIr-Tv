import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { PlaylistPlayer } from './PlaylistPlayer'
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
// import './App.scss'
import './asset/css/index.css';
const axios = require('axios');


function HomePlayer() {
  // auth
  const navigate = useNavigate();

  // code
  const [allPlaylistData, SetPlaylist] = useState([]);
  const [loadData, SetLoadData] = useState(false);
  var playThumbnail = [];

  useEffect(() => {
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

        SetPlaylist(res.data)
        SetLoadData(true);
      }
    }).catch((err) => {
      SetLoadData(false);
    });
  })

  return (
    <>
      {
        loadData ?
          (
              <div className="App">
                  <PlaylistPlayer playlists={allPlaylistData} />
              </div>
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

    </>

  )
}

export default HomePlayer
