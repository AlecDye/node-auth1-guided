const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session); // remember to pass session

//! Server for sessions!

const usersRouter = require("../users/users-router.js");
const authRouter = require("../auth/auth-router.js");
const authenticator = require("../auth/authenticator.js");
const dbConnection = require("../database/dbConfig");

const server = express();

const sessionConfig = {
  name: "monster",
  secret: process.env.SESSION_SECRET || "keep it secret, keep it safe!",
  resave: false,
  saveUninitialized: process.env.SEND_COOKIES || true,
  cookie: {
    maxAge: 1000 * 60 * 10, // good for 10 mins in ms
    secure: process.env.USE_SECURE_COOKIES || false, // used over https only, set to true in production
    httpOnly: true, // true means JS on the client cannot access the cooke
  },
  // the store property controls where the session is storedd, by default it is in memory
  // we're chaging it to use the database throught Knex
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: "sessions",
    // sid = session id
    sidfieldname: "sid",
    createtable: true,
    // clearInterval will remove expired sessions every hour
    clearInterval: 1000 * 60 * 60,
  }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", authenticator, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
