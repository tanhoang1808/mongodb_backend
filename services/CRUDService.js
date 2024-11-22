const connection = require( "../config/database")

const getAllUser = async () => {
    let [results,fields] = await connection.query(`SELECT * from Users`)
    return results
}

const getUserById = async(userId) => {
    let [results,fields] = await connection.query(`
        select * from Users where id = ? 
         `,
     [(userId)])
     let userEdit = results && results.length > 0 ? results[0] : {}
     
     return userEdit
}


const updateUserById = async(user) => {
    let{userId,name,email,city} = user
    console.log(userId,name,email,city)
    let [results,fields] = await connection.query(`
        UPDATE Users SET name = ? ,email= ?,city = ?
        WHERE id =?`,
    [name,email,city,userId])
    return results
}

const deleteUserById = async(userId) =>{
    let [results,fields] = await connection.query(`
        DELETE FROM Users WHERE id = ?`,
    [userId])
    console.log(`User with id = ${userId} has been deleted !!!`)
    
}

module.exports = {
    getAllUser,
    getUserById,
    updateUserById,
    deleteUserById

}