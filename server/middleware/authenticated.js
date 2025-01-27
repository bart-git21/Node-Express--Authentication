import jwt from "jsonwebtoken";
import invalidRefreshTokensList from "../../db/invalidToken.js";

const authenticateToken = (req, res, next) => {
  try {
    const authorizationHeaders = req.headers.authorization;
    const accessToken =
      authorizationHeaders && authorizationHeaders.split(" ")[1];
    if (!accessToken) res.status(401).send("Unauthorized");
    //   client fetch("/auth") and get new access token

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) res.status(401).send("Access token is invalid");
      req.user = payload;
      next();
    });
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};
export default authenticateToken;
