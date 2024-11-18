const { getSSRG } = require("../lib/getSSRG");

async function events(req, res) {
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.write(`data: ${JSON.stringify(ssrData)}\n\n`);
  setInterval(() => {
    res.write(`data: ${JSON.stringify(ssrData)}\n\n`);
  }, 1000);
}

module.exports = { events };
