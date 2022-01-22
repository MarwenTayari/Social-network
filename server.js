const express = require('express'); 
const bodyParser = require('body-parser') ;
const cookieParser = require('cookie-parser') ;
const userRoutes = require('./routes/user.routes'); 
const postRoutes = require('./routes/post.routes'); 
require('dotenv').config({path:'./config/.env'}); //./config
require('./config/db'); 
const { checkUser , requireAuth } = require('./middleware/auth.middleware'); 
const cors = require('cors'); 
const path = require('path');    

const app = express();  

const corsOptions = {     
  origin: process.env.CLIENT_URL, 
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false  }


  //process.env.CLIENT_URL  corsOptions   */
app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true})); 
app.use(cookieParser());  
  
//jwt 
app.get('*', checkUser);   
app.get('/jwtid',requireAuth , (req,res)=> {
    res.status(200).send(res.locals.user._id)
}); 
 
//routes 
app.use('/api/user' , userRoutes) ;  
app.use('/api/post' , postRoutes) ;   

//serve a static assets if in production 
if(process.env.NODE_ENV ==='production') {
    //set static folder 
    app.use(express.static('client/build')); 

    app.get('*',(req,res) =>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
} 

const PORT = process.env.PORT || 5000 ; 

app.listen(PORT , ()=> {
    console.log(`Listening on port ${PORT}`)  
})  