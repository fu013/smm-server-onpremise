const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.accessKey,
  secretAccessKey: process.env.secretKey,
  region: "ap-northeast-2",
});
const s3 = new AWS.S3();

async function s3query(req, res) {
  const gmt = new Date();
  const now = new Date(gmt.getTime() + gmt.getTimezoneOffset() * 60000); // UTC 시간
  const year = now.getFullYear().toString().slice(2, 4);

  const params = {
    Bucket: "ssrg-log",
    Prefix: `${year}/`, // prefix가 아닌 Prefix임
  };
  s3.listObjects(params, function (err, data) {
    if (err) {
      throw err;
    }
    res.json(data.Contents);
  });
}

async function s3download(req, res) {
  const fileName = req.query.fileName;
  try {
    const signedUrl = s3.getSignedUrl("getObject", {
      Bucket: "ssrg-log",
      Key: fileName,
      Expires: 15,
    });
    res.json(signedUrl);
  } catch (e) {
    throw e;
  }
}

async function s3search(req, res) {
  const year = req.query.year;
  let doy = req.query.doy;
  if (doy < 10) {
    doy = "00" + doy;
  } else if (doy < 100) {
    doy = "0" + doy;
  }

  const params = {
    Bucket: "ssrg-log",
    Prefix: `${year}/SSRG${doy}`,
  };

  try {
    s3.listObjects(params, function (err, data) {
      if (err) {
        throw err;
      }
      res.json(data.Contents);
    });
  } catch (e) {
    throw e;
  }
}

module.exports = {
  s3query,
  s3download,
  s3search,
};
