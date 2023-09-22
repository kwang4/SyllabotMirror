/**
 * Endpoints to maintain a section and its roster
 */
const express = require('express');
const router = express.Router();

router.use(express.json());

// get a specific section of a course
router.get("/:sectionid",(req,res,next)=>{
    res.send("This section request")
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
