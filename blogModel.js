var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema for blog.
var blogSchema = new Schema({
  heading : {type : String ,default :'',required : true},
  subHeading : {type : String},
  createdOn : {type : Date , default : Date.now},
  body : {type : String ,default :'', required : true},
  author : {type : String},
  comment : []
});

var Blog = mongoose.model('Blog',blogSchema);
module.exports = Blog;
