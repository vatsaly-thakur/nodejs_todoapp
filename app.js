import express from 'express';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import { config } from "dotenv";
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
import cors from "cors";

export const app = express();

config({
    path: "./data/config.env",
})

//Using Middlewares
app.use(express.json());
app.use(cookieParser());

//using routes
app.use("/api/v1/users", userRouter);//to send data in json fromat from postman
app.use("/api/v1/task", taskRouter);
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    })
);


app.get('/', (req, res) => {
    res.send("nice working");
});

//Using Error Middleware
app.use(errorMiddleware);


