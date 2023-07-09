const Task = require('../models/task')
const User = require('../models/user')
const jwt = require('jsonwebtoken');


module.exports.signUp = async (req,res)=>{
    const {
        email , password ,confirm_password
    } = req.body;

    console.log('Email in req.body',email,req.body)

    if(password !== confirm_password){
        return res.status(400).json({
            message : "passwords Do Not Match"
        })
    }

    let user = await User.findOne({email});

    if(user){
        return res.status(400).json({
            message : 'User ALready Exist'
        })
    }

    User.create({email, password})
    .then(user=>{
        return res.status(200).json({
            message : 'Successfully signed Up'
        })
    })
    .catch(err=>{
        if(err){
            console.log('Error in SIgn Up',err);
        }
    })
}

module.exports.createSession = async(req,res)=>{
    try {
        console.log('Create session req.body',req.body);
    
        const {
            email , password
        } = req.body;
    
        let user = await User.findOne({email})
        
        if(!user || user.password !== password){
            return res.status(404).json({
                message : 'Incorrect UserName or Password'
            })
        }
    
        return res.status(200).json({
            message : 'Sign In Successfully Here is your token Keep It Safe',
            data : {
                token : jwt.sign(user.toJSON(),'udit',{expiresIn : 1000000})
            }
        })
    } catch (err) {
        if(err){
            console.log('Error in Create Session', err);
            return res.status(404).json({
                message : 'Internal Server Error'
            })
        }
    }
}


// using async await 
module.exports.add = async function(req, res){
    console.log('THis is add function in Home Controller');
    // console.log('req',req);
    console.log('req.body',req._body);
    console.log('req.user',req.user);

    let {
        title, desc, category, d_date
    } = req.body
    if(!(title && desc && category && d_date)){
        return res.status(406).json({
            message : 'Incomplete Information'
        })
    }

    let task = await Task.create({
        title : title,
        desc : desc,
        category,
        d_date
    })

    let user = await User.findById(req.user._id);
    user.task.push(task._id)
    user.save();

    if(req.school){
        task.school = req.school;
        task.save() 
    }

    return res.status(200).json({
        message : 'Task Created Successfully',
        data : task
    })
}

// using promises 
// module.exports.add = (req,res) =>{
//     console.log('THis is add function in Home COntroller');
//     console.log('req.body',req.body);
//     let {
//         title, desc, category, d_date
//     } = req.body
//     if(!(title && desc && category && d_date)){
//         return res.status(406).json({
//             message : 'Incomplete Information'
//         })
//     }

//     Task.create({
//         title : title,
//         desc : desc,
//         category,
//         d_date
//     })
//     .then((task)=>{
//         return res.status(200).json({
//             message : 'Task Created Successfully',
//             data : task
//         })
//     })
// }

module.exports.home = async function(req, res){
    // res.statusCode = 200
    let user = await User.findById(req.user._id)

    console.log('0 User FOund Is',user);

    let data = [];

    // user.task.forEach((el , i)=>{
        // let task = await Task.findById(el);
        // console.log('1',task);
        // data.push(task)

    //     Task.findById(el)
    //     .then((task) => {
    //         console.log('1',task);
    //         data.push(task)
    //     },
    //     console.log('**')
    //     )
    // })

    for(let i = 0 ; i<user.task.length ; i++){
        let task =  await Task.findById(user.task[i])
        console.log('1',task);
        data.push(task);
    }

    console.log('2',data);

    return res.status(200).json({
        message: "data retrive sucessfully" ,
        data: data
    })
}

module.exports.delete = function(req, res){
    console.log("In the delete function",req.params);

    Task.findByIdAndDelete(req.params._id)
    .then(async data =>{
        console.log('deleted Item' , data);
        await User.findByIdAndUpdate(req.user._id,{$pull : {task :{_id : data?._id}}})
        return res.status(200).json({
            message : 'Task Deleted SUccessfully'
        })
    })
    .catch(err=>{
        console.log('Error deleting tSK',err);
        return res.status(500).json({
            message : 'Internal Server Error'
        })
    })
}