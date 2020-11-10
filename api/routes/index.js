var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = require("../db");
  var Users = db.Mongoose.model('usercollection', db.UserSchema,
'usercollection');
  Users.find({}).lean().exec(
     function (e, docs) {
        res.render('userlist', { "userlist": docs });
  });
});

/* login */
router.post('/login', function(req, res, next) {
    
    var db = require('../db');
    var User = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');

    var userName = req.body.username;
    var passWord = req.body.password;
    User.findOne({username: userName, password: passWord}, function(err, user){
      if (err) {
        res.status(500).json({ error: err.message });
        res.end();
        return;
      }

      if (!user) {
        res.status(404).send(userName);
        res.end();
        return;
      }

      res.json(user);
      res.end();
    });
});

/* Add Review */
router.post('/review', function (req, res, next) {

  var db = require('../db');
  var User = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');

  var userName = req.body.username;
  var passWord = req.body.password;
  var sAirline = req.body.airline;
  var sRating = req.body.rating;
  var sObs = req.body.obs;

  const strData = {
    airline: sAirline,
    rating: sRating,
    obs: sObs
  };

  User.findOneAndUpdate({username: userName, password: passWord}, {$push: { review: strData}},
  { upsert: true }, function (err, user) {
    if (err) {
        res.status(500).json({ error: err.message });
        res.end();
        return;
    }
    res.json(user);
    res.end();
  });
});

/* Check login status */
router.get('/dashboard', function(req, res) {

    if(!req.session.user) {
      return res.status(401).send();
    }
    return res.status(200).send("user:" + req.session.user.username);
});

/* GET ONE users. */
router.get('/users/:id', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  User.find({ _id: req.params.id }).lean().exec(function (e, user) {
      res.json(user);
      res.end();
  });
});

/* POST ONE users. */
router.post('/users', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  var newuser = new User({ username: req.body.username, password: req.body.password, review: [{airline: req.body.airline, rating: req.body.rating, obs: req.body.obs}] });
  newuser.save(function (err) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json(newuser);
      res.end();
  });
});

/* DELETE ONE user. */
router.delete('/users/:id', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('usercollection',
db.UserSchema, 'usercollection');
  User.find({ _id: req.params.id }).remove(function (err) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json({success: true});
      res.end();
  });
});

/* PUT ONE user. */
router.put('/users/:id', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  User.findOneAndUpdate({ _id: req.params.id }, req.body,
{ upsert: true }, function (err, doc) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json(req.body);
      res.end();
  });
});

/* ADD DATA TO ONE user. */
router.post('/users/:id', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  User.findOneAndUpdate({ _id: req.params.id }, {$push: { review: req.body} },
{ upsert: true }, function (err, doc) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json(req.body);
      res.end();
  });
});

/* GET New User page. */
router.get('/airlinesearch', function(req, res) {
  res.render('airlinesearch', { title: 'Search airline' });
});

/* Pesquisando Cia. Aérea */
router.get('/search/:iata', function (req,res, next) {

  var iataCode = req.params.iata;
  var axios = require('axios').default;

  var options = {
    method: 'GET',
    url: 'https://iata-and-icao-codes.p.rapidapi.com/airline',
    params: {iata_code: iataCode},
    headers: {
      'x-rapidapi-key': 'a6e21ca33fmsh5175883b93b2f91p19bd4bjsn43ef48d0f7e6',
      'x-rapidapi-host': 'iata-and-icao-codes.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
    res.json(response.data);
    res.end();
  }).catch(function (error) {
    console.error(error);
    res.end();
  });
})

module.exports = router;
