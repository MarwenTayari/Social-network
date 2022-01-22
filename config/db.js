const mongoose = require('mongoose'); 
require('dotenv').config({path:'../.env'}); 

mongoose.connect('mongodb+srv://' + process.env.DB_USER_PASS  + '@cluster0.mra4k.mongodb.net/mern-app?retryWrites=true&w=majority', 
    {
        useNewUrlParser : true , 
        useUnifiedTopology : true ,  
        useCreateIndex : true , 
        useFindAndModify : false 
    } 
)
.then( ()=> console.log('Connected to MongoDB'))
.catch( (err) => console.log("Failed to connect to MongoDB",err));  