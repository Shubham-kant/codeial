const mongoose=require('mongoose');
const env=require('./environment');
// mongoose.connect(process.env.MONGODB_URI ||`mongodb://localhost/${env.db}`);
mongoose
    .connect(process.env.MONGO_URL || `mongodb://localhost/${env.db}`,{
        useUnifiedTopology:true,
        useNewUrlParser:true,
        useCreateIndex:true,
    })
    .then(()=> console.log('MongoDB connected....'))
    .catch((err) => console.log(err));
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error in connecting to Mongodb'));

db.once('open',function(){
    console.log('Connected to Database:: Mongodb');
});
module.exports=db;