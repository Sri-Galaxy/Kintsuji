import joi from 'joi';

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