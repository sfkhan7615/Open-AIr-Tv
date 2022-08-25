import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import { toast } from "react-toastify";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const axios = require("axios");

function Manageplaylist() {
  const navigate = useNavigate();
  const [allPlaylistData, setallPlaylistData] = useState([]);
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
  console.log(DeleteId);

  // console.log(DeleteId);
  function callPlaylistData() {
    axios
      .get(process.env.REACT_APP_API_URL + "/manageplaylist/getAlldata")
      .then((response) => {
        for (let index = 0; index < response.data.length; index++) {
          response.data[index].id = index + 1;
          setallPlaylistData(response.data);
          // console.log(response.data);
        }
      });
  }

  useEffect(() => {
    callPlaylistData();
  }, []);

  const deletePlayList = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .post(process.env.REACT_APP_API_URL + "/manageplaylist/delete", {
            ids: id,
          })
          .then((res) => {
            toast.success("Delete Successfully", {});
            callPlaylistData();
          })
          .catch((err) => {
            if (
              err.response &&
              err.response.data &&
              err.response.data.errorMessage
            ) {
              toast.error(err.response.data.errorMessage, {});
            }
          });
      }
    });
  };

  const deleteMultipleDeletePlaylist = () => {
    console.log(DeleteId);
    if (DeleteId.length == 0) {
      toast.warning("Please Select Playlist to Delete");
    } else {
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
  };



  const columns = [
    {
      id: 2,
      name: "USER",
      selector: (row) => row.users,
      sortable: true,
      reorder: true,
    },
    {
      id: 3,
      name: "TITLE",
      selector: (row) => row.title,
      sortable: true,
      reorder: true,
    },
    {
      id: 4,
      name: "PLAYS / LIKES",
      selector: (row) => <>68/108</>,
      sortable: true,
      reorder: true,
    },
    {
      id: 5,
      name: "LENGTH",
      selector: (row) => <>04:23:00</>,
      sortable: true,
      reorder: true,
    },
    {
      id: 6,
      name: "URL",
      selector: (row) => (
        <>
          <div className="row">
            <div className="col">
              <textarea cols="23" rows="8">
                {"http://190.92.153.226:3000/playlist?id=" + row._id}
              </textarea>
            </div>
          </div>
        </>
      ),
      sortable: true,
      reorder: true,
    },
    // { id: 4, name: "", cell: (row) => "" },
    // {
    //   id: 6,
    //   name: "Action",
    //   button: true,
    //   cell: (row) => (
    //     <React.Fragment>
    //       <Button
    //         onClick={() => deletePlayList(row._id)}
    //         className="btn btn-sm btn-light"
    //       >
    //         <i className="bx bx-trash me-0"></i>
    //       </Button>
    //       &nbsp;
    //       <Button
    //         onClick={() => {
    //           setuser(row.user);
    //           setPlayListName(row.title);
    //           setUpdateId(row._id);
    //           handlePlaylistModelShow("update");
    //         }}
    //         className="btn btn-sm btn-light"
    //       >
    //         <i className="lni lni-pencil-alt me-0"></i>
    //       </Button>
    //       &nbsp;
    //     </React.Fragment>
    //   ),
    // },
    {
      id: 7,
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
                className="btn backgroundButton border-white"
                style={{ width: "140px" }}
              >
                <i style={{ color: "white", fontSize: "1rem" }}>RANDMOIZE</i>
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
  const [FilterText , setFilterText] = useState("")

  const setSearchWord = (val) => {
    setFilterText(val);
  }
  return (
    <div className="card radius-10" style={{ width: "90%", margin: "auto" }}>
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
                    <input className="InputBox" type="text" placeholder="SEARCH PLAYLIST OR USER"  onChange={(e) => {setSearchWord(e.target.value)}} id="search" />
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
                    SET SELECTRD TO HOME PLAY
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
