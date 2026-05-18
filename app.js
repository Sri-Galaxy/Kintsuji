//................................................._Imports_...................................................
import 'dotenv/config';

import express from "express";
import session from "express-session";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { connect } from "mongoose";
import MongoStore from 'connect-mongo';
import User from "./models/user.js";

import methodOverride from "method-override";
import ejsMate from 'ejs-mate';
import flash from "connect-flash";

import customError from "./utils/customError.js";

import listing_routes from "./routes/listing_routes.js";
import review_routes from "./routes/review_routes.js";
import user_routes from "./routes/user_routes.js";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";


//................................................._App_.......................................................
const app = express();
app.engine('ejs', ejsMate);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// This is the session store configuration for storing session data in MongoDB using connect-mongo. 
// It creates a new MongoStore instance with the specified options 
// Including the MongoDB connection URL, encryption secret, and touchAfter option to control how often the session is updated in the database. 
// The store.on("error") event listener is set up to log any errors that occur with the session store.
const store = MongoStore.create({
  mongoUrl: process.env.ATLAS_URL,
  crypto: {
    secret: process.env.SECRET
  },
  touchAfter: 24 * 3600,
});

store.on("error", function (e) {
  console.log("Session Store Error", e);
});

// This is the session configuration object that is passed to the express-session middleware.
// req.session will be available because of this middleware
// allowing the application to manage user sessions and store session data in the MongoDB database using the configured session store.
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares.......
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// It allows the application to manage user sessions, which can be used for authentication and storing user-specific data across multiple requests.
app.use(session(sessionOptions));                         
app.use(flash());                                          

const port = 8088;


//..........................................._Database Connection_.............................................
async function main() {
  await connect(process.env.ATLAS_URL);
}

main()
  .then(() => {
    console.log(
      "-------_Superb! Connected to MongoDB_-------\n"
    );
  })
  .catch((err) => {
    console.log(err.message);
  });

//................................................._The Routes_................................................

// Passport Middleware Configuration.......
// passport.initialize() sets up the necessary middleware for handling authentication in the application.
// passport.session() allows Passport to serialize and deserialize user information to and from the session, enabling users to stay logged in across different requests.
// passport.use(new LocalStrategy(User.authenticate())) configures Passport to use the LocalStrategy for authentication
// which is a strategy that authenticates users using a username and password.
// The User.authenticate() method is provided by the passport-local-mongoose package, which simplifies the integration of Passport with Mongoose models.
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Custom Middleware.......
// This middleware function is executed for every incoming request to the application.
// It sets up some local variables that can be accessed in the views (EJS templates) to display flash messages and the current user information.
// res.locals.currentUser is set to the value of req.user, which contains the authenticated user's information if they are logged in.
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.user;
  next();
});

//Listings routes........
app.use('/Listings', listing_routes);

//Reviews routes.........
app.use('/Listings/:id/reviews', review_routes);

//User routes...........
app.use('/', user_routes);

//................................................_Error Handling_.............................................
// This route handler is defined to catch all requests that do not match any of the defined routes in the application.
app.all('*', (req, res, next) => {
  next(new customError(404, 'Page Not Found!'));
});

// This is an error-handling middleware function that is defined to handle any errors that occur during the processing of requests in the application.
// It takes four parameters: err, req, res, and next. The err parameter contains the error object that was passed to the next() function in the previous middleware or route handler.
app.use((err, req, res, next) => {
  let { statusCode = 500, message = 'Something went wrong!' } = err;
  res.status(statusCode).render('listings/error.ejs', { statusCode, message });
});


//........................................._Listening to the Server_...........................................
app.listen(port, () => {
  console.log(`Server is running on port ${port}\n`);
});
