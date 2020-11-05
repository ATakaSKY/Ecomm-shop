import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

import User from "../models/userModel.js";

const protect = expressAsyncHandler(async (req, res, next) => {
  let token = req?.headers?.authorization?.split(" ")[1] || undefined;
  console.log(req.headers);

  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export default protect;
export { isAdmin };
