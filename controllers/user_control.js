import User from "../models/user.js";

const renderSignupForm = (req, res) => {
    res.render("users/sign-up.ejs");
}

const createUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });

        // The User.register() method is provided by the passport-local-mongoose package, which simplifies the integration of Passport with Mongoose models.
        // It takes care of hashing the password and storing the user information in the database.
        const registeredUser = await User.register(newUser, password);

        // req.login() is a Passport.js method that is used to log in a user after they have been registered or authenticated.
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to the app, " + registeredUser.username + "!");
            res.redirect("/Listings");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}

const renderLoginForm = (req, res) => {
    res.render("users/log-in.ejs");
}

const retrieveUser = async (req, res) => {
    req.flash("success", "Welcome back, " + req.user.username + "!");
    res.redirect(res.locals.redirectUrl || "/Listings");
}

const logoutUser = (req, res) => {
    // req.logout() is a Passport.js method that is used to log out a user by terminating their session
    // and removing the user information from the req.user property.
    // Session stores the session data in the MongoDB database using the configured session store, allowing the application to manage user sessions and store session data across multiple requests.
    // When req.logout() is called, it will remove the user information from the session and effectively log the user out of the application.
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out successfully!");
        res.redirect("/Listings");
    });
}

export { renderSignupForm, createUser, renderLoginForm, retrieveUser, logoutUser };