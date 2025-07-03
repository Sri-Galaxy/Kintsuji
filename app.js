//................................................._Imports_...................................................
import 'dotenv/config';
import express from "express";
import { connect } from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import methodOverride from "method-override";
import ejsMate from 'ejs-mate';
import customError from "./utils/customError.js";
import listing_routes from "./routes/listing_routes.js";
import review_routes from "./routes/review_routes.js";
import user_routes from "./routes/user_routes.js";
import session from "express-session";
import MongoStore from 'connect-mongo';
import flash from "connect-flash";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "./models/user.js";


//................................................._App_.......................................................
const app = express();
app.engine('ejs', ejsMate);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

//Middlewares.......
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
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

//Passport Middleware Configuration.......
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Custom Middleware.......
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
app.all('*', (req, res, next) => {
  next(new customError(404, 'Page Not Found!'));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = 'Something went wrong!' } = err;
  res.status(statusCode).render('listings/error.ejs', { statusCode, message });
});


//........................................._Listening to the Server_...........................................
app.listen(port, () => {
  console.log(`Server is running on port ${port}\n`);
});
