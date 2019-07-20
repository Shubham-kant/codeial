const express =require('express');
const cookieParser=require('cookie-parser');
const port=8000;
const app=express();
const expressLayouts=require('express-ejs-layouts');
//loaded the mongoose file here
const db=require('./config/mongoose');
//use for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
//importing connect-mongo module and specifically a arguement named 'session'. 
const MongoStore=require('connect-mongo')(session);

//importing node-sass-middleware
const sassMiddleware=require('node-sass-middleware');
//included connect-flash
const flash=require('connect-flash');
//imported middleware file
const customMware=require('./config/middleware');

//telling app to use it
app.use(sassMiddleware({
    /*
    src - Source directory used to find .scss or .sass files.
    dest - Destination directory used to output .css files. 
    */ 
   src:'./assets/scss',
   dest:'./assets/css',
   debug:true,
   outputStyle:'extended',
   prefix:'/css'

}));



app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('assets'));
//making the uploads path available to browser..
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use(expressLayouts);
//extraxt style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');
//mongo store is used to store session cookie in the db
app.use(session({
    name:'codeial',
    // TODO change the secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        //session set for 100 minutes
        maxAge:(1000*60*100)
    },
    //we are using here MongoStore instance
    store: new MongoStore(
    {
        mongooseConnection:db,
        autoRemove:'disabled'
    },function(err){
        console.log(err || 'connect mongo set up ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//telling app to use flash
app.use(flash());
//middleware_filename.functionName
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        // console.log(err);
        //this is just interpolation `` -these backtics..
        //${} in these brackets the particular thing gets evaluated..
        //to include a variable inside a string .this is interpolation
        console.log(`error is : ${err}`);
    }
    console.log(`port is running on port no:: ${port}`);
});