require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const fileupload = require('express-fileupload')
const path = require('path')
const PORT  = process.env.PORT || 5000

const router = require('./routes/index')
const models = require('./models/models')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileupload({}))
app.use('/api', router)

const start = async() => {
    try{
        sequelize.authenticate()
        sequelize.sync()
        app.listen(PORT, console.log(`Server started on port ${PORT}`));
    }catch(e){
        console.log(e)
    }
}

start()