import users from "./../../db/users.js";

const isAuthorized = (roleList) => {
  return (req, res, next) => {
    try {
      const user = users.find((e) => e.id === req.user.id);
      if (req.user && roleList.includes(user.role)) next();
      res
        .status(403)
        .send("Forbidden: You don't have permissions to access the resource");
    } catch (err) {
      console.error(err);
    }
  };
};

export default isAuthorized;
