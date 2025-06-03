const express = require('express');
const router = express.Router();
const conn = require('../db/conn')

const User = require('../models/User')

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/users/create', (req,res) => {
    res.render('adduser')
})

router.post('/users/create', async (req, res) => {
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }

    await User.create({name, occupation, newsletter})

    console.log('Dados recebidos:', req.body)
    console.log('Tipo de name:', typeof req.body.name)

    res.redirect('/')

})

module.exports = router;