const express = require("express"),
    bodyParser = require("body-parser"),
    path = require("path"),
    app = express(),
    PORT = process.env.PORT || 3000

// use BodyParser to parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// use static to serve up JS scripts
app.use(express.static('app/public'))

// set up API and HTML routes
require('./app/routing/apiRoutes')(app)
require('./app/routing/htmlRoutes')(app)

// start server
app.listen(PORT, () => {
    console.log('app listening on', PORT)
})
