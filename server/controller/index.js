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
  register(req, res) {
    //   client fetch body {login, password}
    try {
      const { login, password } = req.body;

      if (!login || !password) res.status(422).send("Data is empty or invalid");
      if (users.find((e) => e.login === login))
        res.status(400).send("The name/email is already taken");

      users.push({ id: 3, login, password, role: "user" });
      res.status(201);
    } catch (err) {
      console.log(err);
    }
  },
  login(req, res) {
    //   client fetch body {login, password}
    try {
      const { login, password } = req.body;
      const user = users.find(
        (e) => e.login === login && e.password === password
      );
      if (!user) res.status(400).send("User not found");
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      refreshTokens.push(refreshToken);
      console.log("refreshToken", refreshToken);
      console.log("accessToken", accessToken);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "Strict",
      });
      res.status(200).json({ accessToken });
      //   client localStorage.setItem("accessToken", accessToken);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  },
  token(req, res) {
    const token = req.cookies.refreshToken;
    if (!token)
      res.status(401).send("Refresh token is not found. You need to sign in");
    if (invalidRefreshTokensList.includes(token))
      res.status(401).send("Refresh token is invalid. You need to sign in");
    if (!refreshTokens.includes(token))
      res.status(403).send("Refresh token is expired. You need to sign in");

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) res.status(403).send("Refresh token is invalid");
      const accessToken = generateAccessToken(payload);
      res.status(200).json({ accessToken });
      //   client localStorage.setItem("accessToken", accessToken);
      //   client again fetch("/users", body:{id:1});
    });
  },
  logout(req, res) {
    //   client localStorage.removeItem("accessToken");
    try {
      const refreshToken = req.cookies.refreshToken;
      const index = refreshTokens.findIndex((e) => e === refreshToken);
      refreshTokens.splice(index, 1);
      invalidRefreshTokensList.push(refreshToken);
      res.status(204).clearCookie("refreshToken");
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    }
  },
  //   user
  getUser(req, res) {
    //   client fetch("/users", headers: Authorization: Bearer <access_token>, body:{id:1});
    try {
      const id = users.find((e) => e.id === req.user.id).id;
      res.status(200).json("some data");
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
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
