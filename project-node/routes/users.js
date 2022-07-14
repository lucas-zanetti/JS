let NeDB = require('nedb');
let db = new NeDB({
    filename: 'users.db',
    autoload: true
});

module.exports = (app) => {
    app.get('/users', (req, res)=>{
        console.log('URL: ', req.url);
        console.log('METHOD: ', req.method);

        res.setHeader('Content-Type', 'application/json');
            
        db.find({}).sort({name:1}).exec((err, users)=>{
            if (err){
                console.log(`Error: ${err}`);
                res.status(400).json({
                    error: err
                });
            } else {
                res.status(200).json({
                    users
                });
            }
        });
    });
    
    app.post('/users', (req, res)=>{
        console.log('URL: ', req.url);
        console.log('METHOD: ', req.method);
    
        res.setHeader('Content-Type', 'application/json');
        
        db.insert(req.body, (err, user)=>{
            if (err){
                console.log(`Error: ${err}`);
                res.status(400).json({
                    error: err
                });
            } else {
                res.status(201).json(user);
            }
        });        
    });
}