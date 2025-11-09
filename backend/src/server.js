import express from 'express'
import notesRoutes from "./routes/noteRoutes.js"
import { connectDB } from './config/db.js'
import dotenv from "dotenv"
import rateLimiter from './middleware/rateLimiter.js'
import cors from "cors";
import path from 'path'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()


// middleware

if (process.env.NODE_ENV !== "production") {
    app.use(cors())
}



app.use(express.json())
app.use(rateLimiter)

// app.use((req,res,next) => { 
//     console.log('We Just Got A new request');
//     next()
//  })
app.use("/api/notes", notesRoutes)

if (process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname, '../frontend/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })

}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server Started Sucessfully at ${PORT}`);
    })
})



