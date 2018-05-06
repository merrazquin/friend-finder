module.exports = function (app, path, root) {
    app.get('*', function (req, res) {
        let pageName = req.url === '/survey' ? 'app/public/survey.html' : 'app/public/home.html'
        res.sendFile(path.join(root, pageName))
    })
}