const express = require('express')
const router = express.Router()
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')
const { storeReturnTo } = require('../middleware')

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registered = await User.register(user, password)
        req.login(registered, e => {
            if (e) return next(e)
            req.flash('success', 'Welcome to CampCheck!')
            res.redirect('/campgrounds')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('register')
    }


}))

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login',storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back!')
    const redirectUrl = res.locals.returnTo || '/campgrounds'
    res.redirect(redirectUrl)
})

router.get('/logout', (req, res, next) => {
    req.logout(function (e) {
        if (e) {
            return next(e)
        }
        req.flash('success', 'Logging you out, Goodbye...')
        res.redirect('/campgrounds')
    })
})

module.exports = router