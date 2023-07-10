module.exports.school = (req,res,next)=>{
    // console.log('I am in the middleware');
    req.school = 'SRIMT'
    next();
}