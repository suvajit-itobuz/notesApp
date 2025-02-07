import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const generateToken = (user_id, expire_time) => {
  const generatedToken = jwt.sign({ user_id }, process.env.TOKEN_SECRET, {
    expiresIn: expire_time,
  });
  return generatedToken;
};

export const generateAccessToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    let refreshToken;

    if (authHeader.includes("Bearer")) {
      refreshToken = authHeader.split(" ")[1];
    } else {
      refreshToken = authHeader;
    }

    if (!refreshToken) {
      console.log("refresh token not availbale");
      return res.status(401).json({ error: "Unauthorized" });
    }
    const newAccessToken = generateToken(req.userId, process.env.EXPIRE_TIME);
    res.status(201).json({
      token: newAccessToken,
      refreshToken: refreshToken,
      success: true,
      message: "access token generated succesfully",
    });
  } catch (error) {
    res.json({
      status: 401,
      message: "error generating access token",
      error: error.message,
    });
  }
};
