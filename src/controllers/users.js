//const router = require('express').Router();
const User = require('../models/Users');
const passport = require('passport');

const ctrl = {};

ctrl.signinG = (req, res) => {
    res.render('users/signin'); 
};

ctrl.signinP = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/signin',
    failureFlash: true
});

ctrl.signupG = (req,res) => {
    res.render('users/signup');
};

ctrl.signupP = async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    console.log(req.body);
    if(name.length <= 0) {
        errors.push({text: 'Please insert you name'});
    }
    if(password != confirm_password) {
        errors.push({text: 'Password do not match'});
    }
    if(password.length < 4) {
        errors.push({text: 'Password must be at least 4 characters'});
    }
    if(errors.length > 0) {
        res.render('users/signup', {errors, name, email, password, confirm_password});
    }else {
        const emailUser = await User.findOne({email: email});
        if(emailUser) {
            req.flash('error_msg', 'The Email is already in use');
            res.redirect('/users/signup')
        }
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered');
        res.redirect('/users/signin');
    }
};

ctrl.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

module.exports = ctrl;