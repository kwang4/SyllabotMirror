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

router.post("/deploys", (req, res, next) => {
  const crs_id = req.params.courseid;
  const sec_num = req.params.sectionNum

  const syl_id = req.body.syl_id;
  const typ_id = req.body.typ_id;
  const primary_token = req.body.primary_token;
  const secondary_token = req.body.secondary_token;
  const socket_token = req.body.socket_token;
  const server_id = req.body.server_id;
  // console.log(`syl_id: ${syl_id}\ntyp_id: ${typ_id}\nprimary: ${primary_token}\nsecondary: ${secondary_token}\nsocket: ${socket_token}\n`);

  DeployDAO.createDeploy(syl_id, typ_id, primary_token, secondary_token, socket_token, server_id, crs_id, sec_num).then(response => {
    res.json(response);
  });
});

router.post("/botStartup", async (req, res, next) => {
  const primary_token = req.body.primary_token;
  const ss_token = req.body.ss_token;
  const app_token = req.body.app_token;
  try{
    let results = await DeployDAO.createSlackBot(primary_token, ss_token, app_token);
    res.send(results);
  }
  catch(error){
    res.send(error);
  }
})

router.put("/deploy/:typeid", async (req, res, next) => {
  const crs_id = req.params.courseid;
  const sec_num = req.params.sectionNum
  const typ_id = req.params.typeid;

  const primary_token = req.body.primary_token;
  const secondary_token = req.body.secondary_token;
  const socket_token = req.body.socket_token;
  const dep_server_id = req.body.dep_server_id;
  deploy = await DeployDAO.getDeployBySectionAndType(crs_id, sec_num, typ_id);
  if (!deploy) {
    res.json({error: `Deploy not found with parameters courseid=${crs_id}, sectionNum=${sec_num}, typeid=${typ_id}`});
  }
  result = await DeployDAO.updateDeploy(primary_token, secondary_token, socket_token, dep_server_id, crs_id, sec_num, typ_id);
  if(typ_id == 1)
  {
    try {
      DeployDAO.createSlackBot(primary_token,secondary_token, socket_token);
    }
    catch (error) {
      console.log(error);
    }
  }
  else if(typ_id==2)
  {
    try
    {
      DeployDAO.createDiscordBot(primary_token,dep_server_id);
    }
    catch(error)
    {
      console.log("Invalid Discord login");
    }
  }
  
  res.json(result);
});

router.get("/deploysBySection", (req, res, next) => {
  const crs_id = req.params.courseid;
  const sec_num = req.params.sectionNum
  DeployDAO.getDeploysBySection(crs_id, sec_num).then(deploys => {
    res.json(deploys);
  })
})



// MAY ALL BE DATED BENEATH THIS COMMENT

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