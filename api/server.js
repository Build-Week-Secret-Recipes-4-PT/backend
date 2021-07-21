const express = require("express");
const server = express();

server.use(express.json());

server.use("*", (req, res) => {
    res.status(200).json({
        message: "Hi!"
    });
});

module.exports = server;