const express = require("express");
const app = express();
app.listen(3000, () => {
 console.log("server started - port 3000");
});

// Info
let users = [
    {
        username: 'user1',
        password: 'pass1'
    },
    {
        username: 'user2',
        password: 'pass2'
    }
];

app.get('/users', function (req, res) {
    res.send(users);
});