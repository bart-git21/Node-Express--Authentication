import jwt from "jsonwebtoken";
import invalidRefreshTokensList from "../../db/invalidToken.js";

const authenticateToken = (req, res, next) => {
  try {
    // const refreshToken = req.cookies.refreshToken;
    // if (!refreshToken) res.status(401).send("Unauthorized");
    // if (invalidRefreshTokensList.includes(refreshToken))
    //   res.status(401).send("Refresh token is invalid");

    const authorizationHeaders = req.headers.authorization;
    const accessToken =
      authorizationHeaders && authorizationHeaders.split(" ")[1];
    if (!accessToken) res.status(401).send("Access token is not found");

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err)
        return res.status(403).send("Middleware. Access token is invalid");
      req.user = payload;
      next();
    });
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};
export default authenticateToken;
