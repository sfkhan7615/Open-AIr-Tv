var express = require("express");
var app = express();
path = require('path');

app.use("/", (req, res, next) =>  
{
    try 
    {
        if (req.path == "/user/login" || req.path == "/register" || req.path == "/" || req.path=="/user/getAlldata" || req.path=="/user/delete"  || req.path=="/user/update_password")
        {
          next();
        }
        else if(req.path=="/playlist_video/delete" || req.path=="/playlist_video/add" || req.path == "/playlist_video/getAlldata" ||  req.path == "/manageplaylist/add" || req.path == "/manageplaylist/getAlldata" || req.path == "/manageplaylist/addVideoinplaylist" || req.path=="/manageplaylist/delete")
        {
            next();
        }
        else if(req.path == "/user/add" || req.path == "/admin/user/add" || req.path == "/admin/user/getAlldata" || req.path == "/admin/user/delete" || req.path == "/admin/user/update" )
        {
           next();
        }
        else if(req.path == "/playlist/getPlayListData" || req.path == '/addvideoplaylist/add')
        {
            next();
        }
        else {
          /* decode jwt token if authorized*/
          jwt.verify(req.headers.token, 'shhhhh11111', function (err, decoded) {
            if (decoded && decoded.user) {
              req.user = decoded;
              next();
            } else {
              return res.status(401).json({
                errorMessage: 'User unauthorized!',
                status: false
              });
            }
          })
        }
      }catch (e) {
        res.status(400).json({
          errorMessage: 'Something went wrong!',
          status: false
        });
      }
});
app.get("/", (req, res) => {
    res.status(200).json({
      status: true,
      title: 'Apis'
    });
});







///////////////////////////////////////////////    All Routes Call   ////////////////////////////////////////////////

// Call Route Files
const videoRoute = require("./ApiRoutes/Playlist/Video.js");
const userRoute = require("./ApiRoutes/Users/Users.js");
const listRoute = require("./ApiRoutes/Playlist/List.js");
// frontend
const palylist = require("./ApiRoutes/frontend/playlist_videos.js");
// admin files
const userAdminRoute = require("./ApiRoutes/Users/admin/Users.js");
// add video in playlist
const AddVideoInPlayList = require("./ApiRoutes/Playlist/addVideoInPlaylist.js");
//  Define All Route (Ps)
app.use('/playlist_video',videoRoute);
app.use('/user',userRoute);
app.use('/admin/user/',userAdminRoute);
app.use('/admin/user/',userAdminRoute);
app.use('/manageplaylist',listRoute);
app.use('/addvideoplaylist',AddVideoInPlayList)

app.use('/playlist',palylist);

app.listen(8000, () => {
    console.log("Server is Runing On port 8000");
});


