import express from "express";
import router from "./router/index.js";

const app = express();
const HOST = "127.0.0.1";
const PORT = 7000;

app.use("/", router);

try {
  app.listen(PORT, HOST, () => {
    console.log(`Server listens http://${HOST}:${PORT}`);
  });
} catch (error) {
  if (error instanceof Error) {
    console.log("Server start is failed: ", error.message);
  }
}
