import mongoose from "mongoose";
import chalk from "chalk";
import 'dotenv/config'
const url = process.env.MONGODB_URL;

const connectToDb = async()=>{

    try{
        await mongoose.connect(url,{dbName:"productdb"})
        console.log(chalk.bgGreen.white('connected to MongoDb'))
    }
    catch(error){
        console.log(chalk.bgRed('error connecting to db'))
        console.log(error)
    };
}

export default connectToDb;