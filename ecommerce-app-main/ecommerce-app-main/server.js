import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

//config env
dotenv.config()

//database config
connectDB();

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json()); //using instead of body-parser
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,"./client/build")));

//routes
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
})
app.get('/',(req,res)=>{
    res.send("server started");
});

const port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log(`server started on ${port}`);
})
