import express from "express";
import data from "./data";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import userRoute from "./routes/userRoutes";
const {MONGOURI} = require("../frontend/keys");

dotenv.config();

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', ()=>{
    console.log("connected to mongoose");
})

mongoose.connection.on('error', ()=>{
    console.log("An error occured");
})

mongoose.set('useCreateIndex', true);

const app =  express();

app.use(bodyParser.json());
app.use("/api/users", userRoute);

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x=>x._id === productId);
    if(product)
        res.send(product);
    else
        res.status(404).send({msg: "Product not found"});
})

app.get("/api/products", (req, res) => {
    res.send(data.products);
})

app.listen(5000, () => console.log("listening"));