import express from 'express'
import notesRoutes from "./routes/noteRoutes.js"
import { connectDB } from './config/db.js'
import dotenv from "dotenv"
import rateLimiter from './middleware/rateLimiter.js'
import cors  from "cors";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001


// middleware
app.use(cors())
app.use(express.json())
app.use(rateLimiter)

// app.use((req,res,next) => { 
//     console.log('We Just Got A new request');
//     next()
//  })
app.use("/api/notes", notesRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server Started Sucessfully at ${PORT}`);
    })
})



