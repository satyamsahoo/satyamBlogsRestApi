

//middleware to check if all required fields are filled or not.
exports.checkRequired = function(req,res,next){

  if(req.body.heading != undefined && req.body.heading != null && req.body.body != undefined && req.body.body != null ){
    console.log("Required fields are filled");
    next();
  }
  else {
    res.send("Please fill all mandatory fields... :) ");
  }
}
