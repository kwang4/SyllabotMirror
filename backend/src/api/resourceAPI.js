/**
 * Endpoints required for maintaining a course's resources
 */

const express = require('express');
const ResourceDAO = require('../data/ResourceDAO');
const router = express.Router({mergeParams: true});
// const bodyParser = require('body-parser');
// router.use(bodyParser.json()); //utilizes the body-parser package
// router.use(bodyParser.urlencoded({extended: true}));
const path = require('path');

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '/uploads'));    
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });
const upload = multer({ storage: storage
    //,fileFilter: fileFilter 
})

// const fileFilter = (req, file, cb) => {
//     // reject a file
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   };

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

router.post("/", upload.single('file'), (req,res, next) => {
    
    const scr_sec_number = req.params.sectionNum;
    const scr_crs_id = req.params.courseid;
    file = req.file;
    console.log(req.body);
    console.log(req.file);

    if (file){
        // check if file with same name already exists in given course and section
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              // A Multer error occurred when uploading.
            } else if (err) {
              // An unknown error occurred when uploading.
            }
            ResourceDAO.uploadFile(scr_sec_number, scr_crs_id, file.filename).then(resource=> {
                if (resource) {
                    // get list of instructors for course
                    res.json(resource);
                } else {
                    res.json(404).json({error: 'Resource could not be added'});
                }
            });
            
          });
    

    } else {
        res.status(404).json({error: "Request must contain a file"});
    }
   
});



module.exports = router;