var express = require('express');
var router = express.Router();
var UserService = require('../services/services.user');
var auth = require('../middleware/auth');

const UserModel = require("../models/models.user");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/**
 * @swagger
 * /user:
 *  get:
 *    description: Use to request all users
 *    responses:
 *      '401':
 *        description: Invalid token
 *      '200':
 *        description: A successful response
 */
router.get('/',auth, async (req, res, next) =>{
    UserService.get(res);
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
router.post('/',auth, async (req, res, next)=> {
    const user=new UserModel(req.body.id,req.body.username,req.body.password);
    UserService.add( user,res);

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
router.put('/',auth, async (req, res, next)=> {
    const user=new UserModel(req.body.id,req.body.username,req.body.password);
    UserService.update( user,res);
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
router.delete('/:id',auth, async function (req, res, next) {
    let id = req.params.id;
    UserService.delete( id,res);
});


module.exports = router;