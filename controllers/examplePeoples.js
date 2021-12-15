const express = require('express')
const router = express.Router()
const ExamplePeople = require('../models/examplePeople')
const config = require('../config/globals')
const mongoose = require('mongoose')


// this runs for before any method in this controller
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_SERVER)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    next()
})

//GET:/api/artists
router.get('/',(req, res) => {

    //fetch list of artists
    ExamplePeople.find((err,peoples)=>{

        if(err){
            console.log(err)
            //这里和原来的不同
            res.json(err).status(400)
        }
        else{
            //不去sending back a view而是sending back a json
            res.json(peoples).status(200)
        }

    })

})

// POST  /api/artists

// POST: /api/artists => try to create new artist & return either 400 Bad Request or 201 Resource Created
router.post('/', (req, res) => {
    ExamplePeople.create(req.body, (err, peoples) => {
        if (err) {
            console.log(err)
            res.json(err).status(400)
        } else {
            res.json(peoples).status(201)
        }
    })
})

// DELETE: /api/artists/abc123 => try to delete selected artist and return either 400 or 204 No Content
router.delete('/:_id', (req, res) => {
    ExamplePeople.remove({ _id: req.params._id }, (err, people) => {
        if (err) {
            console.log(err)
            res.json(err).status(400)
        }
        else {
            res.json(people).status(204)
        }
    })
})

//put 这个就是 update
router.put('/:_id', (req, res) => {
    ExamplePeople.findByIdAndUpdate({ _id: req.params._id }, req.body, (err, examplePeople) => {
        if (err) {
            console.log(err)
            res.json(err).status(400)
        }
        else {
            res.json(examplePeople).status(202)
        }
    })
})





// make public
module.exports = router