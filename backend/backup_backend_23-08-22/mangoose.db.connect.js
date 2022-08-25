const mongoose = require("mongoose");

function mongooseConnectDB() {
  mongoose
    .connect("mongodb://localhost/oatvadmindb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then((result) =>
      ""
    )
    .catch((err) => console.log("error connecting to the database", err));
}

module.exports = mongooseConnectDB;