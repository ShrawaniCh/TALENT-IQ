import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
const app = express();

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

const __dirname = path.resolve();

// Make Out App Ready for Deployment

if (ENV.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(ENV.PORT, () => console.log("server is running on port:", ENV.PORT));
