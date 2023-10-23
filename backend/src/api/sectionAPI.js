/**
 * Endpoints to maintain a section and its roster
 */
const express = require('express');
const router = express.Router({mergeParams: true});
const SectionDAO = require('../data/SectionDAO.js');
const CourseDAO = require('../data/CourseDAO.js');
const SyllabotDAO = require('../data/SyllabotDAO.js');
const DeployDAO = require('../data/DeployDAO.js');

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


router.get("/syllabots/all", (req, res, next) => {
    SyllabotDAO.getSyllabots().then(syllabots => {
        res.json(syllabots);
    })
})

router.post('/syllabots', (req, res, next) => {
    const courseID = req.params.courseid;
    const name = req.body.name;
    const prompt_flavor = req.body.prompt_flavor;
    const profile_picture  = req.body.profile_picture;

    if (!courseID) {
        res.status(404).json({error: 'Syllabot must have courseID'});
        return;
    }

    SyllabotDAO.createSyllabot(courseID, name, prompt_flavor, profile_picture).then(rowsAdded => {
        if (rowsAdded.length == 0) {
            res.status(404).json({error: 'Error adding syllabot'});
            return;
        }

        SyllabotDAO.getSyllabot(rowsAdded.results.insertId).then(syllabot => {
            res.json(syllabot);
        });
    })
})

// Doesn't work, super messy with foreign keys. Shouldn't add unless absolutely needed

// router.delete('/syllabot/:syllabotid', (req, res, next) => {
//     const id = req.params.syllabotid;
//     console.log('check');
//
//
//     SyllabotDAO.deleteSyllabot(id).then(result => {
//         console.log(result);
//     });
// });

router.put('/syllabot/:syllabotid', (req, res, next) => {
    const id = req.params.syllabotid;
    const name = req.body.name;
    const prompt_flavor = req.body.prompt_flavor;
    const profile_picture  = req.body.profile_picture;

    SyllabotDAO.updateSyllabot(id, name, prompt_flavor, profile_picture).then(result => {
        if (result.results.affectedRows == 0) {
            res.status(404).json({error: "Error updating syllabot"})
        }

        SyllabotDAO.getSyllabot(id).then(syllabot => {
            res.json(syllabot);
        });
    })
})

router.get("/deploys/all", (req, res, next) => {
    DeployDAO.getDeploys().then(deploys => {
        res.json(deploys);
    });
});

module.exports = router;
