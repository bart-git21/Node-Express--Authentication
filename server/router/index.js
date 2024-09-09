import express from "express";
import controller from "./../controller/index.js";
import authenticateToken from "./../middleware/authenticated.js";
import authorized from "./../middleware/authorized.js"

const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.post("/authentication", controller.login);
router.get("/authentication", controller.refresh);
router.delete("/authentication", controller.logout);

router.post("/users", controller.register);
router.get("/users", authenticateToken, controller.getUser);

router.get("/admin", authenticateToken, authorized(["admin"]), controller.admin);
router.get("/moderator", authenticateToken, authorized(["admin", "moderator"]),controller.moderator);

export default router;
