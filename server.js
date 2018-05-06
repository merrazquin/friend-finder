const express = require("express"),
    bodyParser = require("body-parser"),
    path = require("path"),
    app = express(),
    PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('app/public'))

require('./app/routing/apiRoutes')(app, path, __dirname)
require('./app/routing/htmlRoutes')(app, path, __dirname)

app.listen(PORT, () => {
    console.log('app listening on', PORT)
})
