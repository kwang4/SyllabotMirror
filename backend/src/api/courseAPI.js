/**
 * Endpoints required for maintaining a course
 */

const express = require('express');
const router = express.Router();

//courseAPI.use(express.json());

/**
 * Currently, these endpoints are just mock endpoints 
 */

router.get("/:courseid",(req,res,next)=>{
    res.send("This course request")
})

router.post("/",(req,res,next)=>{
    res.send("This course post request")
})


module.exports = router;