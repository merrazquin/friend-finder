const path = require('path')

module.exports = (app) => {
    // catch-all for any path
    app.get('*', (req, res) => {
        // if the requested URL is /survey, serve survey.html, otherwise, serve home.html
        let pageName = req.url === '/survey' ? 'survey.html' : 'home.html'
        res.sendFile(path.join(__dirname, '../public/' + pageName))
    })
}