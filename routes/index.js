var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.email){
    res.redirect('login')
  }
  else{
    sql = "SELECT * FROM tasks"; // todo add a where 
    var query = db.query(sql, function(err, result){
      res.render('index', { title: req.session.email, data: result, message:"" });
    })
    //res.render('index', { title: req.session.email });
  }
});

router.post('/add', function(req, res, next) {
  post = req.body;
  newTask = post.newTask;
  if (!newTask){
    sql = "SELECT * FROM tasks"; // add a where the req.email id here todo
    var query = db.query(sql, function(err, result){
      console.log(result)
      res.render('index', { title: req.session.email, data: result, message:"New Task cannot be empty! " });
    })
  }else{
    sql = "SELECT userID from users WHERE email = '"  + req.session.email + "'";
    var query1= db.query(sql, function(err, result){
      userId = result[0]["userID"];
      console.log(userId);
      sql = "INSERT INTO tasks(userID, task, status) VALUES (" + userId + ", '" +  newTask + "', 0)";
      var query = db.query(sql, function(err, result){
        console.log(sql)
        console.log(result);
        res.redirect('/')
      })
    });
    // sql = "INSERT INTO task(userID, task, status) VALUES ('" + ;
    // var query = db.query(sql, function(err, result){
    //   console.log(result)
    //   res.redirect('/')
    // })
  }
  //res.redirect('/')
});

router.get('/login', function(req, res){
  if (req.session.email){
    res.redirect('/')
  }
  else{
    res.render('login', {'message': ''})
  }
})

router.get('/signup', function(req, res){
  res.render('signup', {'message': ''})
})

router.post('/login', function(req, res){
  post = req.body;
  email = post.user_name;
  password = post.password;
  sql = "SELECT password FROM users WHERE EMAIL = '" + email  +"'";
  var query = db.query(sql, function(err, result){
    if(err){
      res.render('login', {'message': 'EMAIL DOES NOT EXIST'})
    }
    else{
      passwordFromDB = result[0]["password"];
      console.log(passwordFromDB)
      bcrypt.compare(password, passwordFromDB, function(err, result) {  // Compare
        // if passwords match
        if (result) {
          req.session.email = email;
          console.log("passwords match")
          res.redirect('/');
        }
        // if passwords do not match
        else {
          res.render('login', {'message': 'Passwords do not match! Try again! '})
        }
      });
    }
  })
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
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        sql = "INSERT INTO users(email, password) VALUES ('" + email +"','"  + hash + "')" ;
        var query = db.query(sql, function(err, result){
          if(err){
            console.log(err);
            res.render('signup', {'message': 'Sign up failed, try a new email!'});
          }
          else{
            req.session.email = email;
            res.redirect('/');
          }
        })
      });
    });
})

router.post('/logout', function(req, res){
  req.session.destroy(function(err){
    res.redirect('login')
  })
})

module.exports = router;
