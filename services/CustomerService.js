const Customer = require('../model/Customer')
const aqp = require('api-query-params')



const createCustomerService  = async (customerData) => {
    try{
        let result  = await Customer.create({
            name : customerData.name,
            address : customerData.address,
            phone : customerData.phone,
            email : customerData.email,
            description : customerData.description,
            image : customerData.imagePath,
        })
        console.log(`Results when created customer : `,result)
        return result
    }
    catch(error)
    {
        console.log(`Error has been made when create a customer ==> ${error}`)
    }


}

const createManyCustomerService = async(customers) => {
    try{
        let result = await Customer.insertMany(customers)
        return result
    }
    catch(error)
    {
        console.log(`Error >>>> ${error} <<<< in createManyCustomerService`)
    }
}

const getCustomersService = async (queryObj) => {
    let customers = null

   
    let page = queryObj.page
    const obj = aqp(queryObj)
    //delete page because aqp library will included in filter
    delete obj.filter.page
    //Limit default will be 8
    limit = obj.limit ? obj.limit : 8

    //calculated offset
    let offset = (page - 1) * limit
    console.log(obj)

    filter = obj.filter

    
    if(Object.keys(filter).length > 0) customers = getCustomerServiceWithFilter(filter,limit,offset)
    
    else {
            customers = getCustomerServiceWithoutFilter(limit,offset)
    }
    //Limit has default value  so do not necessary have to conditional
   
    return customers
}

const getCustomerServiceWithFilter = async (filter,limit,offset) => {
   
    console.log("getCustomerServiceWithFilter called")
    const customers = await Customer.find(filter)
                                .skip(offset)
                                .limit(limit).exec()
    console.log("customers : ",customers)
    return customers
}

const getCustomerServiceWithoutFilter = async (offset,limit) => {
    console.log("getCustomerServiceWithoutFilter called")
    const customers = await Customer.find({}).skip(offset).limit(limit).exec()
    console.log("customers : ",customers)
    return customers
}

const deleteManyCustomerByIdService = async(ids) => {
    try {
        const results = await Customer.deleteMany({ _id: ids})
        console.log('results :',results)
        return results
    }
    catch(error){
        console.log(`Error happened when try to delete many customer by id : `,error)
        return null
    }
}


module.exports = {
    createCustomerService,
    createManyCustomerService,
    getCustomersService,
    deleteManyCustomerByIdService
}