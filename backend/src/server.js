'use strict';

const express = require('express');

const app = express();
const PORT = 3000;

const apiRouter = require('./APIRoutes');
app.use(apiRouter);

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
      

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));