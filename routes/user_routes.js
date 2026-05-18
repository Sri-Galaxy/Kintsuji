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
// passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }) is a middleware function provided by Passport.js that handles the authentication process using the "local" strategy.

router.get("/logout", logoutUser);


export default router;

// How req.user is available in the application?
// req.user is made available in the application through the use of the Passport.js authentication middleware.
// When a user successfully authenticates, Passport.js serializes the user information and stores it in the session.
// On subsequent requests, Passport.js deserializes the user information from the session and attaches it to the req object as req.user.
// This allows the application to access the authenticated user's information in any route handler or middleware that follows the authentication process.