"use strict"


const express = require('express');
const path = require('path');

const {readLevelData} = require('./readLevelData');

const port = process.env.PORT || 4203;

const app = new express();

app.use(express.static(path.join(__dirname, '../dist') ) )

app.get('/levels/:level', async (req, res) => {
    const level = req.params.level;
    const levelData = await readLevelData(level);
    res.status(200).send(levelData);
});

app.listen(port, () => {
    console.log(`server listening at port ${port}.`);
});