import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import customError from "../utils/customError.js";
import { listingSchema } from "../validator.js";
import { isLoggedIn, isOwner } from "../middleware.js";
import { index, renderNewListingForm, createListing, showListing, renderEditListingForm, updateListing, deleteListing } from '../controllers/listing_control.js';
import multer from "multer";
import { storage } from "../cloudConfig.js";

const router = express.Router();
const upload = multer({ storage })

//................................................._Validarion_..............................................
const validateListing = (req, res, next) => {
    console.log("validateListing: req.body", req.body);
    const { error } = listingSchema.validate(req.body);
    if (error) {
        console.log("validateListing error:", error);
        const msg = error.details.map((ele) => ele.message).join(',');
        throw new customError(400, msg);
    }
    next();
}

//................................................._The Routes_..............................................
// Index Route and Create Routes.......
router.route('/')
    .get(wrapAsync(index))
    .post(
        isLoggedIn,
        (req, res, next) => { console.log("Before multer"); next(); },
        upload.single('image'),
        (req, res, next) => { console.log("After multer, req.body:", req.body, "req.file:", req.file); next(); },
        validateListing,
        wrapAsync(createListing)
    );
    
// New Route.......
router.get('/new', isLoggedIn, renderNewListingForm);

// Show, Update and Delete Routes.......
router.route('/:id')
    .get(wrapAsync(showListing))
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(deleteListing));

// Edit Route.......
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(renderEditListingForm));


export default router;