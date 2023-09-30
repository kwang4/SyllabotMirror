/**
 * Endpoints required for maintaining a course
 */

const express = require('express');
const router = express.Router();

let courses = require('../data/courses.json')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


/**
 * Currently, these endpoints are just mock endpoints 
 */

/**
 * Get course with the given Course ID
 * 
 *  params: courseid
 *  returns: Course object with given courseid
 */
router.get("/:courseid",(req,res,next)=>{
    console.log("URL: " + req.originalUrl)
    console.log("Request parameters: " + JSON.stringify(req.params))

    const courseId = req.params.courseid; // Get call parameter
    let course = courses.find(course => course.courseid == courseId); // Check for courseid in db, stops at first instance
    if (course) {
        res.json(course);
    } else {
        res.status(404).json({error: "Course not found"})
    }
    // Check if id exists
    // else return 404 error
    //res.json({'CourseName':'CSC 492', 'courseid':req.params.courseid, 'semester':{'season':'fall', 'year':'2023'}});
})

/**
 * Get a list of courses for the given user
 */
router.get("/",(req,res,next)=>{
    // Check if id exists
    // else return 404 error
    res.json(courses);
})

/**
 * Create course with the attributes given in the request body
 *  body: keys          values
 *        'CourseName'  String
 *        'period'      Enum (fall, spring, summer)
 *        'semester'    INT
 *  returns the new course object created if valid
 * 
 */
router.post("/",function(req,res){
    const course=req.body;

    try {
        courses.push(course); // This will be another method that checks a sql query and fails on invalid params
        res.json(course);
    } catch(e) {
        res.json({error: `${e}`})
    }
    
    // if (course && course.CourseName && course.period && course.semester){
    //     res.json({'CourseName':course.CourseName, 'courseid':'1', 'period':course.period, 'semester':course.semester});
    // } else {
    //     res.status(404).json({error: "Course must have values for /'CourseName/', /'period/', and /'semester/'"});
    // }
})

/**
 * Deletes course with the given Course ID
 * 
 *  params: courseid
 *  returns: Course object with given courseid that was just deleted
 */
router.delete("/:courseid",(req,res,next)=>{
    // Check if id exists
    // else return 404 error
    res.json({'CouresName':'CSC 492', 'courseid':req.params.courseid, 'period':'fall', 'semester':'2023'})
})


module.exports = router;