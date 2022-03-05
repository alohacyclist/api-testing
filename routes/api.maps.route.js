const router = require('express').Router()
const Map = require('../models/map.model')

router.get('/map', async (req, res) => {
    const coordinates = await Map.find()
    res.render('map', { coordinates })
})

router.post('/map', async (req, res) => {
    const coordinates = JSON.parse(Object.keys(req.body)[0])
    await Map.create({
      xy: [coordinates.lat, coordinates.lng],
    })
    res.render('map', { coordinates })
})

module.exports = router
  