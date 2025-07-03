import Listing from "./models/schema.js";
import Review from "./models/review.js";

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be signed in to do that!");
        return res.redirect("/login");
    }
    next();
}

const saveRedirectUrl = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.locals.redirectUrl = req.session.returnTo;
    }
    next();
};

const isOwner = async (req, res, next) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/Listings/${id}`);
    }
    next();
};

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