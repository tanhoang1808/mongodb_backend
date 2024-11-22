const {uploadSingleFile} = require('../services/FileService')
const {createCustomerService,createManyCustomerService,getCustomersService,deleteManyCustomerByIdService} = require('../services/CustomerService.js')
const Joi = require('joi')




const initCustomerController =  {
     postCreateCustomerAPI : async (req,res) => {
        
        let {name,address,phone,email,description} = req.body

       
        let imagePath 

        const schema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(30)
                .required(),
            phone: Joi.string()
                .pattern(new RegExp('^[0-9]{8,13}$')),
            address: Joi.string(),
            email: 
                Joi.string().email(),
            description: Joi.string()
            
        })

        
        let result = schema.validate(req.body,{abortEarly : false})
        console.log("result : ",result)

        return 




        let file = req.files.image
        if (!req.files || Object.keys(req.files).length === 0) {
            //do nothing 
          }
        else{
            let result = await uploadSingleFile(file)
            imagePath = result.path
        }
        //Suppose we have a file with name = file in HTML form
    


        //Call a model

       let customerData = {
            name,
            address,
            phone,
            email,
            description,
            imagePath
       }
       const customer = await createCustomerService(customerData)
       console.log('customer : ',customer)
        res.status(200).json({
            status : 'success',
            payload : customer,
            error : null
        })
    },

    getAllCustomerAPI : async (req,res) => {
       
        let results = ''
       
        results = await getCustomersService(req.query)
        
        if(results)
        {
            res.status(200).json({
                status : 'success',
                payload : results,
                error : null
            })
        }
        else{
            res.status(400).json({
                status : 'failed',
                
                error : null
            })
        }
    },

    postCreateManyCustomerAPI : async (req,res) => {
        let customersBody = req.body
        let customers = await createManyCustomerService(customersBody)
        if(customers=== undefined) {
            res.status(404).json({
                status : 'failed',
                error : null
            })
        }
        else{
            res.status(200).json({
                status : 'success',
                payload : customers,
                error : null
            })
        }
    },

    deleteManyCustomerByIdAPI : async(req,res) => {
        const ids = []
        const results = await deleteManyCustomerByIdService(ids)
       if(results)
       {
        res.status(200).json({
            status : 'success',
            payload : results,
            error : null
        })
       }
       else {
        res.status(404).json({
                status : 'failed',
                
                error : null
       })

    }

}
}

module.exports = initCustomerController