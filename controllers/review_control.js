import Review from "../models/review.js";
import Listing from '../models/schema.js';

const createReview = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    const { rating, comment } = req.body;
    const review = new Review({ rating, comment });

    review.author = req.user._id;
    listing.reviews.push(review);

    await review.save();
    await listing.save();

    req.flash('success', 'Review added successfully!');
    res.redirect(`/Listings/${id}`);
}

const deleteReview = async (req, res) => {
    let { id, rid } = req.params;

    // The $pull operator is a MongoDB update operator that removes all instances of a specified value from an array.
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: rid } });

    await Review.findByIdAndDelete(rid);

    req.flash('success', 'Review deleted successfully!');
    res.redirect(`/Listings/${id}`);
}

export { createReview, deleteReview };