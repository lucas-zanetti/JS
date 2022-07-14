module.exports = (app) => {
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
    
    app.post('/users', (req, res)=>{
        console.log('URL: ', req.url);
        console.log('METHOD: ', req.method);
    
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.body);
    });
}