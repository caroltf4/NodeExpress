const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("server started - port 3000");
});

// secret key
let secretKey = 'secretKey';
// Info
let users = [
    {
        id: '1',
        username: 'user1',
        password: 'pass1'
    },
    {
        id: '2',
        username: 'user2',
        password: 'pass2'
    }
];

/**
 * Get all users
 */
app.get('/users', function (req, res) {
    res.send({ users });
});

/**
 * Create a new user 
 */
app.post('/user', function (req, res) {

    if (!req.body.id || !req.body.username || !req.body.password) {
        res.status(502).send("Id, username and password are mandatory");
    } else {
        if (users.findIndex(item => item.id === req.body.id) < 0) {
            users.push({
                id: req.body.id,
                username: req.body.username,
                password: req.body.password
            });
            res.status(200).send(users);
        } else {
            res.status(200).send("user already exists");
        }
    }

});

/**
* Update a concrete user when the username and password exit
*/
app.put('/user', function (req, res) {
    if (req.body.id === '' || req.body.username === '' || req.body.password === '') {
        res.status(502).send("Id, username and password are mandatory");
    } else {
        let index = users.findIndex(item => item.id === req.body.id);
        users[index] = req.body;
        res.status(200).send(users);
    }
});
/**
 * Delete a concrete user by id
 */
app.delete('/user/:id', function (req, res) {
    let id = req.params.id;
    if (users.findIndex(item => item.id === id) < 0) {
        res.status(502).send("this id does not exist");
    } else {
        users.splice(users.findIndex(item => item.id === id), 1)
        res.status(200).send("User removed");
    }
});

