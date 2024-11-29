const express = require("express");
const bodyParser = require("body-parser");
const connectDb = require("./config/dbConnection");
require("dotenv").config();

connectDb();

const app = express();
const port = process.env.port || 5000;

// 使用 body-parser 中间件来解析 JSON 请求体
app.use(bodyParser.json());

// 引入路由
const contactRoutes = require('./routes/contactRoutes')

app.use("/api", contactRoutes);

app.listen(port, () => {
    console.log('app is listening', port);
})
