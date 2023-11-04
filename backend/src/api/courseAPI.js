/**
 * Endpoints required for maintaining a course
 */

const express = require('express');
const router = express.Router({mergeParams: true});

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


const CourseDAO = require('.././data/CourseDAO.js');
const SectionDAO = require('.././data/SectionDAO.js');
const UserDAO = require('.././data/UserDAO.js');
const RosterDAO = require('.././data/RosterDAO.js');

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
    //console.log("URL: " + req.originalUrl)
   // console.log("Request parameters: " + JSON.stringify(req.params))
    // Check if id exists
    // else return 404 error
   // console.log("I'm inside the get endpoint for Courses");
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
    CourseDAO.getCourses().then(courses => {
        if (courses) {
            // get list of courses for each course
            res.json(courses)
        } else {
            res.status(404).json({error: 'Courses not found'})
        }
    })
})

//Get course by string name
router.get('/courseName/:courseName', (req,res,next) => {
    CourseDAO.getCourseByName(req.params.courseName, req.params.semesterid).then(course => {
        if (course) {
            res.json(course);
        } else {
            res.json(404).json({error: 'Course not found'})
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
    var courseName =  req.body.courseName;
    var sectionNum = req.body.sectionNum;
    var semesterid = req.params.semesterid;
    const unityid = req.headers['x-shib_uid'];
    UserDAO.getUserByUnityID(unityid).then(user => {
        if (courseName && sectionNum){
            CourseDAO.checkIfCourseExists(semesterid, courseName).then(result =>{
                if(result.length == 0){
                    CourseDAO.createCourse(semesterid, courseName).then(rowsAdded => {
                        if ( rowsAdded.results.affectedRows > 0){
                            CourseDAO.checkIfCourseExists(semesterid, courseName).then(course =>{
                                // Add a section
                                SectionDAO.createSection(course[0].courseID, sectionNum).then(sectionAdded => {
                                    RosterDAO.addUserToRoster(course[0].courseID, sectionNum, user, 2).then(result => {
                                        res.json(sectionAdded.results.affectedRows)
                                    })
                                })
                                
                            })
                        } else {
                            res.status(404).json({error: 'Error adding a course'})
                        }
                    })
                    
            
                } else {
                    // check if section exists
                    SectionDAO.getSection(result[0].courseid, sectionNum).then(section=>{
                        if(section.length > 0){
                            res.json(section)
                        } else{
                            SectionDAO.createSection(result[0].courseID, sectionNum).then(sectionAdded => {
                                RosterDAO.addUserToRoster(course[0].courseID, sectionNum, user, 2).then(result => {
                                    res.json(sectionAdded.results.affectedRows)
                                })
                            })
                            // create the section with the user with the course
                        }
                    })
                    
                    res.json(result)
                }
                
            })
        } else {
            res.status(404).json({error: 'Course must have courseName and sectionNum'})
        }
    });
    
    
    // const course=req.body;
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
