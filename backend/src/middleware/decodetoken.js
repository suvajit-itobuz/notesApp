import jwt from "jsonwebtoken";
import userSchema from "../models/userSchema.js";

export const decodeToken = async (req, res, next) => {
  let accessToken;
  try {
    const authHeader = req.headers.authorization;

    if (authHeader.includes("Bearer")) {
      accessToken = authHeader.split(" ")[1];
    } else {
      accessToken = authHeader;
    }
    if (!accessToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    jwt.verify(
      accessToken,
      process.env.TOKEN_SECRET,
      async (error, decoded) => {
        if (error) {
          if (error.message == "jwt expired") {
            res.status(401).json({
              message: "token expired ,refresh and generate new token",
              error: error.message,
            });
          }
        } else {
          const { user_id } = decoded;

          const user = await userSchema.findById(user_id);

          if (!user) {
            return res.status(404).json({
              success: false,
              message: "User not found",
            });
          } else {
            req.userId = user_id;
            next();
          }
        }
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Could not Access",
      error: error.message,
    });
  }
};
