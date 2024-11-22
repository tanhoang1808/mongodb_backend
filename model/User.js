const mongoose = require('mongoose')


console.log("module User is called")
// Shapte data
const userSchema = new mongoose.Schema({
    name: String,
    email : String,
    city : String,
  });

// NOTE: methods must be added to the schema before compiling it with mongoose.model()

  const User = mongoose.model('user',userSchema)
  
    
  module.exports = User