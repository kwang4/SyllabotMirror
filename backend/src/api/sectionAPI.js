/**
 * Endpoints to maintain a section and its roster
 */
const express = require('express');
const router = express.Router();

router.use(express.json());

/** 
 * Get a specific section of a course, with the given section id and course id
 * params: 
 *  courseid
 *  sectionid
 * returns  section of course with given sectionid and courseid
 */ 
router.get("/:sectionid/course/:courseid",(req,res,next)=>{
    res.json({'sectionid':req.params.sectionid, 'courseid':req.params.courseid});
})

// remove a specific section of a course
router.delete("/:sectionid", (req,res,next)=>{
    res.send("This section request")
})

// add a section to a course
router.post('/'), (req,res) => {
    res.json(req.body);
}

// add a roster to a section
/**
 * param: csv file
 */
router.post("/:sectionid/roster", (req,res,next)=>{
    res.send("Set my roster")
})

// update a roster for a course
/**
 * param csv file
 */
router.put("/:sectionid/roster", (req,res,next)=>{
    res.send("Set my roster")
})


module.exports = router;
