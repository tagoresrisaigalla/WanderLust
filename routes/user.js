const express = require('express');
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware');

const usersController = require('../controllers/users');

router
    .route('/signup')
    .get(usersController.renderSignupForm) //Render Signup Form
    .post(wrapAsync(usersController.signup)); //Handle Signup Form Submission

router
    .route('/login')
    .get(usersController.renderLoginForm) //Render Login Form
    .post( 
        saveRedirectUrl, 
        passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), 
        wrapAsync(usersController.login)
    ); //Handle Login Form Submission

router.get("/logout", usersController.logout);

module.exports = router;