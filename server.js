const express = require("express");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

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


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "NodeExpress API",
            description: "User API Information",
            contact: {
                name: "Csoto"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ["server.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /users:
 *  get:
 *    description: Use to request all users
 *    responses:
 *      '401':
 *        description: Invalid token
 *      '200':
 *        description: A successful response
 */
app.get('/user*', function (req, res) {
    jwt.verify(getToken(req, res), secretKey, function (err, user) {
        if (err) { res.status(401).send('Invalid token'); return; }
        res.send({ users });
    });

});

/**
 * @swagger
 * /user:
 *  post:
 *    description: Update user 
 *    parameters:
 *      - name: id
 *        description: user id to update
 *        required: true
 *        type: string
 *      - name: username
 *        description: username to update
 *        required: true
 *      - name: password
 *        description: password to update
 *        required: true
 *    responses:
 *      '401':
 *        description: Invalid token
 *      '406':
 *        description: Id, username and password are mandatory
 *      '200':
 *        description: A successful response
 */
app.post('/user', function (req, res) {
    jwt.verify(getToken(req, res), secretKey, function (err, user) {
        if (err) { res.status(401).send('Invalid token'); return; }

        if (!req.body.id || !req.body.username || !req.body.password) {
            res.status(406).send("Id, username and password are mandatory");
        } else {
            if (users.findIndex(item => item.id === req.body.id) < 0) {
                users.push({
                    id: req.body.id,
                    username: req.body.username,
                    password: req.body.password
                });
                res.status(200).send(users);
            } else {
                res.status(406).send("user already exists");
            }
        }
    });

});

/**
 * @swagger
 * /user:
 *  put:
 *    description: create an user 
 *    parameters:
 *      - name: id
 *        description: user id to update
 *        required: true
 *        type: string
 *      - name: username
 *        description: username to update
 *        required: true
 *      - name: password
 *        description: password to update
 *        required: true
 *    responses:
 *      '401':
 *        description: Invalid token
 *      '406':
 *        description: Id, username and password are mandatory
 *      '201':
 *        description: A successful response
 */
app.put('/user', function (req, res) {
 
    jwt.verify(getToken(req, res), secretKey, function (err, user) {
        if (err) { res.status(401).send('Invalid token'); return; }
        if (req.body.id === '' || req.body.username === '' || req.body.password === '') {
            res.status(406).send("Id, username and password are mandatory");
        } else {
            let index = users.findIndex(item => item.id === req.body.id);
            users[index] = req.body;
            res.status(201).send(users);
        }

    });
});

/**
 * @swagger
 * /user/{id}:
 *  delete:
 *    description: detele an user 
 *    parameters:
 *      - name: id
 *        description: user id to update
 *        required: true
 *        type: string
 *    responses:
 *      '401':
 *        description: Invalid token
 *      '406':
 *        description: Id, username and password are mandatory
 *      '200':
 *        description: A successful response
 */
app.delete('/user/:id', function (req, res) {

    jwt.verify(getToken(req, res), secretKey, function (err, user) {
        if (err) { res.status(401).send('Invalid token'); return; }
        let id = req.params.id;
        if (users.findIndex(item => item.id === id) < 0) {
            res.status(406).send("this id does not exist");
        } else {
            users.splice(users.findIndex(item => item.id === id), 1)
            res.status(200).send("User removed");
        }

    });
});

/**
 * @swagger
 * /login:
 *  post:
 *    description: login to get the token
 *    parameters:
*      - name: username
 *        description: username to update
 *        required: true
 *      - name: password
 *        description: password to update
 *        required: true
 *    responses:
 *      '401':
 *        description: wrong credentials
 *      '200':
 *        description: A successful response
 */
app.post('/login', (req, res) => {
        if (users.findIndex(item => (item.username === req.body.username &&
            item.password === req.body.password)) < 0) {
            res.status(401).send('wrong credentials');
            return;
        }
        res.status(200).send(jwt.sign({ username: req.body.username }, secretKey, { expiresIn: 60 * 60 * 24 }));

    })


function getToken(req, res) {
    var token = req.headers['authorization']
    if (!token) { res.status(412).send('Token is mandatory'); return; }
    return token.replace('Bearer ', '');
}