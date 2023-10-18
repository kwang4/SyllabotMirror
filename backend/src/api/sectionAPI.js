/**
 * Endpoints to maintain a section and its roster
 */
const express = require('express');
const router = express.Router({mergeParams: true});
const SectionDAO = require('../data/SectionDAO.js');

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

router.get("/users/:userID", async (req, res, next) => {
    const userID = req.params.userID;
    try {
        const sections = await SectionDAO.getSectionsByUserID(userID);
        const validSections = await Promise.all(
            sections.map(async (section) => {
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
