const express = require('express');
const router = express.Router();
const linksforhome = [{ url: 'https://www.trackmania.com', text: 'Trackmania website' },
    { url: 'https://discord.gg/fAxK7pTP6C', text: 'Our discord server' }
];
const { readPlayer } = require('../models/players');

router.get('/', function(req, res) {
    var message = "";
    var v = true;
    if (req.signedCookies.tracking) {
        var LastVisit = req.signedCookies.tracking;
        var message = "Last visit on " + LastVisit;
    }
    var currentDate = new Date();
    res.cookie('tracking', currentDate.toLocaleString(), { signed: true });
    res.render('home.handlebars', { 'message': message, links: linksforhome, 'active_home': v });
});

router.get('/about', (req, res) => {
    var v = true;
    res.render('about.handlebars', { 'active_about': v, links: linksforhome });
});

router.get('/register', async(req, res) => {
    var players = await readPlayer();
    var v = true;
    if (Object.keys(players).length === 0){
        players=[{gamename: 'No participants yet :(', dname: null}]
    }
    res.render('form.handlebars', { 'active_register': v, links: linksforhome, playerlist: players });
});

module.exports = router;
module.exports.links = linksforhome;