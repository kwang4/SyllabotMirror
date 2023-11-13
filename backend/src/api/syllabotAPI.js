const express = require('express');
const router = express.Router({mergeParams: true});
const SectionDAO = require('../data/SectionDAO.js');
const CourseDAO = require('../data/CourseDAO.js');
const SyllabotDAO = require('../data/SyllabotDAO.js');
const DeployDAO = require('../data/DeployDAO.js');

router.use(express.json());

// Deploys

router.get("/deploys", (req, res, next) => {
  DeployDAO.getDeploys().then(deploys => {
    res.json(deploys);
  })
});

router.get("/syllabots/all", (req, res, next) => {
  SyllabotDAO.getSyllabots().then(syllabots => {
      res.json(syllabots);
  })
})

router.post('/syllabots', (req, res, next) => {
  const courseID = req.params.courseid;
  const name = req.body.name;
  const prompt_flavor = req.body.prompt_flavor;
  const profile_picture  = req.body.profile_picture;

  if (!courseID) {
      res.status(404).json({error: 'Syllabot must have courseID'});
      return;
  }

  SyllabotDAO.createSyllabot(courseID, name, prompt_flavor, profile_picture).then(rowsAdded => {
      if (rowsAdded.length == 0) {
          res.status(404).json({error: 'Error adding syllabot'});
          return;
      }

      SyllabotDAO.getSyllabot(rowsAdded.results.insertId).then(syllabot => {
          res.json(syllabot);
      });
  })
})

// Doesn't work, super messy with foreign keys. Shouldn't add unless absolutely needed

// router.delete('/syllabot/:syllabotid', (req, res, next) => {
//     const id = req.params.syllabotid;
//     console.log('check');
//
//
//     SyllabotDAO.deleteSyllabot(id).then(result => {
//         console.log(result);
//     });
// });

router.put('/syllabot/:syllabotid', (req, res, next) => {
  const id = req.params.syllabotid;
  const name = req.body.name;
  const prompt_flavor = req.body.prompt_flavor;
  const profile_picture  = req.body.profile_picture;

  SyllabotDAO.updateSyllabot(id, name, prompt_flavor, profile_picture).then(result => {
      if (result.results.affectedRows == 0) {
          res.status(404).json({error: "Error updating syllabot"})
      }

      SyllabotDAO.getSyllabot(id).then(syllabot => {
          res.json(syllabot);
      });
  })
})

router.get("/deploys/all", (req, res, next) => {
  DeployDAO.getDeploys().then(deploys => {
      res.json(deploys);
  });
});



module.exports = router;