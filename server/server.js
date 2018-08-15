"use strict"

const express = require('express');
const path = require('path');

const app = new express();

app.use(express.static(path.join(__dirname, '../public') ) )

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/index.html'));
// });

app.listen(4203, () => {
    console.log('server listening at port 4203.')
});