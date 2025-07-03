const sampleListings = [
    {
        title: "Cozy Beachfront Cottage",
        description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
        image: {
            url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
            filename: "photo-1552733407-5d5c46c3bb3b"
        },
        price: 1500,
        location: "Malibu",
        country: "United States",
        owner: "684c3d517a168985ece575c7"
    },
    {
        title: "Modern Loft in Downtown",
        description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
        image: {
            url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
            filename: "photo-1501785888041-af3ef285b470"
        },
        price: 1200,
        location: "New York City",
        country: "United States",
        owner: "684c3d517a168985ece575c7"
    },
    {
        title: "Mountain Retreat",
        description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
        image: {
            url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=60",
            filename: "photo-1571896349842-33c89424de2d"
        },
        price: 1000,
        location: "Aspen",
        country: "United States",
        owner: "684c3def7a168985ece575d3"
    },
    {
        title: "Historic Villa in Tuscany",
        description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
        image: {
            url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
            filename: "photo-1566073771259-6a8506099945"
        },
        price: 2500,
        location: "Florence",
        country: "Italy",
        owner: "684c3def7a168985ece575d3"
    },
    {
        title: "Secluded Treehouse Getaway",
        description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
        image: {
            url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=60",
            filename: "photo-1520250497591-112f2f40a3f4"
        },
        price: 800,
        location: "Portland",
        country: "United States",
        owner: "684c3def7a168985ece575d3"
    },
    {
        title: "Beachfront Paradise",
        description: "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
        image: {
            url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=60",
            filename: "photo-1571003123894-1f0594d2b5d9"
        },
        price: 2000,
        location: "Cancun",
        country: "Mexico",
        owner: "684c3def7a168985ece575d3"
    },
    {
        title: "Rustic Cabin by the Lake",
        description: "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
        image: {
            url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=60",
            filename: "photo-1464822759023-fed622ff2c3b"
        },
        price: 900,
        location: "Lake Tahoe",
        country: "United States",
        owner: "684c3def7a168985ece575d3"
    },
    {
        title: "Luxury Penthouse with City Views",
        description: "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
        image: {
            url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=60",
            filename: "photo-1622396481328-9b1b78cdd9fd"
        },
        price: 3500,
        location: "Los Angeles",
        country: "United States",
        owner: "684c415c7a168985ece57622"
    },
    {
        title: "Ski-In/Ski-Out Chalet",
        description: "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
        image: {
            url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=60",
            filename: "photo-1502784444187-359ac186c5bb"
        },
        price: 3000,
        location: "Verbier",
        country: "Switzerland",
        owner: "684c415c7a168985ece57622"
    },
    {
        title: "Safari Lodge in the Serengeti",
        description: "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
        image: {
            url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=60",
            filename: "photo-1493246507139-91e8fad9978e"
        },
        price: 4000,
        location: "Serengeti National Park",
        country: "Tanzania",
        owner: "684c415c7a168985ece57622"
    },
    {
        title: "Historic Canal House",
        description: "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
        image: {
            url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=60",
            filename: "photo-1504280390367-361c6d9f38f4"
        },
        price: 1800,
        location: "Amsterdam",
        country: "Netherlands",
        owner: "684c415c7a168985ece57622"
    },
    {
        title: "Private Island Retreat",
        description: "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
        image: {
            url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?auto=format&fit=crop&w=800&q=60",
            filename: "photo-1618140052121-39fc6db33972"
        },
        price: 10000,
        location: "Fiji",
        country: "Fiji",
        owner: "684c415c7a168985ece57622"
    },
    {
        title: "Charming Cottage in the Cotswolds",
        description: "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
        image: {
            url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?auto=format&fit=crop&w=800&q=60",
            filename: "photo-1602088113235-229c19758e9f"
        },
        price: 1200,
        location: "Cotswolds",
        country: "United Kingdom",
        owner: "684c415c7a168985ece57622"
    }
];

export const data = sampleListings;  