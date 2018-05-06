let friends = require('../data/friends')

module.exports = (app, path, root) => {
    app.get('/api/friends', (req, res) => {
        res.json(friends)
    })

    app.post('/api/friends', (req, res) => {
        let incomingScores = req.body.scores,
            minDiff = 41, // 41 = 4 (max diff) * 10 (num questions) + 1
            closestMatch

        friends.forEach(friend => {
            // map - create a new array of the differences between the 2 score arrays
            // reduce - then, sum all values in the new array
            let diff = incomingScores.map((val, index) => Math.abs(val - friend.scores[index])).reduce((acc, val) => { return acc + val })

            // if the current diff is lower than the minDiff, update the minDiff and track this friend as the closest match
            if (diff < minDiff) {
                closestMatch = friend
                minDiff = diff
            }
        })

        // add this post to the array
        friends.push(req.body)
        res.json(closestMatch)
    })
}