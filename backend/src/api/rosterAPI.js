/**
 * Endpoints required for maintaining rosters
 */

const express = require('express');
const router = express.Router({mergeParams: true});

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


const RosterDAO = require('../data/RosterDAO.js');

// NOT TESTED
/**
 * Get roster with the given section ID
 * 
 *  params: sectionid
 *  returns: roster object with given sectionid
 */
router.get("/:sectionid",(req,res,next)=>{
    console.log("URL: " + req.originalUrl)
    console.log("Request parameters: " + JSON.stringify(req.params))
    // Check if id exists
    // else return 404 error
    RosterDAO.getRoster(req.params.sectionid).then(roster => {
        if (roster) {
            // get list of instructors for roster
            res.json(roster)
        } else {
            res.json(404).json({error: 'roster not found'})
        }
    })
})

// NOT TESTED
/**
 * Get a list of rosters
 */
router.get("/",(req,res,next)=>{
    RosterDAO.getRosters().then(rosters => {
        if (rosters) {
            // get list of rosters for each roster
            res.json(rosters)
        } else {
            res.status(404).json({error: 'rosters not found'})
        }
    })
})

// NOT TESTED
/**
 * Create roster with the attributes given in the request body
 *  body: keys          values
 *        'rosterName'  String
 *        'period'      Enum (fall, spring, summer)
 *        'roster'    INT
 *  returns the new roster object created if valid
 * 
 */
router.post("/",function(req,res){
    const ros_crs_id = req.params.courseid;
    const ros_sec_number = req.params.sectionNum;
    const roster=req.body;
    if (roster && roster.role_id && roster.first_name && roster.last_name && roster.unity_id){
        RosterDAO.addOneToRoster(ros_crs_id, ros_sec_number, roster.role_id, roster.first_name, roster.last_name, roster.unity_id)
        res.json({'rosterid':'1', 'userID':roster.userID, 'sectionID':roster.sectionID, 'roleID':roster.roleID});
    } else {
        res.status(404).json({error: "roster must have values for /'role_id/', /'first_name/',/'last_name' and /'unity_id/'"});
    }
})


// NOT TESTED
/**
 * Deletes roster with the given roster ID
 * 
 *  params: rosterid
 *  returns: roster object with given rosterid that was just deleted
 */
router.delete("/:sectionid",(req,res,next)=>{
    // Check if id exists
    // else return 404 error
    //res.json({'CouresName':'CSC 492', 'rosterid':req.params.rosterid, 'period':'fall', 'roster':'2023'})
})


module.exports = router;