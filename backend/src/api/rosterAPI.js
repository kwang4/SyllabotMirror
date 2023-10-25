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
 * user: {first_name:'fname', last_name:'lname', unity_id:'flname'}
 * role_id : int
 */
router.post("/",function(req,res){
    const ros_crs_id = req.params.courseid;
    const ros_sec_number = req.params.sectionNum;
    if(req.body && req.body.user){
        let user = JSON.parse(req.body.user);
        
        if (user && user.first_name && user.last_name && user.unity_id){
            RosterDAO.addUserToRoster(ros_crs_id, ros_sec_number, user, req.body.role_id).then(roster =>{
                if(roster){
                    res.json(roster);
                } else{
                    res.json(404).json({error: 'Could not add user'});
                }
                
            });
            
        } else {
            res.status(404).json({error: "roster must have values for first_name, last_name and unity_id"});
        }

    } else {
        res.status(404).json({error: "roster must have user obejct"});
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