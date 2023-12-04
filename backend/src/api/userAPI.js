/**
 * Endpoints to maintain a section and its roster
 */
const express = require('express');
const router = express.Router({mergeParams: true});
const SectionDAO = require('../data/SectionDAO.js');
const CourseDAO = require('../data/CourseDAO.js');
const LogDAO = require('../data/LogDAO.js');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const UserDAO = require('../data/UserDAO.js');


router.get("/:userid/courses", async (req, res, next) => {
    const userID = req.params.userid;
    try {
        const user = await UserDAO.getUser(userID);
        if (user.is_admin) {
            const sections = await SectionDAO.getSections();
            const validSections = await Promise.all(
                sections.map(async (section) => {
                    const course = await CourseDAO.getCourseByID(section.courseID);
                    if(course) {
                        section['courseName'] = course.courseName;
                        section['semesterID'] = course.semesterID;
                    }
                    const instructors = await SectionDAO.getInstructors(section.courseID, section.sectionNum);
                    section['instructors'] = [];
                    if(instructors?.length > 0) {
                        let instructorList = [];
                        for(const instructor of instructors)
                        {
                            const instructorName = instructor.formal_name;
                            instructorList.push(instructorName);
                        }
                        section['instructors'] = instructorList;
                    }
                    return section;
                })
            );
            res.json(validSections);
        } else {
            const sections = await SectionDAO.getSectionsByUserID(userID);
            const validSections = await Promise.all(
                sections.map(async (section) => {
                    const course = await CourseDAO.getCourseByID(section.courseID);
                    if(course) {
                        section['courseName'] = course.courseName;
                        section['semesterID'] = course.semesterID;
                    }
                    const instructors = await SectionDAO.getInstructors(section.courseID, section.sectionNum);
                    if(instructors?.length > 0) {
                        let instructorList = [];
                        for(const instructor of instructors)
                        {
                            const instructorName = instructor.formal_name;
                            instructorList.push(instructorName);
                        }
                        section['instructors'] = instructorList;
                    }
                    return section;
                })
            );
            res.json(validSections);
        }
        
    } catch (error) {
        res.status(404).send({error: 'Section not found'})
    }
});

router.get("/unityid/:unityid/courses", async (req, res, next) => {
    const unityID = req.params.unityid;
    const user = await UserDAO.getUserByUnityID(unityID);
    const userID = user.id;
    try {
        const sections = await SectionDAO.getSectionsByUserID(userID);
        const validSections = await Promise.all(
            sections.map(async (section) => {
                const course = await CourseDAO.getCourseByID(section.courseID);
                if(course) {
                    section['course'] = course[0];
                }
                const instructors = await SectionDAO.getInstructors(section.courseID, section.sectionNum);
                if(instructors) {
                    section['instructorName'] = instructors[0].name;
                }
                return section;
            })
        );
        res.json(validSections);
    } catch (error) {
        res.status(404).send({error: 'Section not found'})
    }
});

router.get("/:userid", async (req, res, next) => {
    const userID = req.params.userid;
    UserDAO.getUser(userID).then(user=>{
        res.json(user);
    });
});

router.get("/unityid/:unityid", async (req, res, next) => {
    const unityID = req.params.unityid;
    UserDAO.getUserByUnityID(unityID).then(user=>{
        res.json(user);
    });
});

router.get("/", async (req, res, next) => {
    UserDAO.getUsers().then(users=>{
        res.json(users);
    });
});

/**
 * Get the logs for a specific user given unity id (Restricted to admin)
 */
router.get("/:unityid/logs", async (req, res, next) => {
    const unityid = req.params.unityid;
    try{
        const results = await LogDAO.getUserLog(unityid);
        if (results) {
            // get list of instructors for semester
            res.json(results)
        } else {
            res.json(404).json({error: 'results not found'})
        }
    } catch (error){
        console.error("Error retrieving user logs:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Create a new user 
router.post("/",async (req, res, next) => {
    if(req.body && req.body.user){
        let user = JSON.parse(req.body.user);
        try{
            const new_user = await UserDAO.createUser(user);
            if (new_user) {
                // return the teacher created
                res.json(new_user);
            } else {
                res.json(404).json({error: 'user could not be created'})
            }
        } catch (error){
            console.error("Error creating user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(404).json({error: "post must have user obejct"});
    }
});


// update a user
router.put("/", async (req, res, next) => {
    if(req.body && req.body.user){
        let user = JSON.parse(req.body.user);
        try{
            const updated_user = await UserDAO.updateUser(user);
            if (updated_user) {
                // return the teacher created
                res.json(updated_user);
            } else {
                res.json(404).json({error: 'user could not be updated'})
            }
        } catch (error){
            console.error("Error updating user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }else {
        res.status(404).json({error: "put must have user obejct"});
    }
});




module.exports = router;