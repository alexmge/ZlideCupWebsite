const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    ingamename: String,
    dname: String
})

const Player = mongoose.model('Player', playerSchema)

readPlayer = async(options = {}) => {
    if (Object.entries(options).length == 0) return Player.find().lean();
    else if (options.name) return Player.findOne(options).lean();
    else return undefined;
}

exports.readPlayer = readPlayer;