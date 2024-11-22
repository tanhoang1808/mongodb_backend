require('dotenv').config()
const path = require('path')
const express = require('express')
var expressLayouts = require('express-ejs-layouts');
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const apiRoutes = require('./routes/api')
const fileUpload = require('express-fileupload')
const app = express()
const port = process.env.PORT
const hostname = process.env.HOST_NAME
const connection = require('./config/database');
const {MongoClient} = require('mongodb')
//Config file
app.use(fileUpload())

//config template engine
configViewEngine(app)

//Get form input element
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Config layout template
app.use(expressLayouts);
app.set('layout', path.join(__dirname, 'views', 'layouts', 'layout')); // Layout mặc định




// Cell running function
(async () => {
   try{
    //using mongoose
    await connection()

    
    app.listen(port,hostname,()=>
        {
            console.log(`App listening on port ${port}`)
            //Routes
            app.use('/',webRoutes)
            // REST APIs
            app.use('/v1/api/',apiRoutes)

        })
   }
   catch(error)
   {
    console.log(`"Database connect Error , App will not be launch : ${error}`)
   }
})()

