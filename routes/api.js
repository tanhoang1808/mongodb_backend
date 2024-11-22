
const express = require('express')
const aqp = require('api-query-params')

const routerAPI = express.Router()
const {getUsersAPI,
    postCreateUserAPI
    ,putUpdateUserAPI,
    delDeleteUserAPI,
    postUploadSingleFileAPI,
    postUploadMultiFileAPi,
    postCreateManyProjectAPI
    } = require('../controllers/apiController')
const projectController = require('../controllers/projectController.js')
const customerController = require('../controllers/customerController.js')
const taskController = require('../controllers/taskController.js')

routerAPI.get('/',(req,res)=>{
    res.send('Hello world with apis')
})


routerAPI.get('/users',getUsersAPI)
routerAPI.post('/users',postCreateUserAPI)
routerAPI.put('/users',putUpdateUserAPI)
routerAPI.delete('/users',delDeleteUserAPI)

routerAPI.post('/file',postUploadSingleFileAPI)
routerAPI.post('/files',postUploadMultiFileAPi)


routerAPI.get('/customers',customerController.getAllCustomerAPI)

routerAPI.post('/customers',customerController.postCreateManyCustomerAPI)
routerAPI.delete('/customers',customerController.deleteManyCustomerByIdAPI)
routerAPI.post('/customer',customerController.postCreateCustomerAPI)

routerAPI.post('/projects',projectController.postProjectAPI)
routerAPI.get('/projects',projectController.getProjectAPI)
routerAPI.delete('/projects',projectController.deleteProjectAPI)
routerAPI.put('/projects',projectController.updateProjectAPI)

routerAPI.post('/tasks',taskController.postCreateTaskAPI)
routerAPI.get('/tasks',taskController.getTaskAPI)
routerAPI.delete('/tasks',taskController.deleteTaskAPI)
routerAPI.put('/tasks',taskController.updateTaskAPI)




routerAPI.get('/info',(req,res)=>{
    return res.status(200).json(
        {
            data : req.query
        }
    )
})

routerAPI.get('/info/:name/:address',(req,res)=>{
    return res.status(200).json(
        {
            data : req.params
        }
    )
})



 module.exports = routerAPI