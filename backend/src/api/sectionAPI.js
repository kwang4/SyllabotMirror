/**
 * Endpoints to maintain a section and its roster
 */
const express = require('express');
const router = express.Router({mergeParams: true});
const SectionDAO = require('../data/SectionDAO.js');
const CourseDAO = require('../data/CourseDAO.js');
const SyllabotDAO = require('../data/SyllabotDAO.js');
const DeployDAO = require('../data/DeployDAO.js');
const LogDAO = require('../data/LogDAO.js');

router.use(express.json());

/** 
 * Get a specific section of a course, with the given section id and course id
 * params: 
 *  courseid
 *  sectionid
 * returns  section of course with given sectionid and courseid
 */ 
router.get("/:sectionNum",(req,res,next)=>{
    
    SectionDAO.getSectionsByCourse(req.params.courseid, req.params.sectionNum).then(section => {
        if (section && section.length != 0) {
            SectionDAO.getInstructors(req.params.courseid, req.params.sectionNum).then(instructors => {
                if(instructors) {
                    section[0].instructors = instructors;
                } 
                else {
                    res.status(404).send({error: 'Section does not have instructors'})
                }
                res.json(section)
            })
        } else {
            res.status(404).send({error: 'Section not found'})
        }
    })

    
})

/**
 * Gets the logs for a specific section of a course
 */
router.get("/:sectionNum/logs", async (req, res, next) => {
    var sectionNum = req.params.sectionNum;
    var courseid = req.params.courseid;
    if(!courseid || !sectionNum){
        res.status(404).send({error: 'Request must contain course id and section number'})
    }
    LogDAO.getLogs(courseid, sectionNum).then((logs) => {
        res.json(logs);
    });
});
    

/**
 * remove a specific section of a course
 */
router.delete("/:sectionNum", (req,res,next)=>{
    res.send("This section request")
})

/**
 * Add a section to a course with the specified section number
 */
router.post('/'), (req,res) => {
    res.json(req.body);
}

/**
 * Add a roster to a course given a specific section
 */
router.post("/:sectionNum/roster", (req,res,next)=>{
    res.send("Set my roster")
})

// update a roster for a course
/**
 * Update a roster for a course specific course
 */
router.put("/:sectionNum/roster", (req,res,next)=>{
    res.send("Set my roster")
})

module.exports = router;
