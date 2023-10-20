/**
 * Endpoints required for maintaining semesters
 */

const express = require('express');
const router = express.Router({mergeParams: true});

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


const SemesterDAO = require('../data/SemesterDAO.js');


// NOT TESTED
/**
 * Get semester with the given semester ID
 * 
 *  params: semesterid
 *  returns: semester object with given semesterid
 */
router.get("/:semesterid",(req,res,next)=>{
    console.log("URL: " + req.originalUrl)
    console.log("Request parameters: " + JSON.stringify(req.params))
    // Check if id exists
    // else return 404 error
    SemesterDAO.getSemester().then(semester => {
        if (semester) {
            // get list of instructors for semester
            res.json(semester)
        } else {
            res.json(404).json({error: 'semester not found'})
        }
    })
})

// NOT TESTED
/**
 * Get a list of semesters
 */
router.get("/",(req,res,next)=>{
    // console.log(req);
    SemesterDAO.getSemesters().then(semesters => {
        if (semesters) {
            // get list of semesters for each semester
            res.json(semesters)
        } else {
            res.status(404).json({error: 'semesters not found'})
        }
    })
})

// NOT TESTED
/**
 * Create semester with the attributes given in the request body
 *  body: keys          values
 *        'semesterName'  String
 *        'period'      Enum (fall, spring, summer)
 *        'semester'    INT
 *  returns the new semester object created if valid
 * 
 */
router.post("/",function(req,res){
    const semester=req.body;
    if (semester && semester.semesterID && semester.season && semester.year){
        res.json({'semesterid':'1', 'season':semester.season, 'year':semester.year});
    } else {
        res.status(404).json({error: "semester must have values for /'semesterID/', /'season/', and /'year/'"});
    }
})

// NOT TESTED
/**
 * Deletes semester with the given semester ID
 * 
 *  params: semesterid
 *  returns: semester object with given semesterid that was just deleted
 */
router.delete("/:semesterid",(req,res,next)=>{
    // Check if id exists
    // else return 404 error
    //res.json({'CouresName':'CSC 492', 'semesterid':req.params.semesterid, 'period':'fall', 'semester':'2023'})
})


module.exports = router;