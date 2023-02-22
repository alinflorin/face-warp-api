import express from "express";
import bodyParser from "body-parser";
import ffmpeg from "fluent-ffmpeg";
import { PassThrough } from "stream";

(async () => {
  try {
    const app = express();
    app.use(bodyParser.raw({ type: "video/mp4", limit: "250mb" }));

    app.post(`/api/pitch`, async (req, res) => {
      try {
        const inputStream = new PassThrough();

        // Create the ffmpeg command and specify the pitch modification
        const command = ffmpeg(inputStream)
          .audioFilter("asetrate=44100*1.5,atempo=0.6666666667")
          .audioCodec("aac")
          .videoCodec("copy")
          .format("mp4")
          .outputOptions("-movflags frag_keyframe+empty_moov+default_base_moof")
          .on("error", (err) => {
            console.error(err);
            res.status(500).send("An error occurred");
          });

        // Set response headers for streaming the result
        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader("Content-Disposition", "attachment; filename=result.mp4");

        // Pipe the output of ffmpeg to the response
        command.pipe(res);

        // Read the video data from the request and pipe it to the input stream
        inputStream.end(req.body);

        // Handle errors
        req.on("error", (err) => {
          console.error(err);
          res.status(500).send("An error occurred");
        });
      } catch (err) {
        res.status(500).send("Error!");
      }
    });

    app.listen(3000, () => {
      console.log("Server started!");
    });
  } catch (err) {
    console.error(err);
  }
})();
