const mongoose=require('mongoose');

//fetch the DATABASE value from dotenv file
const DB=process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log('Connection is successful');
    
}).catch((err)=>{
    console.log(`Connection is failed ${err}`);
    
})
