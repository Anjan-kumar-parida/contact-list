const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/contact_list_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting db'))

db.once('open', () => {
    console.log('Successfully connected to the database')
})