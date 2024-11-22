const mongoose = require('mongoose')

var mongoose_delete = require('mongoose-delete');


const customerSchema = new mongoose.Schema({
    name : String,
    phone : String,
    email : String,
})

const userSchema = new mongoose.Schema({
    name : String,
    email : String
})

const ProjectSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
        },
        startDate : {
            type : String,
            required : true
        },
        endDate : String,
        customerInfo : customerSchema,
        userInfo : [{type : mongoose.Schema.ObjectId,ref : 'user'}],
        leader : userSchema,
        tasks : [{type : mongoose.Schema.Types.ObjectId,ref :'tasks'}]

    },
    {timestamps : true} //createdAt, updatedAt
)

customerSchema.plugin(mongoose_delete);


// NOTE: methods must be added to the schema before compiling it with mongoose.model()

const Project = mongoose.model('projects',ProjectSchema)
  
   
module.exports = Project

