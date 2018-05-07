require('dotenv').config()
const mongo_uri = process.env.MONGODB_URI,
    dbName = mongo_uri.split('/').pop(),
    mongodb = require('mongodb'),
    COLLECTION_NAME = 'friends'

module.exports = (app, path, root) => {

    app.get('/api/friends', (req, res) => {
        mongodb.MongoClient.connect(mongo_uri, (err, client) => {
            if (err) throw err

            let db = client.db(dbName)

            let friendsCollection = db.collection(COLLECTION_NAME)
            friendsCollection.find({}).toArray((err, docs) => {
                if (err) throw err

                res.json(docs)
                client.close()

            })
        })
    })

    app.post('/api/friends', (req, res) => {
        mongodb.MongoClient.connect(mongo_uri, (err, client) => {
            if (err) throw err

            let db = client.db(dbName),
                incomingScores = req.body.scores,
                minDiff = 41, // 41 = 4 (max diff) * 10 (num questions) + 1
                closestMatch,
                friendsCollection = db.collection(COLLECTION_NAME)

            friendsCollection.find({}).toArray((err, friends) => {
                if (err) throw err

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

                // return the closest match
                res.json(closestMatch)

                // add this post to the database
                friendsCollection.insert(req.body, (err, result) => {
                    if (err) throw err

                    client.close()
                })
            })
        })
    })
}