const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/f8-edu');
        console.log('Connected MongoDB!');
    } catch (error) {
        console.log('Connect MongoDB failure');
    }
}

module.exports = { connect };
