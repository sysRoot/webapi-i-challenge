// implement your API here
const express = require('express');

const server = express();

const db = require('./data/db.js');

server.use(express.json()); 

server.post('/api/users', (req, res) => {
    
})

server.get('/api/users', (req, res) => {

} )