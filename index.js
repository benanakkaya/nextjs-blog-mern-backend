import mongoose from 'mongoose';
import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import bodyParser from 'body-parser';
import PostRoute from "./routes/Post.js"
import UserRoute from "./routes/User.js"
import CategoryRoute from "./routes/Category.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({extended: true, limit: "30mb"}));
app.use(bodyParser.urlencoded({extended: true, limit: "30mb"}));
app.use("/post", PostRoute);
app.use("/user", UserRoute);
app.use("/category", CategoryRoute);

app.use("/", (req,res) => {
    res.send("Mern Stack Blog Project")
})

const PORT = 5000 || process.env.PORT;
const DB_URL = process.env.DB_URL;

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("connected to database")
    }).catch((err) => {
        console.log(err.message)
    })
})


