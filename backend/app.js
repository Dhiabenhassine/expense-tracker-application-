const express = require('express')
const cors = require('cors');
const  {conn}  = require('./db/db');
const app = express()
const ExpenseSchema=require('./model/ExpenseModel')
const IncomeSchema=require('./model/incomeModel')

require('dotenv').config()

const PORT = process.env.PORT||3000


app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('hii')
})

const server = () => {
    
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()