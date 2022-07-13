let express = require('express');
let routes = express.Router();

routes.get('', (req, res)=>{
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

routes.get('/admin', (req, res)=>{
    console.log('URL: ', req.url);
    console.log('METHOD: ', req.method);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        users: []
    });
});

module.exports = routes;