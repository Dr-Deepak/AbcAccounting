module.exports = {
  //Check if user is logged in
  isLoggedIn(req,res,next){
    if(req.isAuthenticated()) {
      return next();
    }
    else{
      res.redirect('/login');
    }
  }
}
