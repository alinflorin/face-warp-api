import express from "express";
import bodyParser from "body-parser";
import ffmpeg from "fluent-ffmpeg";
import {FaceMesh} from "@mediapipe/face_mesh";
import { loadGraphModel, Tensor } from "@tensorflow/tfjs-node";

(async () => {
  try {
    (global as any).navigator = {
      userAgent: "",
    };
    const app = express();
    app.use(bodyParser.raw({ type: "video/mp4", limit: "250mb" }));

    const faceMesh = new FaceMesh({});
    faceMesh.setOptions({
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    app.post(`/api/warp`, async (req, res) => {
      // const model = await loadGraphModel(
      //   "file://./models/face_landmark/model.json"
      // );

      const input: Buffer = req.body;

      res.setHeader("Content-Type", "video/mp4");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${req.body.filename}`
      );

      res.send("ok");
    });

    app.listen(3000, () => {
      console.log("Server started!");
    });
  } catch (err) {
    console.error(err);
  }
})();
