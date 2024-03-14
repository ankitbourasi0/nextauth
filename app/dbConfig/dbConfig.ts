import * as mongoose from "mongoose";
export async  function connect(){
    try {
//        connect to the mongo atlas 
         mongoose.connect(process.env.MONGO_URI!)
        //get connection
        const connection: mongoose.Connection = new mongoose.Connection();
        //check if connected
    connection.on('connected',()=>{
        console.log("Mongo DB Connected Successfully");
    })
        //check if got error
        connection.on('error',()=>{
           console.log("There is error in connection, check or try again."+ process.exit()); 
        });
    }catch(error){
        console.log("Unable to CONNECT with MongoDB");
    }
}