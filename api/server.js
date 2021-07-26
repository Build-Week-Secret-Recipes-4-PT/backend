const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");
const auth2Router = require("./auth2/auth2-router");

const server = express();

server.use(session({
    name:"sessionId",
    secret: "keepitsecret",
    cookie:{
      maxAge: 1000 * 60 * 60,
      secure:false,
      httpOnly: true
    },
    resave:false,
    saveUninitialized:false,
    store: new KnexSessionStore({
      knex:require("./data/db-config"),
      tablename:"sessions",
      sidfieldname:"sid",
      createTable:true,
      clearInterval:1000 * 60 * 60
    })
  }));

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);
server.use("/api/auth2", auth2Router);

server.get("/", (req, res) => {
    res.status(200).json({
        api: "up"
    });
});

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  });

module.exports = server;