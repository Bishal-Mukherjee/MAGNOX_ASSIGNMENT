const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json({ extended: false }));
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://bishal123:PcFDRUkvSUdde9wb@cluster0.nxjhs.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((err) => {
    console.log("DATABASE ERROR");
    console.log(err);
  });

const PORT = 8080;

app.use("/api/user", require("./routes/user"));
app.listen(PORT, function () {
  console.log("Server running at http://localhost:" + PORT);
});
