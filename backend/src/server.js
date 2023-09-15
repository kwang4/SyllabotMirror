'use strict';

const express = require('express');

const app = express();
const PORT = process.env.PORT;

const apiRouter = require('./APIRoutes');
app.use(apiRouter);

app.use(express.urlencoded({extended: true}));
      

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));