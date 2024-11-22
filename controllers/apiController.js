const User = require('../model/User.js')
const {uploadSingleFile,uploadMultiFiles} = require('../services/FileService.js')


const getUsersAPI = async (req,res) =>
    {
        const results = await User.find({})
        
        return res.status(200).json(
            {
                code : 200,
                success : true,
                payload : results,
            }
        )
    }

const postCreateUserAPI = async(req,res) => {
    let {email,name,city} = req.body
    const user = await User.create({
        email,
        name,
        city
    })
    return res.status(200).json({
        code : 200,
        success : true,
        payload : user,
    })

}
const putUpdateUserAPI = async(req,res) => {

    let {userId,email,name,city}  = req.body
    const user = await User.updateOne({
        _id : userId
    },
    {
        name : name,
        email : email,
        city : city
    })

    return res.status(200).json({
        code : 200,
        success : true,
        payload : user,
    })
}

const delDeleteUserAPI = async(req,res) => {
    var userId = req.body.userId
    console.log(`userId with ${userId} will be deleted`)
    const result = await User.deleteOne({_id : userId}).exec()
    return res.status(200).json({
        code : 200,
        id : userId,
        success : true,
        payload : result,
    })
}

const postUploadSingleFileAPI = async(req,res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
    //Suppose we have a file with name = file in HTML form
    let file = req.files.image
    let result = await uploadSingleFile(file)
    return res.json(
        {
            result
        }
    )
   
}

const postUploadMultiFileAPi = async(req,res) => {
    let result
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
    //Suppose we have a file with name = file in HTML form
    let files = req.files.image
    if(Array.isArray(files))
    {
         result = await uploadMultiFiles(files)
        console.log('Check results : ',result)
    }
    else {
         result = await uploadSingleFile(files)
        console.log('Check results : ',result)
    }
    return res.json(
        result
    )

}

const postCreateCustomerAPI = () => {

}

const getCustomerAPI = () => {

}


module.exports = {
    getUsersAPI,
    postCreateUserAPI,
    putUpdateUserAPI,
    delDeleteUserAPI,
    postUploadSingleFileAPI,
    postUploadMultiFileAPi,
    postCreateCustomerAPI,
    getCustomerAPI

}