import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
})
import  {app} from './app.js'
import connectDB from './db/database.js'

connectDB()
.then(()=> {
    app.on("error", (error)=> {
        console.log("ERROR", error);
        throw error;
    });

    app.listen(process.env.PORT || 3000, ()=> {
        console.log(`Server is running on port ${ process.env.PORT || 3000 }`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed!!! ", err);
})