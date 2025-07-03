import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    comment : {
        type: String
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    createdAt : {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Review = model("Review", reviewSchema);
export default Review;