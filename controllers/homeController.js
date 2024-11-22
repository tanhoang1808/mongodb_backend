const { getAllUser,getUserById,updateUserById,deleteUserById } = require('../services/CRUDService.js')
const User = require('../model/User.js')

const getHomepage = async (req,res) =>
{
    const result = await User.find({})
    console.log("result : ",result)
    return res.render('home',
        {
            data : result, 
        }
    )
}

const getCreatePage = (req,res) =>
{
    
    return res.render('create')
}




const postCreateUser = async (req,res) =>
{
    console.log("PostCreateUser called")
    let {email,name,city}= req.body
    await User.create({
        email,
        name,
        city,
    })
    
   res.redirect('/')
}

const getEditPage = async (req,res) => {
    
    let userId = req.params.userId
    const user = await User.findById(userId).exec()
    
    return res.render(`edit`,
        {user}
    )
}

const postUpdateUser = async(req,res) => {
    
    let {userId,email,name,city}  = req.body
    console.log(req.body)
    await User.updateOne({
        _id : userId
    },
    {
        name : name,
        email : email,
        city : city
    })
    res.redirect('/')
}

const postDeleteUser = async(req,res) => {
    var userId = req.params.userId
    var user = await User.findById(userId).exec()
    console.log(user)
    res.render('delete',
        {user : user}
    )
}

const postHandleRemoveUser = async(req,res) => {
    var userId = req.body.userId
    console.log(`userId with ${userId} will be deleted`)
    await User.deleteOne({_id : userId}).exec()
    console.log(`UserId = ${userId} deleted`)
    res.redirect('/')
}

module.exports = {
    getHomepage,
    postCreateUser,
    getCreatePage,
    getEditPage,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser
}