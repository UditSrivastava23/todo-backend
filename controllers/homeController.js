const Task = require('../models/task')

// using async await 
module.exports.add = async function(req, res){
    console.log('THis is add function in Home Controller');
    console.log('req',req);
    console.log('req.body',req._body);
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
    let data = await Task.find({})
    return res.status(200).json({
        message: "data retrive sucessfully" ,
        data: data
    })
}