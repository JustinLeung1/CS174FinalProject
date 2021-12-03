var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.email){
    res.redirect('login')
  }
  else{
    res.render('index', { title: req.session.email });
  }
});

router.get('/login', function(req, res){
  res.render('login', {'message': ''})
})

router.get('/signup', function(req, res){
  res.render('signup', {'message': ''})
})

router.post('/login', function(req, res){
  res.render('login', {'message': ''})
})

router.post('/signup', function(req, res){
    post = req.body;
    email = post.user_name;
    password = post.password;
    passwordCheck = post.passwordCheck;
    if (!email || !password || !passwordCheck){ // checks for empties
      res.render('signup', {'message': 'Error, Email or Password or Password Check cannot be empty!'});
    }
    else if (password != passwordCheck){ // checks for passwords being similar
      res.render('signup', {'message': 'Error, passwords must match!'});
    }

    sql = "INSERT INTO users(email, password) VALUES ('" + email +"','"  + password + "')" ;
    var query = db.query(sql, function(err, result){
      if(err){
        res.render('signup', {'message': 'Sign up failed, try a new email!'});
      }
      else{
        req.session.email = email;
        res.redirect('index');
      }
      
    })
    
})

module.exports = router;
