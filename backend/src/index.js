const express = require('express')
const app = express();
require('dotenv').config();
const main =  require('./config/db')
const cookieParser =  require('cookie-parser');
const authRouter = require("./routes/userAuth");
const redisClient = require('./config/redis');
const problemRouter = require("./routes/problemCreator");
const submitRouter = require("./routes/submit")
const aiRouter = require("./routes/aiChatting")
const rateLimiter = require("./middleware/rateLimiter")
const videoRouter = require("./routes/videoCreator");
const cors = require('cors');
require('dotenv').config();
require("node:dns/promises").setServers(["8.8.8.8", "1.1.1.1"]);


app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
}));

app.use(rateLimiter);
app.use(express.json());
app.use(cookieParser());

app.use(authRouter);
const videoRouter = require("./routes/videoCreator");
const cors = require('cors')
const rateLimiter = require("./middleware/rateLimiter")
require("node:dns/promises").setServers(["8.8.8.8", "1.1.1.1"]);



const ALLOWED_ORIGINS = [
  "https://leetcode-omega-five.vercel.app",
  "http://localhost:5173",
];

app.use(cors({
  origin: (origin, callback) => {
    if (
      !origin ||
      ALLOWED_ORIGINS.includes(origin) ||
      origin.endsWith(".vercel.app") 
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use(rateLimiter);
app.use('/user',authRouter);
app.use('/problem',problemRouter);
app.use('/submission',submitRouter);
app.use('/ai',aiRouter);
app.use("/video",videoRouter);


const InitalizeConnection = async ()=>{
    try{

        await Promise.all([main(),redisClient.connect()]);
        console.log("DB Connected");
        
        app.listen(process.env.PORT, ()=>{
            console.log("Server listening at port number: "+ process.env.PORT);
        })

    }
    catch(err){
        console.log("Error: "+err);
    }
}


InitalizeConnection();

