const Project = require('../model/Project.js')
const Task = require('../model/Task.js')

const aqp = require('api-query-params')
const mongoose = require('mongoose')

const postProjectService = async(data) => {
    let results = null
    let project
    let usersId
    let taskId
    switch(data.type){
        case  "ADD-USERS":
           try
           {
            project = await Project.findById(data.projectId)
        
            usersId = Array.isArray(data.userId) ? data.userId : Array.from([data.userId])
            
            userNum = usersId.length
           for(let i = 0 ; i < userNum;i++)
           {
            project.userInfo.push(usersId[i])
           }
           
            results = await project.save()
            return {
                code : 200,
                payload : results
            }
           }

           catch(error)
           {
                return {
                    code : 500,
                    message : error
                }
           }
        
        case "ADD-PROJECT":
            results = await Project.create({
                name : data.name,
                startDate : data.startDate,
                endDate : data.endDate,
                customerInfo : data.customerInfo,
                leader : data.leader
    
            })
        break
        case "ADD-TASKS":
            try
            {
            project = await Project.findById(data.projectId)
        
            taskId = Array.isArray(data.taskId) ? data.taskId : Array.from([data.taskId])
            taskExist = await Task.find({_id  : {$in: taskId}})
            
            console.log("task found : ",taskExist)
            
        
            userNum = taskExist.length
           for(let i = 0 ; i < userNum;i++)
           {
            project.tasks.push(taskExist[i])
           }
            results = await project.save()
             return {
                code : 200,
                payload : results
             }
            }

            catch(error)
            {
                return {
                    code : 500,
                    message : error
                 }
            }
           
            
    }
   
   
   

    
    
}

const getProjectService = async(queryObj) => {
    let projects = null

   
    let page = queryObj.page
    const obj = aqp(queryObj)
    //delete page because aqp library will included in filter
    delete obj.filter.page
    //Limit default will be 8
    limit = obj.limit ? obj.limit : 8
    const populate = obj.population
    
    let offset = (page - 1) * limit
   
    
    console.log("queryObj : ",obj)
    console.log("offset : ",offset)
   
    filter = obj.filter
    console.log("filter : ",filter)
    projects = await getProjectWithFilter(filter,limit,offset,populate)
    return projects
}

const getProjectWithFilter = async(filter,limit,offset,populate) => {
    console.log("getProjectWithFilter called")
    console.log("populate : ",populate)
    const projects = await Project.find(filter)
                                    .populate(populate)
                                    .skip(offset)
                                    .limit(limit).exec()
    
    return projects
} 

const deleteProjectService = async(reqBody) => {
    let results = null
    let keys = Object.keys(reqBody)
    let projectId = null
    let flag = keys.includes('projectId')
    let user = ''
    let index = ''
    if(!flag) return { 
        code : 400,
        success : false,
        message : flag == 'Body must have projectId' 
    }

    switch(reqBody.type)
    {
        case "REMOVE-PROJECT":
            try{
                projectId = reqBody.projectId
                results = await Project.deleteOne({_id : projectId}).exec()
                return {
                    code : 200,
                    status : 'success',
                    payload : results
                }
                
            }
            catch (error)
             {
                return {
                    code : 500,
                    status : "failed",
                    messages : error
                }

             }
        case "REMOVE-USER":
        
            project = await Project.findOne({_id: reqBody.projectId})
            user = project.userInfo.find((id) => JSON.stringify(id) === JSON.stringify(reqBody.userId))
            console.log("user : ",user)
            index = project.userInfo.indexOf(user)
            project.userInfo.splice(index,1)
            results = await project.save()
            return { 
                code : 200,
                success : true,
                payload : results
            }
        case "REMOVE-USERS":
        
            project = await Project.findOne({_id: reqBody.projectId})
            let users = project.userInfo
            
            results = await project.userInfo.pull(...users)
            project.save()
            return { 
                code : 200,
                success : true,
                
            }

    }


    
}


const updateProjectService = async(data) => {
    let project = await Project.findByIdAndUpdate(data.projectId,{...data}).exec()
    if(project)
    {
        return {
            code : 200,
            status : 'success',
            payload : project

        }
    }
    //Can not find Project
    return {
            code : 404,
            message : "Project not found"
    }
    
    
}

module.exports = { 
    postProjectService,
    getProjectService,
    deleteProjectService,
    updateProjectService,
}