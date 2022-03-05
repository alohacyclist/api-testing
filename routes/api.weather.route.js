const router = require('express').Router()
const axios = require('axios')

router.get('/weather', (req, res) => {
    res.render('weather')
})

router.post('/weather', async (req, res) => {
    const city = req.body.search
    const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    params: {q: `${city}`, days: '3'},
    headers: {
    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
    'x-rapidapi-key': process.env.RAPID_API_KEY
  }
};

    axios.request(options).then(function (response) {
        res.render('forecast', {response})
    }).catch(function (error) {
        console.error(error);
    });
})

module.exports = router

