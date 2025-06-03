const express = require('express');
const router = express.Router();
const conn = require('../db/conn')

router.get('/', (req, res) => {
    res.render('home')
})

module.exports = router;