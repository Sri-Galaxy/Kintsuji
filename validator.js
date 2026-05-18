import joi from 'joi';

// Eliminate manual validation in the routes by using joi 
// to validate the request body against a defined schema. 
// This ensures that the data being sent to the server is in the correct format 
// meets the required criteria before it is processed.

const listingSchema = joi.object({
    title: joi.string().required(),
    price: joi.number().required().min(0),
    description: joi.string().required(),
    location: joi.string().required(),
    country: joi.string().required(),
    category: joi.string().valid(
        'Trending',
        'Rooms',
        'Cities',
        'Beach',
        'Camping',
        'Mountains',
        'Farm',
        'Castles',
        'Boats',
        'Arctic'
    ).required(),
    image: joi.any()
});

const reviewSchema = joi.object({
    rating: joi.number().min(1).max(5),
    comment: joi.string().required()
});

export { listingSchema, reviewSchema };