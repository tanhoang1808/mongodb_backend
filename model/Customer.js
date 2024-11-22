const mongoose = require('mongoose')
var mongoose_delete = require('mongoose-delete');


// Shapte data
const customerSchema = new mongoose.Schema(
  {
    name: {
      type : String ,
      required : true,
      },
    address : String,
    phone  : String,
    email : String,
    image  : String,
    description : String,
    
    
  },
  {timestamps: true}
)
customerSchema.plugin(mongoose_delete);


// NOTE: methods must be added to the schema before compiling it with mongoose.model()

  const Customer = mongoose.model('customers',customerSchema)
  
   
module.exports = Customer