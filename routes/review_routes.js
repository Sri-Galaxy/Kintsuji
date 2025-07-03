import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import customError from "../utils/customError.js";
import { reviewSchema } from "../validator.js";
import { isLoggedIn, isAuthor } from "../middleware.js";
import { createReview, deleteReview } from "../controllers/review_control.js";

const router = express.Router({mergeParams: true});

//................................................._Validarion_..............................................
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((el) => el.message).join(',');
        throw new customError(400, msg);
    }
    next();
}

//................................................._The Routes_.............................................
//Reviews...Post.......
router.post('/', isLoggedIn, validateReview, wrapAsync(createReview));

//Review...Delete....
router.delete('/:rid', isLoggedIn, isAuthor, wrapAsync(deleteReview)); 

export default router;