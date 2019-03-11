const express = require('express');
const router = express.Router();

const home = require('../controllers/home');
const image = require('../controllers/image');
const user = require('../controllers/users');

const { isAuthenticated } = require('../helpers/auth');

module.exports = app => {
  
    router.get('/', home.index);
    router.get('/images/:image_id', image.index);
    router.get('/images', isAuthenticated, image.createG);
    router.post('/images', isAuthenticated, image.createP);
    router.post('/images/:image_id/like', image.like);
    router.post('/images/:image_id/comment', isAuthenticated, image.comment);
    router.delete('/images/:image_id', isAuthenticated, image.remove);
    
    router.get('/users/signin', user.signinG);
    router.post('/users/signin', user.signinP);
    router.get('/users/signup', user.signupG);
    router.post('/users/signup', user.signupP);
    router.get('/users/logout', user.logout);

    app.use(router);
};
