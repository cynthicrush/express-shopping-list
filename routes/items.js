const express = require('express');
const ExpressError = require('../expressError');
const router = new express.Router();
const items = require('../fakeDb');

router.get('/', function(req, res) {
    res.json({items})
    // res.send('Hello')
})

router.post('/', function(req, res, next) {
    try {
        if (!req.body.name || !req.body.price) throw new ExpressError('Name and price are required!', 400)
        const newItem = { name: req.body.name, price: req.body.price }
        items.push(newItem)
        res.status(201).json({ item: newItem })    
    } catch (err) {
        return next(err)
    }
})

router.get('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
        throw new ExpressError('Item not found', 404)
    }
    res.json({ item: foundItem })
})

router.patch('/:name', (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
        throw new ExpressError('Item not found', 404)
    }
    foundItem.name = req.body.name
    foundItem.price = req.body.price
    res.json({ item: foundItem })
})

router.delete('/:name', (req, res) => {
    const foundItem = items.findIndex(item => item.name === req.params.name)
    if (foundItem === -1) {
        throw new ExpressError('Item not found', 404);
    }
    items.splice(foundItem, 1);
    res.json({ message: 'Deleted' })
})

module.exports = router;
