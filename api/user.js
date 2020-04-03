const express          = require('express');
const mongoose         = require('mongoose');
const User             = require.main.require('./models/user');
const Exercise         = require.main.require('./models/exercise');
const bodyParser       = require('body-parser');
const router           = express.Router();
const expressSanitizer = require('express-sanitizer');


router.use(expressSanitizer());
// add an user and return with json data and returned will be an object with username and _id
router.post('/exercise/new-user', function (req, res) {
    var username = req.body.username;
    User.findOne({username: username}, function (error, data) {
        if(data !== null) {
            res.send('username already taken');
        } else {
            User.create({username: username}, function(error, data) {
                if(error) {
                    return console.log(error);
                }
                else {
                    res.status(201).json({username: data.username, _id: data._id});
                }
            });
        }
    });
});

// get an array of all users by getting api/exercise/users with the same info as when creating a user

router.get('/exercise/users', function(req, res) {
    User.find({}, function(error, data) {
        if(error) {
            return console.log(error);
        } else {
            if(data !== null) {
                res.json(data);
            } else {
                res.json({error: "No user data found"});
            }
        }
    })
});

// add an exercise to any user by posting form data userId(_id), description, duration, and optionally date to /api/exercise/add. If no date supplied it will use current date. App will return the user object with the exercise fields added
router.post('/exercise/add', function (req, res) {
    var userId      = req.sanitize(req.body.userId);
    var description = req.sanitize(req.body.description);
    var duration    = req.sanitize(req.body.duration);
    
    if(req.body.date !== '') {
        var date  = new Date(req.sanitize(req.body.date)).toDateString();
        console.log(date);
    } else {
        date = new Date().toDateString();
        console.log(date);
    }
    // check for the valid fields
    if(description === undefined || description === null || description === '') {
        res.send('Path `description` is required.');
    } else if(duration === undefined || duration === null || duration === '') {
        res.send('Path `duration` is required.');
    } else if(isNaN(duration)) {
        res.send('Path `duration` is not a valid number.');
    } else {
    // find user by their id and add exercises to db
    User.findOne({_id: userId}, function(error, data) {
        if(error) {
            res.json('unknown _id');
        } else {
            if(data) {
               Exercise.create({description: description, duration: duration, date: date}, function(error, exercise){
                   if(error) {
                       return console.log(error);
                   } else {
                       if(!error) {
                            res.status(201).json({username: data.username, description: exercise.description, duration: exercise.duration, _id: data._id, date: exercise.date});
                            //console.log(data.username, data._id, exercise.description, exercise.duration);
                       } else {
                           
                       }
                       
                   }
               });
            } else {
                res.json('unknown _id');
            }
            
        }
    })};  
});

// retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(_id). App will return the user object with added array log and count (total exercise count)


module.exports = router;