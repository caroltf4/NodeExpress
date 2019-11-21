const pass=require('../config/default.json');
const jwt = require('jsonwebtoken');
// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
module.exports= function (req, res, next) {
     console.log(req.method + ' Request URL:' + req.originalUrl);
     console.log('Time:', Date(Date.now()).toString());
    jwt.verify(getToken(req.headers['authorization'], res),pass["key"], function (err, user) {
         if (err) {return res.status(401).send('Invalid token'); }
         else{ next();}
     });
     function getToken(header, res) {
        var token = header;
        if (!token) { res.status(412).send('Token is mandatory'); return; }
        return token.replace('Bearer ', '');
 }


 }
 