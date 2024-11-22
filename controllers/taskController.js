const {createTaskService,
        getTaskService,
        deleteTaskService,
        updateTaskService,
        updateUserInTaskService

} = require('../services/TaskService')

const initTaskController = {

    postCreateTaskAPI : async (req,res) => {
        
        let results = await createTaskService(req.body)
        res.json({
            results
        })
    },
    getTaskAPI : async(req,res) => {
        let results = await getTaskService(req.query)
        res.json({
            results
        })
    },
    deleteTaskAPI : async(req,res) => {
        let results = await deleteTaskService(req.body)
        res.json({
            results
        })
    },
    updateTaskAPI : async(req,res) => {
        let results = await updateTaskService(req.body)
        res.json({
            results
        })
    },
    updateUserInTaskAPI : async(req,res) => {
        let results = await updateUserInTaskService()
        res.json({
            results
        })
    }
}



module.exports = initTaskController