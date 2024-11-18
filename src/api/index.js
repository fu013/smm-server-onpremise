const express = require("express");
const router = express.Router();
const sse = require("./sse");
const s3 = require("./s3");

router.get("/events", sse.events);

router.get("/s3query", s3.s3query);
router.get("/s3download", s3.s3download);
router.get("/s3search", s3.s3search);
module.exports = router;
