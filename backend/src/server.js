const express = require('express');

const sectionRouter = require('./api/sectionAPI.js');
const courseRouter = require('./api/courseAPI.js');

const app = express();
const PORT = process.env.PORT;
app.use(express.json())

app.use('/course/:courseid/section', sectionRouter);
app.use('/course', courseRouter);

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello World!');
  })
      

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));