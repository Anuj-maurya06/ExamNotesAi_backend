import express from "express"
import dotenv from "dotenv"
import connectDb from "./utils/connectdb.js"
import authRouter from "./routes/authRoute.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/userRoute.js"
import notesRouter from "./routes/generateRroute.js"
import pdfRouter from "./routes/pdfRoute.js"
import creditsRouter from "./routes/creditsRoute.js"
import { stripeWebhook } from "./controllers/creditsController.js"
import { deleteNote } from "./controllers/notesController.js"

 dotenv.config()

const app = express()

app.post(
  "/api/credits/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);


app.use(cors(
   {origin:"http://localhost:5173",
    credentials:true,
    method: ["GET", "POST" , "PUT" , "DELETE" , "OPTIONS"]
  }
))


app.use(express.json())
app.use(cookieParser())
const PORT = process.env.PORT || 5000
app.get("/",(req,res)=>{
  res.json({"message":"exam ai bacekend running"})
})

app.use("/api/auth" , authRouter)
app.use("/api/user" , userRouter)
app.use("/api/notes" , notesRouter)
app.use("/api/pdf" , pdfRouter)
app.use("/api/credit" , creditsRouter)
app.use("/api/delete" , deleteNote)


app.listen(PORT,()=>{
 console.log( `server running on ${PORT}`)
 connectDb()
})