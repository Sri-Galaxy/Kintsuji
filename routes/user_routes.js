import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import passport from "passport";
import { saveRedirectUrl } from "../middleware.js";
import { createUser, renderLoginForm, renderSignupForm, retrieveUser, logoutUser } from "../controllers/user_control.js";

const router = express.Router();

router.route("/signup")
    .get(renderSignupForm)
    .post(wrapAsync(createUser));

router.route("/login")
    .get(renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), retrieveUser);

router.get("/logout", logoutUser);


export default router;