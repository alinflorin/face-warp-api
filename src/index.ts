import express from "express";
import bodyParser from "body-parser";

(async () => {
  try {
    const app = express();
    app.use(bodyParser.raw({ type: "video/mp4", limit: "250mb" }));

    app.post(`/api/warp`, async (req, res) => {
      
    });

    app.listen(3000, () => {
      console.log("Server started!");
    });
  } catch (err) {
    console.error(err);
  }
})();
