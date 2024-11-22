const Task = require('../model/Task')
const aqp = require('api-query-params')
const mongoose = require('mongoose')

const createTaskService = async(data) => {
    let results
    try{
         results = await Task.create(data)
         return results
    }
    catch(error)
    {
        console.log("Error occur when CreateTaskService work : ",error)
        return {
            code : 404,
            message : error
        }
    }
    
}

const getTaskService = async(queryObj) => {
    console.log("getTaskService called")
    let page = queryObj.page
    const queryString = aqp(queryObj)
    //delete page because aqp library will included in filter
    delete queryString.filter.page
    //Limit default will be 8
    limit = queryString.limit ? queryString.limit : 8
    let offset = (page - 1) * limit
    const populate = queryString.population

    console.log("queryObj : ",queryString)
    console.log("offset : ",offset)
    console.log("populate : ",populate)
    filter = queryString.filter
    console.log("filter : ",filter)
    tasks = await Task.find(filter)
                            .populate(populate)
                            .skip(offset)
                            .limit(limit).exec()
    if(tasks) return {
        code : 200,
        payload : tasks
    }
    return {
        code : 404,
        message : "Not Found task"
    }
}



const deleteTaskService = async(data) => {
    console.log('deleteTaskService is called')
    console.log("data : ",data)
    try{
        let results = await Task.deleteOne({_id:data.taskId})
        return {
            code : 200,
            payload : results
        }
    }

    catch(error) {
        return {
            code :404,
            message : error
        }
    }
    
}


const updateTaskService = async(data) => {
   try
   {
    let results = await Task.updateOne({_id:data.taskId},{...data})
   
    return {
        code : 200,
        payload : results
    }
   }

   catch(error) {
        return {
            code : 404,
            message : error
        }
   }
    
}

const updateUserInTaskService = async() =>{

}

module.exports = { 
    createTaskService,
    getTaskService,
    deleteTaskService,
    updateTaskService,
    updateUserInTaskService
}