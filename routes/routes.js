const express = require('express');
const router = express.Router();

const User = require('../models/User')

// READ

router.get('/', async (req, res) => {

    // Trazendo todos os registros
    // Sem o raw ele traz mais informações, com o raw ele já trás os dados mais fáceis para utilização
    const users = await User.findAll({ raw: true })

    console.log(users)

    res.render('home', { users: users })
})

router.get('/users/create', (req, res) => {
    res.render('adduser')
})

// CREATE

router.post('/users/create', async (req, res) => {
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if (newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }

    await User.create({ name, occupation, newsletter })

    console.log('Dados recebidos:', req.body)
    console.log('Tipo de name:', typeof req.body.name)

    res.redirect('/')

})

router.get('/users/:id', async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({ raw: true, where: { id: id } })

    console.log(user)

    res.render('userview', { user })
})

module.exports = router;