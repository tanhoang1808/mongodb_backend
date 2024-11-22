const path = require('path')

const uploadSingleFile = async (file) => {
    
    let uploadPath
    let extName
    let baseName
    let fileName
    let finalName
    let finalPath
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    fileName = file.name
    extName = path.extname(fileName)
    baseName = path.basename(fileName,extName)

    finalName = `${baseName}-${Date.now()}${extName}`
    finalPath = `${uploadPath}/${finalName}`
    console.log({
        fileName,
        extName,
        baseName,

    })
    uploadPath = path.join(__dirname,'../public/images/upload')
  
     finalName = `${baseName}-${Date.now()}${extName}`
     finalPath = `${uploadPath}/${finalName}`
  try {
    // Use the mv() method to place the file somewhere on your server
    await file.mv(finalPath)
    return {
        status : true,
        path : finalName,
        error : null
    }
  }

  catch(error){
    return {
        status : false,
        path : null,
        error : JSON.stringify(error)
    }
  }

  
}


const uploadMultiFiles = async (files) => {
    let uploadPath
    let extName
    let baseName
    let fileName
    let finalName
    let finalPath
    let results = []

    //Loop through file 
    
    try {
        //Promise will wait to every promise inside map function return 
        const result = await Promise.all(
                files.map(async (file) => {
                const fileName = file.name;
                const extName = path.extname(fileName)
                const baseName = path.basename(fileName, extName)
    
                // Generate random name based on Date
                const finalName = `${baseName}-${Date.now()}${extName}`
                const uploadPath = path.join(__dirname,'../public/images/upload') // Path intentionally incorrect for testing
                const finalPath = `${uploadPath}/${finalName}`
    
                try {
                    // Try to move the file
                    await file.mv(finalPath)
                    return {
                        status: true,
                        path: finalName,
                        error: null
                    };
                } catch (error) {
                    // If an error occurs in mv()
                    return {
                        status: false,
                        path: finalName,
                        error: error.message
                    };
                }
            })
        );
    
        results.push(result)
    } catch (error) {
        console.error('Unexpected error:', error.message);
        
    }
    
  
    console.log("arrResult : ",results)
    return {

        results
    }
}

module.exports = {
    uploadSingleFile,
    uploadMultiFiles
}