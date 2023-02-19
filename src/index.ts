import express from "express";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.raw({ type: "video/mp4", limit: "250mb" }));

app.post(`/api/warp`, async (req, res) => {
  res.send('ok');
});

app.listen(3000, () => {
  console.log("Server started!");
});
