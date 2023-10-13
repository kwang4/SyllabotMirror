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
    
    SectionDAO.getSection(req.params.courseid, req.params.sectionNum).then(section => {
        if (section) {
            SectionDAO.getInstructors(section[0].sectionID).then(instructors => {
                console.log(instructors)
                if(instructors) {
                    section[0].instructors = instructors;
                    console.log(section[0])
                } 
                else {
                    res.json(404).json({error: 'Section does not have instructors'})
                }
                res.json(section)
            })
        } else {
            res.json(404).json({error: 'Section not found'})
        }
    })

    
})

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
