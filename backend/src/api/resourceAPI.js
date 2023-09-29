/**
 * Endpoints required for maintaining a course's resources
 */

const express = require('express');
const router = express.Router();

/**
 * Returns a list of the materials associated with the specified 
 * course and section, or an error if the course with the given course_id does not exist.
 */
router.get("/",(req,res,next)=>{
    res.json([
        {'name': 'Syllabus',
        'type': 'pdf',
        'file_contents' :'Syllabus.pdf'
        },
        {'name': 'IPR-template',
        'type': 'docx',
        'file_contents': 'IPR-template.docx'
        }
    ]
    );
})
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


module.exports = router;