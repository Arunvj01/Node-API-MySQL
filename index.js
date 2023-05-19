const express = require('express'),
    app = express(),
    bodyParser=require('body-parser');

require('express-async-errors')    


const db = require('./db')
employeeRoutes = require('./controllers/employee.controller')


//middleware
app.use(bodyParser.json())
app.use('/api/employees', employeeRoutes)
app.use((err,req,res,next)=>{
    console.log(err)
    res.status(err.status || 500).send('Something went wrong!')
})

//first make sure db connection is successful
//then start the express server .

db.query("SELECT 1")
    .then(() => {
        console.log('db connection succeeded.')
        app.listen(3001,
            () => console.log('server started at 3001'))
    })
    .catch(err => console.log('db connection failed.\n' + err))