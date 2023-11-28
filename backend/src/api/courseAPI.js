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
const SyllabotDAO = require('.././data/SyllabotDAO.js');
const DeployDAO = require('.././data/DeployDAO.js');

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

router.post("/", async (req,res) => {
    var courseName =  req.body.courseName;
    var sectionNum = req.body.sectionNum;
    var semesterid = req.params.semesterid;
    const unityid = req.headers['x-shib_uid'];

    // Check that courseName and sectionNum are provided
    if (!courseName || !sectionNum) {
        res.status(404).json({error: 'Course must have courseName and sectionNum'});
        return;
    }

    // Get user making the request
    let user = await UserDAO.getUserByUnityID(unityid);
    // Check if user can create course (flag needs to be added to database)
    console.log(user);
    if(!user.is_teacher){
        res.status(404).json({error: 'User cannot add a course'});
        return;
    }

    // Check if course with same name already exists in the semester
    let course = await CourseDAO.getCourseByName(courseName, semesterid);
    if (!course) {
        // Create new course
        let insert_results = await CourseDAO.createCourse(semesterid, courseName)
        if (insert_results.results.affectedRows > 0) {
            // Update value of course
            course = await CourseDAO.getCourseByName(courseName, semesterid);
        } else {
            res.status(404).json({error: 'Error adding a course'});
            return;
        }
    }

    // Get section for the courseid and sectionNum, if already exists then throw error
    // NOTE: Doesn't matter that we create course immediately before since the new course won't have sections yet
    console.log(course);
    let section = await SectionDAO.getSectionByCourse(course.courseID, sectionNum);
    if (section) {
        console.log("CHECK!");
        res.status(400).json({error: 'Course/section combination already exists'});
        return;
    }

    // Create section
    section = await SectionDAO.createSection(course.courseID, sectionNum);

    // Add user to roster as teacher
    await RosterDAO.addUserToRoster(course.courseID, sectionNum, user, 2);

    // Create syllabot for course with default values
    let syllabot = await SyllabotDAO.createSyllabot(course.courseID, "Syllabot " + courseName, null, null);

    // Create deploys for new course with default values
    await DeployDAO.createDeploy(syllabot.syllabotID, 1, "Your Token", "Your Token", "Your Token", course.courseID, sectionNum);
    await DeployDAO.createDeploy(syllabot.syllabotID, 2, "Your Token", null, null, course.courseID, sectionNum);

    // Respond
    res.json(section);
});

/**
 * Create course with the attributes given in the request body
 *  body: keys          values
 *        'CourseName'  String
 *        'period'      Enum (fall, spring, summer)
 *        'semester'    INT
 *  returns the new course object created if valid
 * 
 */
// router.post("/",function(req,res){
//     var courseName =  req.body.courseName;
//     var sectionNum = req.body.sectionNum;
//     var semesterid = req.params.semesterid;
//     const unityid = req.headers['x-shib_uid'];
//     UserDAO.getUserByUnityID(unityid).then(user => {
//         if (courseName && sectionNum){
//             CourseDAO.checkIfCourseExists(semesterid, courseName).then(result =>{
//                 if(result.length == 0){
//                     CourseDAO.createCourse(semesterid, courseName).then(rowsAdded => {
//                         if ( rowsAdded.results.affectedRows > 0){
//                             CourseDAO.checkIfCourseExists(semesterid, courseName).then(course =>{
//                                 // Add a section
//                                 SectionDAO.createSection(course[0].courseID, sectionNum).then(sectionAdded => {
//                                     RosterDAO.addUserToRoster(course[0].courseID, sectionNum, user, 2).then(result => {
//                                         SyllabotDAO.createSyllabot(course[0].courseID, "Syllabot " + courseName, null, null).then(syllabot => {
//                                             DeployDAO.createDeploy(syllabot.syllabotID, 1, "Your Token", "Your Token", "Your Token", course[0].courseID, sectionNum).then(slackDeploy => {
//                                                 DeployDAO.createDeploy(syllabot.syllabotID, 2, "Your Token", null, null, course[0].courseID, sectionNum).then(discordDeploy => {
//                                                     res.json(sectionAdded.results.affectedRows);
//                                                 })
//                                             })
//                                         })
//                                     })
//                                 })
                                
//                             })
//                         } else {
//                             res.status(404).json({error: 'Error adding a course'})
//                         }
//                     })
                    
            
//                 } else {
//                     // check if section exists
//                     SectionDAO.getSection(result[0].courseid, sectionNum).then(section=>{
//                         if(section.length > 0){
//                             res.json(section)
//                         } else{
//                             SectionDAO.createSection(result[0].courseID, sectionNum).then(sectionAdded => {
//                                 RosterDAO.addUserToRoster(course[0].courseID, sectionNum, user, 2).then(result => {
//                                     SyllabotDAO.createSyllabot(course[0].courseID, "Syllabot " + courseName, null, null).then(syllabot => {
//                                         DeployDAO.createDeploy(syllabot.syllabotID, 1, "Your Token", "Your Token", "Your Token", course[0].courseID, sectionNum).then(slackDeploy => {
//                                             DeployDAO.createDeploy(syllabot.syllabotID, 2, "Your Token", null, null, course[0].courseID, sectionNum).then(discordDeploy => {
//                                                 res.json(sectionAdded.results.affectedRows);
//                                             })
//                                         })
//                                     })
//                                 })
//                             })
//                             // create the section with the user with the course
//                         }
//                     })
                    
//                     res.json(result)
//                 }
                
//             })
//         } else {
//             res.status(404).json({error: 'Course must have courseName and sectionNum'})
//         }
//     });
    
    
    // const course=req.body;
    // if (course && course.CourseName && course.period && course.semester){
    //     res.json({'CourseName':course.CourseName, 'courseid':'1', 'period':course.period, 'semester':course.semester});
    // } else {
    //     res.status(404).json({error: "Course must have values for /'CourseName/', /'period/', and /'semester/'"});
    // }
// })

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
