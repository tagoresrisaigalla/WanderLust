const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");


const listingControl = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router
    .route("/")
    .get(wrapAsync(listingControl.index)) //Index Route
    .post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingControl.createListing)); //Create Route

//New Route
router.get("/new",isLoggedIn,listingControl.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(listingControl.showListing))  //Show Route
    .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingControl.updateListing)) //Update Route
    .delete(isLoggedIn,isOwner,wrapAsync(listingControl.destroyListing));  //Delete Route





//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingControl.renderEditForm));

module.exports = router;