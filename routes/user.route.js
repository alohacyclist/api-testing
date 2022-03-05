const express = require('express')
const User = require('../models/user.model')
const user = require('../models/user.model')
const bcrypt = require('bcrypt')
const isLoggedIn = require('../middlewares/guard')

const router = express.Router()

router.get('/create', (req, res) => {
    res.render('createUser')
})

router.post('/create', async (req, res) => {
    const user = new User({ ...req.body })
    const hash = await bcrypt.hash(req.body.password, 10)
    user.password = hash
    try {
        await user.save()
        res.render('profile', { user })
    } catch (err) {
        console.error(err)
        res.redirect('create')
    }
})

router.get('/login', (req, res) => {
    res.render('user/login')
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({username: req.body.username})
    if(user) {
        if(bcrypt.compare(req.body.password, user.password)) {
            req.session.currentUser = user
            res.render('profile', { user })
        } else {
            res.send('Error logging in.')
        }
    } else {
        res.send('Error finding user.')
    }
})

// route for the user profile
router.get('/profile', (req, res) => {
    const user = req.session.currentUser
    res.render('profile', { user })
  })
  
  // route for handling the logout
  router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/users/login')
  })

module.exports = router