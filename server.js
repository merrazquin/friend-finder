const express = require("express"),
    bodyParser = require("body-parser"),
    path = require("path"),
    app = express(),
    PORT = process.env.PORT || 3000



app.listen(PORT, () => {
    console.log('app listening on', PORT)
})

require('./app/routing/htmlRoutes')(app, path, __dirname)