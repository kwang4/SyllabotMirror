/**
 * Endpoints required for maintaining a course
 */

const express = require('express');
const router = express.Router({mergeParams: true});

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


const CourseDAO = require('.././data/CourseDAO.js');


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
    // Check if id exists
    // else return 404 error
    CourseDAO.getCourse(req.params.semesterid, req.params.courseid).then(course => {
        if (course) {
            // get list of instructors for course
            res.json(course)
        } else {
            res.json(404).json({error: 'Course not found'})
        }
    })
})

/**
 * Get a list of courses for the given user
 */
router.get("/",(req,res,next)=>{
    // Check if id exists
    // else return 404 error
    // list_of_courses = [{'CourseName':'CSC 492', 'courseid':req.params.courseid, 'period':'fall', 'semester':'2023', 'instructor':'Ignacio X. Domínguez'},
    // {'CourseName':'CSC 316', 'courseid':req.params.courseid, 'period':'fall', 'semester':'2023', 'instructor': 'Dr. King'},
    // {'CourseName':'CSC 246', 'courseid':req.params.courseid, 'period':'fall', 'semester':'2023', 'instructor': 'Dr. Sturgill'},
    // {'CourseName':'CSC 326', 'courseid':req.params.courseid, 'period':'fall', 'semester':'2023', 'instructor': 'Dr. Heckman'}]
    // res.json(list_of_courses);
    CourseDAO.getCourses().then(courses => {
        if (courses) {
            // get list of courses for each course
            res.json(courses)
        } else {
            res.status(404).json({error: 'Courses not found'})
        }
    })
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
    if (course && course.CourseName && course.period && course.semester){
        res.json({'CourseName':course.CourseName, 'courseid':'1', 'period':course.period, 'semester':course.semester});
    } else {
        res.status(404).json({error: "Course must have values for /'CourseName/', /'period/', and /'semester/'"});
    }
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