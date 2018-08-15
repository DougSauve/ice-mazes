"use strict"

const express = require('express');
const path = require('path');

const port = 4203;

const app = new express();

app.use(express.static(path.join(__dirname, '../dist') ) )


app.listen(port, () => {
    console.log(`server listening at port ${port}.`);
});