const router = require('express').Router()
const axios = require('axios')

router.get('/flights', (req, res) => {
    res.render('flights')
})

router.post('/flights', (req, res) => {
    const origin = req.body.origin
    const destination = req.body.destination
    const departure = req.body.departure
    const arrival = req.body.return
    const pax = req.body.pax

    const options = {
    method: 'GET',
    url: 'https://priceline-com-provider.p.rapidapi.com/v2/flight/roundTrip',
    params: {
        departure_date: '2022-03-1,2022-03-11',
        adults: '1',
        sid: 'iSiX639',
        page: '2',
        results_per_page: '20',
        convert_currency: 'EUR',
        origin_airport_code: 'FRA,LAX',
        destination_airport_code: 'LAX,FRA'
    },
    headers: {
        'x-rapidapi-host': 'priceline-com-provider.p.rapidapi.com',
        'x-rapidapi-key': '6bf214f8b0msh5f1e3ad82dfa45ap1449edjsnbe2cf7ab2a57'
    }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
})

module.exports = router