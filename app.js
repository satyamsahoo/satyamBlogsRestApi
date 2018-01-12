var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended : true}));

var middleWare = require('./myMiddleWares.js');

var dbPath = "mongodb://localhost/blogApp";

db = mongoose.connect(dbPath,{
  useMongoClient : true
});

//create connection
mongoose.connection.once('open', function(){
  console.log("database connection is open now!!");
});


var Blog = require('./blogModel.js');

//welcome page
app.get('/',function(req,res){
  res.send("Welcome to blog restApi....");
});

//Api to fetch all blog data.
app.get('/blogs',function(req,res){
  Blog.find(function(err,result){
    if (err) {
      res.send(err)
    }
    else {
      res.send(result)
    }
  });
});

//Api to create a blog.
//Passes through a middleware.
app.post('/blog/create', middleWare.checkRequired , function(req,res){
  var newBlog = new Blog({
     heading : req.body.heading,
     subHeading : req.body.subHeading,
     body : req.body.body,
     author : req.body.author
  });
   var allComments = (req.body.comments != undefined && req.body.comments != null)? req.body.comments.split(','):'';
   newBlog.comment = allComments;

  newBlog.save(function(error){
    if (error) {
      console.log(error);
      res.send("some error occurred.");
    }
    else {
      res.send(newBlog);
    }
  });

});

//Fetch a particular blog of given id.
app.get('/blogs/:id',function(req,res){
  Blog.findOne({'_id' : req.params.id},function(err,result){
    console.log(req.params.id);
    if(err){
      console.log(err);
      res.send("No such id present");
    }
    else {
      res.send(result);
      console.log(result);
    }
  });
});

//Edit a blog of given id.
app.put('/blogs/:id/edit',function(req,res){
  var update = req.body;
  console.log(req.body);
  Blog.findOneAndUpdate({'_id': req.params.id},update,function(err,result){
    if(err){
      console.log(err);
      res.send(err);
    }
    else {
      console.log(result);
      res.send(result);
    }
  });
});

//Delete a blog of given id.
app.post('/blogs/:id/delete',function(req,res){
  Blog.remove({'_id' : req.params.id},function(err,result){
    console.log(req.params.id);
    if(err){
      console.log(err);
      res.send(err);
    }
    else {
      res.send(result);
      console.log(result);
    }
  });
});

//Error message if unknow path is accessed.
app.get('*',function(request,response,next){
  response.status = 404;
  next("No such path exist!!!!  please check again.... :)");
});

app.listen(3000, function(){
  console.log('app listening on 3000 port');
});
