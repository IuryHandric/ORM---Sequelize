const express = require('express');
const router = express.Router();

const User = require('../models/User')
const Address = require('../models/Address')

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

// READ

router.get('/users/:id', async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({ raw: true, where: { id: id } })

    console.log(user)

    res.render('userview', { user })
})

// DELETE

router.post('/users/delete/:id', async (req, res) => {
    const id = req.params.id

    await User.destroy({ where: { id: id } })

    res.redirect('/')
})

// UPDATE
// FORMULÁRIO
router.get('/users/edit/:id', async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findOne({ include: Address, where: { id: id } })
        // Usando o objeto dessa forma para conseguir ler o endereço passado pelo relacionamento
        res.render('useredit', { user: user.get({plain: true}) })
    } catch(e) {
        console.log(e)
    }

})

// UPDATE

router.post('/users/update', async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter

    if (newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }
    // Como o nome da variável e o nome do valor são iguais, o objeto pode ser montado dessa forma
    const userData = {
        id,
        name,
        occupation,
        newsletter
    }

    await User.update(userData, { where: { id: id } })

    res.redirect('/');

})

router.post('/address/create', async (req, res) =>{
    const UserId = req.body.UserId
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city

    const address = {
        UserId,
        street,
        number,
        city
    }

    await Address.create(address)

    res.redirect(`/users/edit/${UserId}`);
})

// DELETE

router.post('/address/delete', async (req, res) => {
    const UserId = req.body.UserId
    const id = req.body.id

    await Address.destroy({
        where: {id: id}
    })

    res.redirect(`/users/edit/${UserId}`)
})

module.exports = router;