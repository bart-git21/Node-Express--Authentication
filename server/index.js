import express from "express";

const app = express();
const HOST = "127.0.0.1";
const PORT = 7000;

try {
  app.listen(PORT, HOST, () => {
    console.log(`Server listens http://${HOST}:${PORT}`);
  });
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
