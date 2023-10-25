/**
 * Endpoints required for maintaining a course's resources
 */

const express = require('express');
const ResourceDAO = require('../data/ResourceDAO');
const router = express.Router();

/**
 * Returns a list of the materials associated with the specified 
 * course and section, or an error if the course with the given course_id does not exist.
 */
router.get("/",(req,res,next)=>{
    const scr_sec_number = req.params.scr_sec_number;
    const scr_crs_id = req.params.scr_crs_id;
    ResourceDAO.getCourseFiles(scr_sec_number, scr_crs_id).then(resources=>res.json(resources));
    // res.json([
    //     {'name': 'Syllabus',
    //     'type': 'pdf',
    //     'file_contents' :'Syllabus.pdf'
    //     },
    //     {'name': 'IPR-template',
    //     'type': 'docx',
    //     'file_contents': 'IPR-template.docx'
    //     }
    // ]
    // );
})
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


module.exports = router;