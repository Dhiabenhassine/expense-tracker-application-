const mongoose = require('mongoose');
let conn=mongoose

const db = () => {
    try {
        mongoose.set('strictQuery', false)
       mongoose.connect(`mongodb://127.0.0.1/api`).then(()=>{

           console.log('Db Connected')
       })
    } catch (error) {
        console.log('DB Connection Error');
    }
}
db()
module.exports = {conn}