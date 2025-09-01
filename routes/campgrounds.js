const catchAsync = require('../utils/catchAsync')
const Campground = require('../models/campground')
const { isLoggedIn,validateCampground,isAuthor } = require('../middleware')
const campgrounds = require('../controllers/campgrounds')

const express = require('express')
const router = express.Router()

router.route('/')
    .get(catchAsync(campgrounds.index ))
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, validateCampground, isAuthor, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn,isAuthor, catchAsync(campgrounds.deleteCampground))


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditFrom))





module.exports = router

