const express = require("express");
require("dotenv").config();

const app = express();

const port = process.env.port || 5000;

// 模拟的数据存储
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
];

// GET 请求：获取所有项目
app.get('/items', (req, res) => {
    res.json(items);
});

// GET 请求：获取单个项目
app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(item => item.id === id);

    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// POST 请求：添加新项目
app.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name
    };

    items.push(newItem);
    res.status(201).json(newItem);
});

// DELETE 请求：删除项目
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);

    if (index !== -1) {
        items.splice(index, 1);
        res.json({ message: 'Item deleted' });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});


app.listen(port, () => {
    console.log('app is listening', port);
})
