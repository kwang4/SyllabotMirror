/**
 * Endpoints required for maintaining a course's resources
 */

const express = require('express');
const ResourceDAO = require('../data/ResourceDAO');
const router = express.Router({mergeParams: true});

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

/**
 * Returns a list of the materials associated with the specified 
 * course and section, or an error if the course with the given course_id does not exist.
 */
router.get("/",(req,res,next)=>{
    const scr_sec_number = req.params.sectionNum;
    const scr_crs_id = req.params.courseid;
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

router.post("/", (req,res, next) => {
    const scr_sec_number = req.params.sectionNum;
    const scr_crs_id = req.params.courseid;
    // create a file link here
    ResourceDAO.uploadFile(scr_sec_number, scr_crs_id, fil_link).then(resource=> {
        if (resource) {
            // get list of instructors for course
            res.json(resource);
        } else {
            res.json(404).json({error: 'Resource could not be added'});
        }
    })
})



module.exports = router;