import Listing from "./models/schema.js";
import Review from "./models/review.js";

// passport middleware to check if user is authenticated before allowing access to certain routes. 
// If not authenticated, store the original URL and redirect to login page with an error message.

// passport adds isAuthenticated() method to the request object
// which returns true if the user is authenticated and false otherwise.
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;

        req.flash("error", "You must be signed in to do that!");

        return res.redirect("/login");
    }
    next();
}

// Middleware to save the original URL that the user was trying to access before being redirected to the login page.
const saveRedirectUrl = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.locals.redirectUrl = req.session.returnTo;
    }
    next();
};

// Middleware to check if the current user is the owner of a listing.
const isOwner = async (req, res, next) => {
    const { id } = req.params;

    let listing = await Listing.findById(id);

    if (!listing.owner._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/Listings/${id}`);
    }
    next();
};

// Middleware to check if the current user is the author of a review.
const isAuthor = async (req, res, next) => {
    const { id, rid } = req.params;

    let review = await Review.findById(rid);

    if (!review.author._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/Listings/${id}`);
    }
    next();
};

export { isLoggedIn, saveRedirectUrl, isOwner, isAuthor };