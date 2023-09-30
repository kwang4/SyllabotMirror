/**
 * Endpoints required for maintaining a course's resources
 */

const express = require('express');
const router = express.Router({mergeParams: true});

let courses = require('../data/courses.json');

/**
 * Returns a list of the materials associated with the specified 
 * course and section, or an error if the course with the given course_id does not exist.
 */
router.get("/",(req,res,next)=>{
    const courseId = req.params.courseid; // Get courseId parameter
    const sectionNum = req.params.sectionNum

    let course = courses.find(course => course.courseid == courseId); // Check for courseid in db, stops at first instance
    if (course) {
        let section = course.sections.find(section => section.sectionNum == sectionNum); // Check for sectionNum in db, stops at first instance
        if (section) {
            res.send(section.resources)
        } else {
            res.status(404).json({error: "Section not found"})
        }
    } else {
        res.status(404).json({error: "Course not found"})
    }
})
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


module.exports = router;