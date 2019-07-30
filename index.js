// implement your API here
const express = require('express');

const server = express();

const db = require('./data/db.js');

server.use(express.json());

server.post('/users', (req, res) => {
    const userEntry = req.body;
    if (userEntry.name === false || userEntry.bio === false) {
        return res.status(404).json({ errorMessage: "Please provide name AND bio, for user entry" })
    }
    db
        .insert(userEntry).then((user) => {
            res.status(201).json(user)
        })
        .catch((err) => {
            res.status(500).json({ error: "Processing User Error, perhaps try again? Make sure to complete the form data" });
        })
})

server.get('/users', (req, res) => {
	db
		.find()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((error) => {
			res.status(500).json({ error: 'The users information could not be retrieved.' });
		});
});

server.get('/users/:id', (req, res) => {
	const id = req.params.id;
	db
		.findById(id)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => {
			res.status(500).json({ message: 'Specified User ID does not exist.' });
		});
});

server.listen(3333, () => {
    console.log('Listening on 3333');
})