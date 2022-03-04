const express = require('express');
const ExpressError = require('../expressError');
const router = new express.Router();
const items = require('../fakeDb');

router.get('/items', function(req, res) {
    res.json({items})
    return res.send('Hello')
})

router.post('/items', function(req, res) {
    const newItem = {name: req.body.name, price: req.body.price}
    items.push(newItem)
    res.status(201).json({ item: newItem })
})

module.exports = router;
