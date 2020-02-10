const express = require('express');

const Hubs = require('./data/hubs-model');

const server = express()

// Teaches express how to read JSON from the 'body'
server.use(express.json()) // needed for POST and PUT/PATCH

server.get('/', (req, res) => {
    res.json({ hello: 'Dude'})
})

// view a list of hubs
server.get('/api/hubs', (req, res) => {
    // go and get the hubs from the database
    Hubs.find().then(hubs => {
        res.status(200).json(hubs)
    }).catch(err => {
        console.log(err)
        res.status(500).json({ errorMessage: 'oops'})
    })
})

// add a hub
server.post('/api/hubs', (req, res) => {
    // AXIOS.POST(url, data)...Data is in the body of the request
    const hubInfo = req.body;
    // validate the data and if it is valid, add it to database (save it)
    Hubs.add(hubInfo).then(hub => {
        res.status(201).json(hub)
    }).catch(err => {
        console.log(err)
        res.status(500).json({ errorMessage: 'oopsies'})
    })
})

// delete
server.delete('/api/hubs/:id', (req, res) => {
    const { id } = req.params;

    Hubs.remove(id).then(removed => {
        res.status(200).json(removed)
    }).catch(err => {
        console.log(err)
        res.status(500).json({ errorMessage: 'ohhhh no'})
    })
})

const port = 5000
server.listen(port, () => console.log(`API on port ${port}`))

// npm run server