import express from "express";
import { readBody } from "./read-body";
import { FaceMesh } from "@mediapipe/face_mesh";
// import { } from "@tensorflow/tfjs-node";

const app = express();
app.use(express.json());


app.post(`/api/warp`, async (req, res) => {
  const videoBuffer = await readBody(req);
  res.writeHead(200, {
    "Content-Disposition": "attachment; filename=" + `result.mp4`,
    "Content-Type": "application/octet-stream",
  });
  res.end(videoBuffer);
});

app.listen(3000, () => {
  console.log("Server started!");
});
