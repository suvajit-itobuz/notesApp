import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import { verifyToken, verifyRefreshToken } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { signinUser, signupUser } from "../validators/dataValidation.js";
import { generateAccessToken } from "../emailVerify/generateAcesstoken.js";
import { isLoggedIn } from "../middleware/isloggedin.js";

const route = express.Router();

route.get("/verify", verifyToken);
route.post("/register", validate(signupUser), registerUser);
route.post("/login", validate(signinUser), loginUser);
route.patch("/logout", isLoggedIn, logoutUser);
route.get('/getAccessToken', verifyRefreshToken, isLoggedIn, generateAccessToken)

export default route;
