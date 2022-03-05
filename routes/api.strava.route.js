const router = require('express').Router()
const axios = require('axios')

router.get('/strava', async (req, res) => {
    res.redirect('https://www.strava.com/oauth/authorize?client_id=32322&redirect_uri=http://localhost:3000/exchangetoken&response_type=code&scope=activity:read_all')
})



router.get('/exchangetoken', async (req, res) => {
    const response = req.originalUrl
    const code = response.split('code=')
    const extractAuthorizationCode = code[1].split('&')

    const authorizationCode = extractAuthorizationCode[0]
    const refreshToken = req.params.refresh_token
    const accessToken = req.params.access_token

    const token = await axios.post(`https://www.strava.com/oauth/token?client_id=32322&client_secret=${process.env.STRAVA_CLIENT_SECRET}&code=${authorizationCode}&grant_type=authorization_code`)
    
    const activities = await axios.get(`https://www.strava.com/api/v3/athlete/activities?per_page=200&access_token=${token.data.access_token}`)
    
    const name = token.data.athlete.firstname
    const city = token.data.athlete.city
    const country = token.data.athlete.country
    const weight = token.data.athlete.weight

    res.render('strava', { activities, name, city, country, weight })
    
    
})

module.exports = router