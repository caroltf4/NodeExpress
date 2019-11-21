var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
let secretKey = 'secretKey';
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

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
router.post('/', async (req, res, next) => {
    console.log(req.body)
    if (req.body=== undefined || ('admin' !== req.body.username || 'admin' !== req.body.password)) {
        return res.status(401).send('wrong credentials');
    }
    return res.status(200).send(jwt.sign({ username: req.body.username }, secretKey, { expiresIn: 60 * 60 * 24 }));
})
module.exports = router;
