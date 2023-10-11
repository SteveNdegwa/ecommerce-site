const router = require('express').Router();
const {authenticate} = require('../controllers/jwt');

router.post("/", authenticate)

module.exports = router;