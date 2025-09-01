const User = require('../models/user')

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register')
}

module.exports.register = async (req, res, next) => {
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
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!')
    const redirectUrl = res.locals.returnTo || '/campgrounds'
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res, next) => {
    req.logout(function (e) {
        if (e) {
            return next(e)
        }
        req.flash('success', 'Logging you out, Goodbye...')
        res.redirect('/campgrounds')
    })
}