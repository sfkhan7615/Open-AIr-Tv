import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import { toast } from "react-toastify";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const axios = require("axios");
var moment = require("moment");

function Manageplaylist() {
  const navigate = useNavigate();
  const [allPlaylistData, setallPlaylistData] = useState([]);
  const [allPlaylistVideosData, setallPlaylistVideosData] = useState([]);
  const [user, setuser] = useState("");
  const [playListName, setPlayListName] = useState("");
  const [updatePlaylistId, setUpdateId] = useState("");
  const [opration, setOpration] = useState("");
  const [DeleteId, setDeleteId] = useState([]);
  const [showAllPlaylist, SetshowAllPlaylist] = useState(false);

  const token = localStorage.getItem("token");

  // var deleteIdArr = [];
  const addEntryClick = (val) => {
    setDeleteId([...DeleteId, `${val}`]);
  };

  const handleChange = (state) => {
    setDeleteId(state.selectedRows);
  };
  //  Randomize playlist
  const randomizePlaylist = () => {

    var randomArray = allPlaylistVideosData;
  let currentIndex = allPlaylistVideosData.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [randomArray[currentIndex], randomArray[randomIndex]] = [
      randomArray[randomIndex],
      randomArray[currentIndex],
    ];
  }
  setallPlaylistVideosData(randomArray);
  console.log(allPlaylistVideosData);
};

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/user/getAlldata", {
        headers: { Token: token },
      })
      .then((response) => {

        axios
          .get(process.env.REACT_APP_API_URL + "/manageplaylist/getAlldata")
          .then((playlistResponse) => {
            for (let index = 0; index < playlistResponse.data.length; index++) {
              for (let j = 0; j < response.data.length; j++) {
                // console.log(playlistResponse.data[index].users);
                // console.log(response.data[j]._id);
                if(playlistResponse.data[index].users[0] == response.data[j]._id ){
                  playlistResponse.data[index].user_ = response.data[j].username;
                }
                if (
                  playlistResponse.data[index].users[index] ==
                  response.data[j].users
                ) {
                  playlistResponse.data[j].allUsers = response.data[j].username;
                  var count = 0;
                  setallPlaylistVideosData( playlistResponse.data[j].videos);
                  allPlaylistVideosData.forEach((element, index) => {
                    count = count + parseInt(element.duration);
                    playlistResponse.data[j]["allVideoLength"] = [];
                  });
                  playlistResponse.data[j].allVideoLength = count;
                }
              }
              playlistResponse.data[index].id = index + 1;
              setallPlaylistData(playlistResponse.data);
            }
          });
      });
  }, []);

console.log(allPlaylistData);
  const deleteMultipleDeletePlaylist = () => {
    if (DeleteId.length == 0) {
      toast.warning("Please Select Playlist to Delete");
    } else {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .post(
              process.env.REACT_APP_API_URL +
                "/manageplaylist/deleteMultiplePlaylist",
              {
                ids: DeleteId,
              }
            )
            .then((res) => {
              toast.success("Delete Successfully", {});
            })
            .catch((err) => {
              console.log("err");
            });
        }
      });
    }
  };

  const columns = [
    {
      id: 1,
      name: "USER",
      selector: (row) => row.user_,
      sortable: true,
      reorder: true,
    },
    {
      id: 2,
      name: "TITLE",
      selector: (row) => (
        <>
          {row.videos.length.length == 0 ? (
            <div
              className="w-100"
              style={{ height: "100%", background: "#fff" }}
            >
              <img
                src=""
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
          {row.videos.length == 1 ? (
            <div
              className="w-100"
              style={{ height: "100%", background: "#fff" }}
            >
              <img
                src={row.videos[0].thumbnail}
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
          {row.videos.length == 2 ? (
            <div className="row">
              <div className="col-6 p-0">
                <img
                  src={row.videos[0].thumbnail}
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%" }}
                />
              </div>
              <div className="col-6 p-0">
                <img
                  src={row.videos[1].thumbnail}
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%" }}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          {row.videos.length == 3 ? (
            <div className="row mt-3">
              <div className="col-6 p-0">
                <img
                  src={row.videos[0].thumbnail}
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%" }}
                />
              </div>
              <div className="col-6 p-0">
                <img
                  src={row.videos[1].thumbnail}
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%" }}
                />
              </div>
              <div className="col-6 p-0">
                <img
                  src={row.videos[2].thumbnail}
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%" }}
                />
              </div>
              <div className="col-6 p-0">
                <img
                  src="https://img.youtube.com/vi/%3Cvideo_id%3E/mqdefault.jpg"
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%" }}
                />
              </div>
            </div>
          ) : (
            ""
          )}
          {row.videos.length >= 4 ? (
            <div className="row mt-2">
              <div className="col-6 p-0">
                <img
                  src={row.videos[0].thumbnail}
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%" }}
                />
              </div>
              <div className="col-6 p-0">
                <img
                  src={row.videos[1].thumbnail}
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%" }}
                />
              </div>
              <div className="col-6 p-0">
                <img
                  src={row.videos[2].thumbnail}
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%" }}
                />
              </div>
              <div className="col-6 p-0">
                <img
                  src={row.videos[3].thumbnail}
                  className="img-fluid"
                  style={{ display: "inline-block", width: "100%" }}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </>
      ),
      sortable: true,
      reorder: true,
    },
    {
      id: 3,
      name: "PLAYS / LIKES",
      selector: (row) => (
        <>
          {row.videos[0] ? row.videos[0].views + "/" + row.videos[0].likes : ""}
        </>
      ),
      sortable: true,
      reorder: true,
    },
    {
      id: 4,
      name: "LENGTH",
      selector: (row) => (
        <>{moment.utc(row.allVideoLength * 1000).format("HH:mm:ss")}</>
      ),
      sortable: true,
      reorder: true,
    },
    {
      id: 5,
      name: "URL",
      selector: (row) => (
        <>
          <div className="row">
            <div className="col">
              <textarea cols="21" rows="6">
                {"http://190.92.153.226:3000/playlist?id=" + row._id}
              </textarea>
            </div>
          </div>
        </>
      ),
      sortable: true,
      reorder: true,
    },
    {
      id: 6,
      name: "",
      cell: (row) => (
        <>
          <div className="row">
            <div className="col mb-2">
              <button
                className="btn backgroundButton border-white"
                style={{ width: "140px" }}
              >
                <i style={{ color: "white", fontSize: "1rem" }}>CSV REPLACE</i>
              </button>
            </div>
            <input
              style={{
                opacity: "0",
                zIndex: "1",
                position: "absolute",
                width: "86%",
              }}
              accept=".csv"
              onChange={(e) => {
                uploadFile(e);
                setUpdateId(row._id);
              }}
              type="file"
              className="form-control"
            />
            <div className="col mb-2">
              <button
                onClick={randomizePlaylist}
                className="btn backgroundButton border-white"
                style={{ width: "140px" }}
              >
                <i style={{ color: "white", fontSize: "1rem" }}>RANDOMIZE</i>
              </button>
            </div>
          </div>
        </>
      ),
    },
  ];

  const [addPlayListModelshow, SetaddPlayListModelshow] = useState(false);
  const handlePlaylistModelShow = (opr) => {
    SetaddPlayListModelshow(true);
    setOpration(opr);
    if (opr == "add") setPlayListName("");
  };
  const [uploadProfileLoader, setUploadProfileLoader] = useState(false);
  const uploadFile = (event) => {
    setUploadProfileLoader(true);

    const formdata = new FormData();
    formdata.append("avtar", event.target.files[0]);
    formdata.append(
      "userId",
      JSON.parse(sessionStorage.getItem("userDetails")).user_id
    );
    console.log(formdata);
    axios
      .post(
        process.env.REACT_APP_API_URL + "/playlist/importCsv",
        formdata,
        { userId: JSON.parse(sessionStorage.getItem("userDetails")).user_id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        if (res.data.length != 0) setUploadProfileLoader(false);
        toast.success("File Imported Successfully", {});
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [FilterText, setFilterText] = useState("");

  const setSearchWord = (val) => {
    setFilterText(val);
  };

  // console.log(allPlaylistData);

  return (
    <div className="card radius-10" style={{ width: "100%", margin: "auto" }}>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 row-group g-0">
        <div
          style={{ borderRadius: "15px 15px 0px 0px" }}
          className="card-body cardHeader"
        >
          <h5 style={{ marginTop: "-10px" }}>Manage Playlists</h5>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 row-group g-0">
        <div className="card-body" style={{ height: "auto" }}>
          <div className="row">
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6 style={{ marginTop: "-8px" }} className="">
                    <input
                      className="InputBox"
                      type="text"
                      placeholder="SEARCH PLAYLIST OR USER"
                      onChange={(e) => {
                        setSearchWord(e.target.value);
                      }}
                      id="search"
                    />
                  </h6>
                </div>
              </div>
            </div>
            <div
              className="col-md-4"
              onClick={() => {
                {
                  showAllPlaylist == false
                    ? SetshowAllPlaylist(true)
                    : SetshowAllPlaylist(false);
                }
              }}
            >
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6 style={{ marginTop: "-8px" }} className="">
                    {showAllPlaylist ? "SHOW" : "HIDE"} ALL PLAYLISTS A-Z
                  </h6>
                </div>
              </div>
            </div>
            <div onClick={deleteMultipleDeletePlaylist} className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6 style={{ marginTop: "-8px" }} className="">
                    DELETE SELECTED PLAYLIST
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6 style={{ marginTop: "-8px" }} className="">
                    ADD TO "RANDOM" POOL
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6 style={{ marginTop: "-8px" }} className="">
                    ADD TO "MORE" POOL
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className=" card-body cardColumn">
                <div className="text-white">
                  <h6 style={{ marginTop: "-8px" }} className="">
                    SET SELECTED TO HOME PLAY
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <div className={showAllPlaylist ? "row mt-3 d-none" : "row mt-5 "}>
            <DataTable
              style={{ background: "transparent" }}
              title=""
              columns={columns}
              data={allPlaylistData}
              defaultSortFieldId={1}
              sortIcon={<ArrowUpwardIcon />}
              pagination
              selectableRows
              onSelectedRowsChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Manageplaylist;
