/**
 * Endpoints to maintain a section and its roster
 */
const express = require('express');
const router = express.Router({mergeParams: true});

let courses = require('../data/courses.json') // Sections SHOULD be an array inside of courses, using separate file for testing

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

/** 
 * Get all sections for a course
 * params: 
 *  courseid
 *  sectionid
 * returns  section of course with given sectionid and courseid
 */ 
router.get("/", (req, res, next) => {
    const courseId = req.params.courseid; // Get call parameter
    let course = courses.find(course => course.courseid == courseId); // Check for courseid in db, stops at first instance
    if (course) {
        res.send(course.sections)
    } else {
        res.status(404).json({error: "Course not found"})
    }
})

/** 
 * Get a specific section of a course, with the given section id and course id
 * params: 
 *  courseid
 *  sectionid
 * returns  section of course with given sectionid and courseid
 */ 
router.get("/:sectionNum",(req,res,next)=>{
    console.log("URL: " + req.originalUrl)
    console.log("Request parameters: " + JSON.stringify(req.params))
    
    const courseId = req.params.courseid; // Get call parameter
    const sectionNum = req.params.sectionNum; // Get call parameter

    let course = courses.find(course => course.courseid == courseId); // Check for courseid in db, stops at first instance
    if (course) {
        let section = course.sections.find(section => section.sectionNum == sectionNum); // Check for courseid in db, stops at first instance
        if (section) {
            res.json(section);
        } else {
            res.status(404).json({error: "Section not found"})
        }
    } else {
        res.status(404).json({error: "Course not found"})
    }
})

/**
 * remove a specific section of a course
 */
router.delete("/:sectionNum", (req,res,next)=>{
    const courseId = req.params.courseid; // Get call parameter
    const sectionNum = req.params.sectionNum; // Get call parameter

    let course = courses.find(course => course.courseid == courseId); // Check for courseid in db, stops at first instance
    if (course) {
        let section = course.sections.find(section => section.sectionNum == sectionNum); // Check for courseid in db, stops at first instance
        let sectionIndex = course.sections.indexOf(section);
        if (sectionIndex !== -1) {
            course.sections.splice(sectionIndex, 1);
            res.json(section);
        } else {
            res.status(404).json({error: "Section not found"})
        }
    } else {
        res.status(404).json({error: "Course not found"})
    }
})

/**
 * Add a section to a course with the specified section number
 */
router.post('/', (req,res) => {
    const courseId = req.params.courseid; // Get call parameter
    const section=req.body;

    let course = courses.find(course => course.courseid == courseId); // Check for courseid in db, stops at first instance
    if (course) {
        try {
            course.sections.push(section); // This will be another method that checks a sql query and fails on invalid params
            res.json(section);
        } catch(e) {
            res.json({error: `${e}`})
        }
    } else {
        res.status(404).json({error: "Course not found"})
    }
})

/**
 * Add a roster to a course given a specific section
 */
router.post("/:sectionNum/roster", (req,res,next)=>{
    res.send("Set my roster")
    /* This implementation would be the same as sections, but I would
    have to add another segment to the courses.json and that's too much
    work for a test environment */
})

// update a roster for a course
/**
 * Update a roster for a course specific course
 */
router.put("/:sectionNum/roster", (req,res,next)=>{
    res.send("Set my roster")
})

module.exports = router;
