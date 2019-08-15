// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
    const userEntry = req.body;
    if (!userEntry.name || !userEntry.bio) {
        return res.status(404).json({ errorMessage: "Please provide name AND bio, for user entry" });
    };
    db
        .insert(userEntry)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((err) => {
            res.status(500).json({ error: "Processing User Error, perhaps try again? Make sure to complete the form data" });
        });
});

server.get('/api/users', (req, res) => {
    db
        .find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((error) => {
            res.status(500).json({ error: 'The users information could not be retrieved.' });
        });
});

server.get('/api/users/:id', (req, res) => {
    const userByID = req.params.id;
    db
        .findById(userByID)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error) => {
            res.status(500).json({ message: 'Specified User ID does not exist.' });
        });
});

server.delete('/api/users/:id', (req, res) => {
    const userByID = req.params.id;
    db
        .findById(userByID)
        .then((response) => {
            db
                .remove(userByID)
                .then(() => res.status(200).json(response))
                .catch(() => res.status(500).json({ error: 'The user was unable to be removed' }));
        })
        .catch((error) => res.status(404).json({ message: 'Specified User ID is unavailable' }));
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const user = req.body;
    console.log(id);

    if (!id) {
        return res.status(404).json({ message: "Specified ID does not exist." })
    }
    else if (!user.name || !user.bio) {
        return res.status(400).json({ errorMessage: "Please provide name and bio for user" })
    }

    db
        .update(id, user)
        .then(updated => {

            res.status(200).json(updated)
        })
        .catch(error => {
            res.status(500).json({ error: "The user info could not be altered." })
        })

});

server.listen(3333, () => {
    console.log('Listening on 3333');
});