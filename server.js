const express = require('express');
const app = express();
const PORT = 4000;
const path = require('path');
const babel = require('@babel/core');
const fs = require('fs');


app.use('/rsc', express.static(path.join(__dirname, 'rsc')));

babel.transformFile('./client/client.js', { presets: ['@babel/react'] }, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        fs.writeFile('./rsc/client.js', res.code, (err) => {
            console.log(err)
        })
    }

})
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(PORT);