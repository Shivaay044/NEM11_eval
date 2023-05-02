const express = require("express")
const connection = require("./Config/db")
const userRouter = require("./routes/user.routes")
const postRouter = require("./routes/post.routes")
const Authentication = require("./Middlewares/Authentication.middleware")
const app = express()
require("dotenv").config()



app.use(express.json())


app.use("/users",userRouter)

app.use(Authentication)
app.use("/posts",postRouter)





app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error.message)
    }
   console.log(`server is running at ${process.env.PORT}`)
})