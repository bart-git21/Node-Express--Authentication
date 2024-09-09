import jwt from "jsonwebtoken";
import users from "../../db/users.js";
import refreshTokens from "../../db/tokenList.js";
import invalidRefreshTokensList from "../../db/invalidToken.js";

function generateAccessToken(payload) {
  return jwt.sign({ id: payload.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}
function generateRefreshToken(payload) {
  return jwt.sign({ id: payload.id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "15d",
  });
}

const controller = {
  login(req, res) {
    try {
      // TODO. check if fields are not empty. 422 status
      // TODO. check if user exists and password matches. 401 status
      const activeUser = users[2];
      const accessToken = generateAccessToken(activeUser);
      const refreshToken = generateRefreshToken(activeUser);
      refreshTokens.push(refreshToken);
      console.log("refreshToken", refreshToken);
      console.log("accessToken", accessToken);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "Strict",
      });
      res.status(200).json({ accessToken });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  },
  refresh(req, res) {
    const token = req.cookies.refreshToken;
    if (!token)
      return res
        .status(401)
        .send("Refresh token is not found. You need to sign in");
    if (!refreshTokens.includes(token))
      return res
        .status(403)
        .send("Refresh token is expired.You need to sign in");

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) return res.status(403).send("Refresh token is invalid");
      const accessToken = generateAccessToken(payload);
      res.json({ accessToken });
    });
  },
  logout(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const index = refreshTokens.findIndex((e) => e === refreshToken);
      refreshTokens.splice(index, 1);
      invalidRefreshTokensList.push(refreshToken);
      res
        .status(204)
        .clearCookie("refreshToken");
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  },
  register(req, res) {
    try {
      const newUser = {
        id: 3,
        login: "john",
        password: "789",
        role: "moderator",
      };
      // TODO. check if fields are not empty. 422 status
      // TODO. check if user exists. 400 status
      // TODO. check if email/login exists. 400 status

      users.push(newUser);
      return res.status(201).json(newUser);
    } catch (err) {
      console.log(err);
    }
  },
  getUser(req, res) {
    try {
      const user = users.find((e) => e.id === req.user.id);
      res.status(200).json(user);
    } catch (err) {
      return console.error(err);
    }
  },
  admin(req, res) {
    try {
      res.status(200).json({ id: req.user.id });
    } catch (err) {
      console.error(err);
    }
  },
  moderator(req, res) {
    try {
      res.status(200).send(`Hello admin or moderator`);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  },
};
export default controller;
