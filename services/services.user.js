let users = [];
// secret key
let secretKey = 'secretKey';
const jwt = require('jsonwebtoken');


class UserService {

    static get(res) {
        return res.send({ users });
    }

    static add(user, res) {
            if (!user.id || !user.username || !user.password) {
                return res.status(406).send("Id, username and password are mandatory");
            } else {
                if (users.findIndex(item => item.id === user.id) < 0) {
                    users.push(user);
                    return res.status(200).send(users);
                } else {
                    return res.status(406).send("user already exists");
                }
            }
        
    }

    static update(user, res) {

            if (!user.id || !user.username || !user.password) {
                return res.status(406).send("Id, username and password are mandatory");
            } else {
                let index = users.findIndex(item => item.id === user.id);
                users[index] = user;
                return res.status(201).send(users);
            }

        
    }
    static delete(id, res) {
            if (users.findIndex(item => item.id === id) < 0) {
                return res.status(406).send("This id does not exist");
            } else {
                users.splice(users.findIndex(item => item.id === id), 1)
                return res.status(200).send("User removed");
            }

    }



}

module.exports = UserService;