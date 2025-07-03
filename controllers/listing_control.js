import Listing from '../models/schema.js';

const index = async (req, res) => {
    let filter = {};
    if (req.query.filter) {
        filter.category = req.query.filter;
    }
    if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, 'i');
        filter.$or = [
            { title: searchRegex },
            { description: searchRegex },
            { location: searchRegex },
            { country: searchRegex }
        ];
    }
    const data = await Listing.find(filter);
    res.render('listings/index.ejs', { data });
}

const renderNewListingForm = (req, res) => {
    res.render('listings/new.ejs');
}

const createListing = async (req, res, next) => {
    try {
        const { title, description, location, price, country, category } = req.body;

        const image = req.file
            ? { url: req.file.path, filename: req.file.filename }
            : {};

        const data = new Listing({
            title,
            description,
            location,
            price,
            country,
            category,
            image,
            owner: req.user._id
        });

        await data.save();

        req.flash('success', 'Listing created successfully!');
        res.redirect('/Listings');
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const showListing = async (req, res) => {
    let { id } = req.params;
    const data = await Listing.findById(id).populate({path: 'reviews', populate: {path: 'author'}}).populate('owner');
    if (!data) {
        req.flash('error', 'Listing not found!');
        return res.redirect('/Listings');
    }
    res.render('listings/show.ejs', { data });
}

const renderEditListingForm = async (req, res) => {
    let { id } = req.params;
    const data = await Listing.findById(id);

    if (!data) {
        req.flash('error', 'Listing not found!');
        return res.redirect('/Listings');
    }
    res.render('listings/edit.ejs', { data });
}

const updateListing = async (req, res) => {
    let { id } = req.params;
    const { title, description, location, price, country, image } = req.body;

    await Listing.findByIdAndUpdate(id, {
        title: title,
        description: description,
        location: location,
        price: price,
        country: country,
        image: image
    });
    req.flash('success', 'Listing updated successfully!');
    res.redirect(`/Listings/${id}`);
}

const deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success', 'Listing deleted successfully!');
    res.redirect('/Listings');
}

export { index, renderNewListingForm, createListing, showListing, renderEditListingForm, updateListing, deleteListing };
