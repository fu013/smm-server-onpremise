const Redis = require("ioredis");
const config = require("../config");

const getSSRG = async () => {
  const redis = new Redis(config.redis.primary.url);
  const key = "ssrg";
  const [sato, satb, satc, stec, trop] = await Promise.all([
    redis.smembers(`${key}:sato`),
    redis.smembers(`${key}:satb`),
    redis.smembers(`${key}:satc`),
    redis.smembers(`${key}:stec`),
    redis.smembers(`${key}:trop`),
  ]);
  redis.quit();
  return {
    success: 1,
    sato: sato
      .map((e) => e.split(","))
      .map((e) => ({
        gs: parseInt(e[0]),
        prn: parseInt(e[1]),
        iod: parseInt(e[2]),
        rad: parseFloat(e[3]),
        alt: parseFloat(e[4]),
        crt: parseFloat(e[5]),
      })),
    satc: satc
      .map((e) => e.split(","))
      .map((e) => ({
        gs: parseInt(e[0]),
        prn: parseInt(e[1]),
        c0: parseFloat(e[2]),
        c1: parseFloat(e[3]),
        c2: parseFloat(e[4]),
      })),
    satb: satb
      .map((e) => e.split(","))
      .map((e) => ({
        gs: parseInt(e[0]),
        prn: parseInt(e[1]),
        sid: parseInt(e[2]),
        cb: parseFloat(e[3]),
        pb: parseFloat(e[4]),
      })),
    trop: trop
      .map((e) => e.split(","))
      .map((e) => ({
        gs: parseInt(e[0]),
        lat: parseFloat(e[1]),
        lon: parseFloat(e[2]),
        hgt: parseFloat(e[3]),
        tr: parseFloat(e[4]),
        tw: parseFloat(e[5]),
      })),
    stec: stec
      .map((e) => e.split(","))
      .map((e) => ({
        gs: parseInt(e[0]),
        lat: parseFloat(e[1]),
        lon: parseFloat(e[2]),
        hgt: parseFloat(e[3]),
        prn: parseInt(e[4]),
        stec: parseFloat(e[5]),
      })),
    message: "",
  };
};

module.exports = {
  getSSRG,
};
