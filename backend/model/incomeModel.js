const {conn} = require('../db/db');

const IncomeSchema = new conn.Schema({
    title: {
        type: String,
    },
    amount: {
        type: Number,  
    },
    type: {
        type: String,      
    },
    date: {
        type: Date,    
    },
    category: {
        type: String,    
    },
    description: {
        type: String,    
    },
})
conn.model('income',IncomeSchema)
module.exports = IncomeSchema