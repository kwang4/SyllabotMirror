/**
 * Endpoints required for maintaining a course
 */

const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get('/', (req, res) => {

    const shibHeaders = {
        'unityid': req.headers['x-shib_uid'],
        'email':req.headers['x-shib_mail'],
        'first_name':req.headers['x-shib_givenname'],
        'last_name':req.headers['x-shib_sn']
    }
    res.json(shibHeaders);
  })





module.exports = router;