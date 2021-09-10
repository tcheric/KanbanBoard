/*
In this file, we’ll create an Express server, attach the cors and express.json middleware 
(to send/receive json), and make the server listen on port 5000. 
Our MongoDB database is also connected.
Also contains routes.
 */

const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');

require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
