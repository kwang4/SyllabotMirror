const express = require('express');
const apiRouter = express.Router({mergeParams: true});

const sectionRouter = require('./api/sectionAPI.js');
const courseRouter = require('./api/courseAPI.js');
const resourceRouter = require('./api/resourceAPI.js')

apiRouter.use('/semesters/:semesterid/courses/:courseid/sections', sectionRouter);
apiRouter.use('/semesters/:semesterid/courses', courseRouter);
apiRouter.use('/semesters/:semesterid/courses/:courseid/sections/:sectionNum/resources', resourceRouter);

module.exports = apiRouter;