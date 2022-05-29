const express = require('express');
const router = express.Router();
const home = require('./home');
const mongoose = require('mongoose');
const db = mongoose.connection;
const { readPlayer } = require('../models/players');

var data = {
    "alexmge": {
        "name": "alexmge",
        "imageurl": "https://cdn.discordapp.com/avatars/581402949524258817/1066f268cec503fed81a5d19fab16513.webp",
        "description": "One of the two founders of the cup. Roles: Administrator, In-game server responsible, Mapper and Player!"
    },

    "harro": {
        "name": "harro",
        "imageurl": "https://cdn.discordapp.com/avatars/421810982998900738/136084542709b12370eefd3a960095a0.webp",
        "description": "One of the two founders of the cup. Roles: Administrator, Mapper and Player!"
    }
}

router.post('/addnew', (req, res) => {
    db.collection("players").insertOne(req.body);
    console.log("Data sent via post");
    console.table(req.body);
    res.redirect(303, 'personadded');
})

router.get('/personadded', async(req, res) => {
    var players = await readPlayer();
    if (Object.keys(players).length === 0){
        players=[{gamename: 'No participants yet :(', dname: null}]
    }
    res.render('add', {playerlist:players})
})

router.get('/personremoved', async(req, res) => {
    var players = await readPlayer();
    if (Object.keys(players).length === 0){
        players=[{gamename: 'No participants yet :(', dname: null}]
    }
    res.render('unregistered', {playerlist:players})
})

router.post('/remove', (req, res) => {
    db.collection("players").deleteOne(req.body);
    console.log("Data sent via post");
    console.table(req.body);
    res.redirect(303, 'personremoved');
})

router.get('/:name', (req, res) => {
    var name = req.params.name;
    var v = true;
    if (!data[name]) {
        res.render('404.handlebars')
    } else {
        res.render('person.handlebars', { person: data[name], links: home.links, 'active_staff': v })
    }

})

router.get('/', (req, res) => {
    var v = true;
    res.render('listing.handlebars', { personlist: data, links: home.links, 'active_staff': v });
});

module.exports = router;