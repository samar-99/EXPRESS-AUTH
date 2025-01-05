const { inscription, connexion } = require('../controllers/authController');

const router = require('express').Router();

router.post('/inscription', inscription);
router.post('/connexion', connexion);

module.exports = router;