const express = require('express')
const app = express()
const mongoose= require('mongoose')
// const port = 3000
const houseRouter = require('./routes/houseRoutes')
const enquiryRouter = require('./routes/enquiryRoutes')
const userRouter = require('./routes/userRoutes')
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT
const cors = require('cors')

app.use(express.json())
app.use(cors())


// const db = module.exports = async()=> {
//     try{
//         await mongoose.connect("mongodb://192.168.100.177:27017/",)
//         console.log("MongoDB Connection is successful")
//     }catch(e){
//         console.log(e);
//         console.log("MongoDB Connection is not successful")
//     }
// }
// db();


const db = module.exports = async()=> {
    try{
        await mongoose.connect(process.env.MONGODBURL,{
            user : process.env.DBUSER,
            pass : process.env.DBPASS
        })
        console.log("MongoDB Connection is successful")
    }catch(e){
        console.log(e);
        console.log("MongoDB Connection is not successful")
    }
}
db();

app.use("/house/",houseRouter)
app.use("/enquiry/",enquiryRouter)
app.use("/user/",userRouter)



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
