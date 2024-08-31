import express from "express";
import controller from "./../controller/index.js";
import isAuthorized from "./../middleware/authorization.js";

const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.post("/authentication", controller.login);
router.get("/authentication", controller.refresh);
router.delete("/authentication", isAuthorized, controller.logout);
router.post("/protectedRoute", isAuthorized, controller.protectedRoute);

export default router;
