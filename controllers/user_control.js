import User from "../models/user.js";

const renderSignupForm = (req, res) => {
    res.render("users/sign-up.ejs");
}

const createUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

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
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out successfully!");
        res.redirect("/Listings");
    });
}

export { renderSignupForm, createUser, renderLoginForm, retrieveUser, logoutUser };