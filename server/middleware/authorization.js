export default isAuthorized = (req, res, next) => {
  try {
    next();
  } catch (err) {
    if (err instanceof Error) console.log(err.message);
  }
};
