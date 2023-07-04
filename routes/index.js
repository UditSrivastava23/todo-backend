const express = require('express')
const router = express.Router()

const homeController = require('../controllers/homeController');

router.post('/add',homeController.add);

router.get('/home',homeController.home)

module.exports = router