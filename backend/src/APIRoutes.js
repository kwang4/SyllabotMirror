const express = require('express');
const apiRouter = express.Router();

const sectionRouter = require('./api/sectionAPI.js');
const courseRouter = require('./api/courseAPI.js');

apiRouter.use('/section', sectionRouter);
apiRouter.use('/course', courseRouter);

module.exports = apiRouter;