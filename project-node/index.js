const express = require('express');

let app = express();

app.get('/', (req, res)=>{
    console.log('URL: ', req.url);
    console.log('METHOD: ', req.method);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Olá!</h1>');
});

app.get('/users', (req, res)=>{
    console.log('URL: ', req.url);
    console.log('METHOD: ', req.method);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        users: [
            {
                name: "Lucas Zanetti",
                email: "lucas.hzanetti@gmail.com",
                id: 1
            }
        ]
    });
});

app.listen(3000, '127.0.0.1', ()=>{
    console.log('Server running!');
});