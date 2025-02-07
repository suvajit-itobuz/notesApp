import jwt from "jsonwebtoken";
import user from "../models/userSchema.js";
import userSchema from "../models/userSchema.js";

export const verifyToken = async (req, res) => {
  let  token= req.headers["authorization"];
  
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  token=token.replace('Bearer',"").trim()


  jwt.verify(token, process.env.TOKEN_SECRET, async (error, decoded) => {
    if (error) {
      console.log(error);
      res.send(
        '"Email verification failed, possibly the link is invalid or expired"'
      );
      res.status(401).json({ error: "Unauthorized" });
    } else {
      await user.findOneAndUpdate(
        { _id: decoded.user_id },
        { $set: { verified: "true", token: null } },
        { new: true }
      );
      res.status(200).json({ message:"Email verified successfully"});

    }
  });
};


// verify refresh token

export const verifyRefreshToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let refreshToken;

    if (authHeader.includes("Bearer")) {
      refreshToken = authHeader.split(" ")[1];
    } else {
      refreshToken = authHeader;
    }

    if (!refreshToken) {
      console.log("refresh token not availbale")
      return res.status(401).json({ error: "Unauthorized" });
    }
    jwt.verify(
      refreshToken,
      process.env.TOKEN_SECRET,
      async (error, decoded) => {
        if (error) {
          res.status(401).json({
            message: "refresh token expired",
            error: error.message,
          });
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
    return { success: false, error: error.message };
  }
};

