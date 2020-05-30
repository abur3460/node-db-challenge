const express = require("express");

const router = require("./router.js");

const server = express();

server.use(express.json());
server.use("/api/projects", router);

module.exports = server;
