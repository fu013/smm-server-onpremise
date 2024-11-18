const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const { getSSRG } = require("./src/lib/getSSRG");

global.ssrData = "";

let corsOptions;
if (process.env.NODE_ENV === "production") {
  corsOptions = {
    origin: ["https://smm.gnsson.com"],
    credentials: false,
  };
} else if (process.env.NODE_ENV === "development") {
  corsOptions = {
    origin: [
      "http://localhost",
      "http://192.168.0.236:3000",
      "http://222.112.13.199:30001",
    ],
    credentials: false,
  };
}

app.use(cors(corsOptions));
app.use("/api", require("./src/api"));

const server = app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});

setInterval(async () => {
  await getSSRG().then((item) => {
    ssrData = item;
  });
}, 1000);
