 import express from "express"
import { getCurrentUser } from "../controllers/userController.js"
import isAuth from "../middleware/isAuth.js"

 const userRouter = express()

 userRouter.get("/currentuser" , isAuth , getCurrentUser)

 export default userRouter