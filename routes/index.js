const express = require("express");
const router = express.Router();
const passport = require("passport");

const homeController = require("../controllers/homeController");

router.post("/sign-up", homeController.signUp);

router.post("/create-session", homeController.createSession);

router.post("/add",passport.authenticate("jwt", {
    session: false ,
    failureRedirect : 'http://localhost:8000/error/un-auth-error'
   }), homeController.add);

router.get(
  "/home",
  passport.authenticate("jwt", {
     session: false ,
     failureRedirect : 'http://localhost:8000/error/un-auth-error'
    }),
  homeController.home
);

router.get("/delete/:_id",passport.authenticate("jwt", {
    session: false ,
    failureRedirect : 'http://localhost:8000/error/un-auth-error'
   }), homeController.delete);

router.post("/update/:id",passport.authenticate("jwt", {
    session: false ,
    failureRedirect : 'http://localhost:8000/error/un-auth-error'
   }),homeController.update)

router.get("/error/un-auth-error",(req,res)=>{
    return res.status(401).json({
        message : 'You are Unauthorized'
    })
});


module.exports = router;
