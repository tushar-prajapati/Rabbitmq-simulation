import express from "express"
import routes from './routes/indexRoute.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cors from 'cors'
import runWorker from "./workers/worker.js"


dotenv.config();
const app= express();
const port = process.env.PORT || 3000;

connectDB();
app.use(cors())
app.use(express.json());


app.use('/api', routes)




app.listen(port, ()=>{
    console.log('Server Started...')
    runWorker().catch((err) => console.error("Worker failed:", err));
})