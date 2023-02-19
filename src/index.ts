import express from "express";
import { FaceMesh } from "@mediapipe/face_mesh";
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.raw({ type: "video/mp4", limit: "250mb" }));


app.post(`/api/warp`, async (req, res) => {
  const videoBuffer = req.body;
  res.writeHead(200, {
    "Content-Disposition": "attachment; filename=" + `result.mp4`,
    "Content-Type": "application/octet-stream",
  });
  res.end(videoBuffer);
});

app.listen(3000, () => {
  console.log("Server started!");
});
