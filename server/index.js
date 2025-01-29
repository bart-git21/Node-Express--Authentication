import express, { urlencoded } from "express";
import router from "./router/index.js";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 7000;
const corsOption = {
  origin: process.env.URL, // allow the 'https://client-domain.com' to send requests
  credentials: true, // allow the browser to include cookies & auth.headers
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", router);

app.get("/", (req, res) => {
  res.status(200).send("Authentication application");
});

try {
  app.listen(PORT, HOST, () => {
    console.log(`Server listens http://${HOST}:${PORT}`);
  });
} catch (error) {
  if (error instanceof Error) {
    console.log("Server start is failed: ", error.message);
  }
}
