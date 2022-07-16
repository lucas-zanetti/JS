let NeDB = require('nedb');
const { body, validationResult } = require('express-validator');

let db = new NeDB({
    filename: 'users.db',
    autoload: true
});

module.exports = (app) => {
    let route = app.route('/users');

    route.get((req, res)=>{
        db.find({}).sort({name:1}).exec((err, users)=>{
            if (err){
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json({
                    users
                });
            }
        });
    });
    
    route.post(
        [
        body('_name').notEmpty().withMessage('O nome é obrigatório.'),
        body('_email').notEmpty().withMessage('O email é obrigatório.'),
        body('_email').isEmail().withMessage('O email não é valido.')
        ], 
        (req, res)=>{
            let errors = validationResult(req).formatWith(({msg})=>msg);

            if(!errors.isEmpty()){
                app.utils.error.send(errors, req, res);
                return false;
            }

            db.insert(req.body, (err, user)=>{
                if (err){
                    app.utils.error.send(err, req, res);
                } else {
                    res.status(201).json(user);
                }
            });
        }
    );

    let routeId = app.route('/users/:id');

    routeId.get((req, res)=>{
        db.findOne({_id: req.params.id}).exec((err, user)=>{
            if (err){
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }
        });
    });

    routeId.put((req, res)=>{
        db.update({_id: req.params.id}, req.body, err =>{
            if (err){
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(Object.assign(req.body, {"_id": req.params.id}));
            }
        });
    });

    routeId.delete((req, res)=>{
        db.remove({_id: req.params.id}, {}, err =>{
            if (err){
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json({"_id": req.params.id});
            }
        });
    });
}