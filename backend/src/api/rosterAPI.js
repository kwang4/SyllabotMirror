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


/**
 * Gets the roster of the specified course and section
 */
router.get("/",(req,res,next)=>{
   const courseID = req.params.courseid;
   const sectionNum = req.params.sectionNum;
   RosterDAO.getRoster(courseID,sectionNum).then(users=>{
    res.json(users);
   });
})

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
        let user = req.body.user;
        
        if (user && user.formal_name && user.unity_id){
            RosterDAO.addUserToRoster(ros_crs_id, ros_sec_number, user, req.body.role_id).then(roster =>{
                if(roster){
                    res.json(roster);
                } else{
                    res.json(404).json({error: 'Could not add user'});
                }
                
            });
            
        } else {
            res.status(404).json({error: "roster must have values for formal_name and unity_id"});
        }

    } else {
        res.status(404).json({error: "roster must have user obejct"});
    }
    
  
})

/**
 * Deletes roster with the given roster ID
 * 
 *  params: rosterid
 *  returns: roster object with given rosterid that was just deleted
 */
router.delete("/",(req,res,next)=>{
    const ros_crs_id = req.params.courseid;
    const ros_sec_number = req.params.sectionNum;
    RosterDAO.deleteEntireRoster(ros_crs_id, ros_sec_number).then(result=>{res.json({RowsDeleted:result})});
})

/**
 * Deletes roster with the given roster ID
 * 
 *  params: rosterid
 *  returns: roster object with given rosterid that was just deleted
 */
router.delete("/users/:userid",(req,res,next)=>{
    const ros_usr_id = req.params.userid;
    const ros_crs_id = req.params.courseid;
    const ros_sec_number = req.params.sectionNum;
    RosterDAO.deleteUserFromRoster(ros_crs_id, ros_sec_number, ros_usr_id).then(result=>{res.json({RowsDeleted:result})});
})

module.exports = router;