import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Avatar, Chip, Stack, Divider, Grid } from '@mui/material';
import { CardMedia, CardContent, IconButton, Typography, CardHeader, Card, CardActions, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button } from '@mui/material';
import { FormControl, FormControlLabel, Radio, RadioGroup, useMediaQuery, Skeleton } from '@mui/material';
import { red } from '@mui/material/colors';
import { toast } from 'react-toastify';
// Import Icons
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { useTheme } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import { DataGrid } from '@mui/x-data-grid';

// Axios
const axios = require('axios');
toast.configure();
// Main From
const Videos = () => {
    const [loading, setLoading] = useState(false);
    const [allPlayListData, setallPlayListData] = useState([]);
    const [allVideoData, setAllVideoAcout] = useState([]);
    useEffect(() => {
        //  Coustm Style Sylesheet
        setLoading(false);
        document.getElementsByClassName('page-content')[0].style.padding = "0px";
        //  Get All Data of PlayList
        axios.get(process.env.REACT_APP_API_URL + "/manageplaylist/getAlldata").then((response) => { setallPlayListData(response.data); });
        // Get All Videos Data
        axios.get(process.env.REACT_APP_API_URL + "/playlist_video/getAlldata").then((response) => { setAllVideoAcout(response.data); });
    }, [])
    useEffect(() => {
        if (!loading) {
            if (allVideoData == 0)
                setLoading(false)
            else {
                setLoading(true)
                return;
            }
        }
    });
    // Share model
    const [open, setOpen] = React.useState(false);
    const [shareCode, setShareCode] = React.useState("");
    const handleClickOpen = (code) => { setShareCode(code); setOpen(true); };
    const handleClose = () => { setOpen(false); };
    // Add Playlist Model
    const [PlayList, setPlayListOpen] = React.useState(false);
    const [AddPlayListVideo, setAddPlayListVideo] = React.useState("");
    const [AddPlayListUrl, setAddPlayListUrl] = React.useState("");
    const [AddPlayListTitle, setAddPlayListTitle] = React.useState("");
    const [AddPlayListImage, setAddPlayListImage] = React.useState("");
    const [AddPlayList, setAddPlayList] = React.useState("");
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    //  Add Playlist Open Model and Set Value
    const handlePlayListClickOpen = (value, title, url, thumbnailData) => {
        setPlayListOpen(true);
        setAddPlayListVideo(value);
        setAddPlayListUrl(url);
        setAddPlayListTitle(title);
        setAddPlayListImage(thumbnailData);
    };
    const handlePlayListClose = () => { setPlayListOpen(false); };
    // Submit PlayList
    const ChangeCheckBox = (value) => {
        setAddPlayList(value);
    }
    const handlePlayListSubmit = () => {
        axios.post(process.env.REACT_APP_API_URL + '/manageplaylist/addVideoinplaylist', { playlist: AddPlayList, video: AddPlayListVideo, title: AddPlayListTitle, url: AddPlayListUrl, thumbnail: AddPlayListImage }).then((res) => {
            console.log(res)
            toast.success("Added Successfully", {});
        }).catch((err) => {
            console.log(err)
            toast.error(err.response.data.errorMessage, {});
        });
        setPlayListOpen(false);
    }
    // // // // /// // // // // // // // // // // // // // // // // // // / / / / / // 
    // Table Columns
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 90,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
      ];
      const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];
    return (
        <>
            <div className="card nameChips p-2 px-2" style={{ overflow: 'auto' }}>
                <Stack direction="row" spacing={1}>
                    {
                        loading ? (
                            <React.Fragment>
                                <Chip label="All" sx={{ color: '#fff', background: '#fff', color: '#000', px: '8px' }} />
                                <div className='nameChips' style={{ overflow: 'auto', width: '89%', display: 'flex' }}>
                                    {allPlayListData.map((value, index) => { return (<Chip key={index} sx={{ color: '#fff', marginRight: '5px' }} avatar={<Avatar alt={value.title} src="/static/images/avatar/1.jpg" />} label={value.title} variant="outlined" />) })}
                                    <Chip style={{ position: 'absolute', right: '0.5%' }} label="More" sx={{ color: '#fff', background: '#fff', color: '#000', px: '8px' }} />
                                </div>
                            </React.Fragment>
                        ) :
                            (
                                <Skeleton sx={{ p: 2, width: "100%" }} animation="wave" />
                            )
                    }
                </Stack>
                <Divider style={{ marginTop: '5px' }}>
                    <Chip label="Videos" style={{ padding: '0', margin: '10px', color: '#fff' }} />
                </Divider>
                <Grid container rowSpacing={1} sx={{ p: '15px' }} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                    {
                        allVideoData.map((value, index) => {
                            return (
                                <Grid key={index} item xs={12} sm={12} md={4} lg={3}>
                                    <Card sx={{ maxWidth: 345,height:'290px'}}>
                                        {
                                            loading ?
                                                (
                                                    <CardHeader avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">{value.channel_name.slice(0, 1)}</Avatar>} action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>} title={value.title.slice(0,25)+'...'} subheader={value.posted_date} />
                                                ) :
                                                (
                                                    <Skeleton sx={{ m: 2 }} animation="wave" variant="circular" width={40} height={40} />
                                                )
                                        }
                                        {
                                            loading ?
                                                (
                                                    <CardMedia sx={{height:'29%'}} component="div" height="194" image={value.thumbnail} alt="Paella dish" />
                                                ) :
                                                (
                                                    <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
                                                )
                                        }
                                        <CardContent style={{padding:'5px 16px'}}>
                                            {
                                                loading ? (
                                                    <Typography variant="body2" color="text.secondary">{value.description.slice(0,50)+'...'}</Typography>
                                                ) :
                                                    (
                                                        <React.Fragment>
                                                            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                                                            <Skeleton animation="wave" height={10} width="40%" />
                                                        </React.Fragment>
                                                    )
                                            }
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            {
                                                loading ? (
                                                    <React.Fragment>
                                                        <IconButton sx={{ outline: 'none' }} aria-label="Watch Video"><PlayCircleFilledWhiteOutlinedIcon /> </IconButton>
                                                        <IconButton sx={{ outline: 'none' }} onClick={() => handlePlayListClickOpen(value._id, value.title, value.url, value.thumbnail)} aria-label="add to PlayList"><PlaylistPlayIcon /></IconButton>
                                                        <IconButton sx={{ outline: 'none' }} onClick={() => handleClickOpen(value.embeded_code)} aria-label="share"><ShareIcon /></IconButton>
                                                        <a href={value.url} target="_blank"><IconButton aria-label="share"><YouTubeIcon /></IconButton></a>
                                                    </React.Fragment>
                                                ) :
                                                    (
                                                        <React.Fragment>
                                                            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                                            <Skeleton animation="wave" height={10} width="80%" />
                                                        </React.Fragment>
                                                    )
                                            }

                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
              
                {/* Share Model */}
                <Dialog open={open} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
                    <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                    <DialogContent><DialogContentText id="alert-dialog-slide-description">{shareCode}</DialogContentText></DialogContent>
                    <DialogActions><Button onClick={handleClose}>Copy Link</Button><Button onClick={handleClose}>Close</Button></DialogActions>
                </Dialog>
                {/* Select PlayList */}
                <Dialog fullScreen={fullScreen} open={PlayList} onClose={handlePlayListClose} aria-labelledby="responsive-dialog-title">
                    <DialogTitle sx={{ color: '#000' }} id="responsive-dialog-title">{"Select Playlist"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {/* <FormControl>
                                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group" >
                                    {allPlayListData.map((value, index) => { return (<FormControlLabel key={index} value={value._id} control={<Radio onChange={() => ChangeCheckBox(value._id)} />} label={value.title} />) })}
                                </RadioGroup>
                            </FormControl> */}
                              <div style={{ height: 400,width:'668px'}}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                />
                                </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions><Button autoFocus onClick={handlePlayListClose}>Cancle</Button><Button onClick={handlePlayListSubmit} autoFocus> Submit </Button></DialogActions>
                </Dialog>
            </div>
            {/* End Card */}
        </>
        // End Return
    )
    // End Function
}
export default Videos