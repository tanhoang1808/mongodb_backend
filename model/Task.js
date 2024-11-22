const mongoose = require('mongoose')
var mongoose_delete = require('mongoose-delete');

const projectSchema = new mongoose.Schema(
    {
        name : String,
        startDate : String,
        endDate : String,
        description : String,
    }
)

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    city : String
})


// Shapte data
const taskSchema = new mongoose.Schema(
  {
    name: {
      type : String ,
      required : true,
      },
    description : String,
    status : String,
    startDate : String,
    usersInfo : userSchema,
    projectInfo : projectSchema
    
  },
  {timestamps: true}
)
taskSchema.plugin(mongoose_delete);


// NOTE: methods must be added to the schema before compiling it with mongoose.model()

  const Task = mongoose.model('tasks',taskSchema)
  
   
module.exports = Task