const express = require("express");
const app = express();

var users = require('./routes/users');
var login = require('./routes/login');

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

app.listen(3000, () => {
    console.log("server started - port 3000");
});

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
    apis: ["./routes/users.js","./routes/login.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/user', users);
app.use('/login', login);