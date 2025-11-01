import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin:process.env.CORSORIGIN,
    credentials: true,
}));
app.use(express.json({
    limit:"20kb"
}));
app.use(express.urlencoded({
    extended: true,
    limit: "20kb"
}));
app.use(express.static("public"));

app.use(cookieParser());



//import admin routes
import adminRoute from "./routes/admin.route.js";

app.use("/api/v1/admin",adminRoute);


//import user routes

import userRoute from "./routes/user.route.js"

app.use("/api/v1/user",userRoute);


















export default app;



