const {
    getProjectService,
    deleteProjectService,
    updateProjectService,
    postProjectService,} = require('../services/ProductService.js')


const initProjectController = {

    postProjectAPI : async (req,res) => {
        
        let results = await postProjectService(req.body)
        res.json({
            results
        })
    },
    getProjectAPI : async(req,res) => {
        let results = await getProjectService(req.query)
        res.json({
            results
        })
    },
    deleteProjectAPI : async(req,res) => {
        let results = await deleteProjectService(req.body)
        res.json({
            results
        })
    },
    updateProjectAPI : async(req,res) => {
        let results = await updateProjectService(req.body)
        res.json({
            results
        })
    }
}



module.exports = initProjectController