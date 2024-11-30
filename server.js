// 加载环境变量
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const connectDb = require("./config/dbConnection");
const jwtAuthMiddleware = require('./middlewares/jwtAuthMiddleware');
const asyncHandler = require("./middlewares/asyncHandler");
// 数据库连接
connectDb();

const app = express();
const port = process.env.port || 5000;

// 使用 body-parser 中间件来解析 JSON 请求体
app.use(bodyParser.json());

// 引入jwt中间件
app.use(jwtAuthMiddleware);

// 引入路由
const contactRoutes = require('./routes/contactRoutes')
const userRoutes = require('./routes/userRoutes');


app.use("/api", contactRoutes);
app.use("/api/auth", userRoutes);

app.listen(port, () => {
    console.log('app is listening', port);
})
