const { Todo } = require('../models');

class TodoController {
    static getTodosData(req,res){
        Todo.findAll()
        .then( data => {
            res.status(200);
            res.json({ data });
        }).catch( err => {
            res.status(500);
        })
    }
    static postTodoData(req,res){
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }).then( data => {
            if( data ){
                res.status(201);
                res.json( data );
            } else {
                res.status(400);
                res.json( data );
            }
        }).catch( err => {
            res.status(500);
            res.json({ msg: 'Internal server error' });
        })
    }
    static getTodoData(req,res){
        Todo.findByPk(Number(req.params.id))
        .then( data => {
            if( data ){
                res.status(200);
                res.json({ data });
            } else {
                res.status(404);
                res.json({ msg: 'Error not found' });
            }
        }).catch( err => {
            res.status(500);
            res.json({ msg: 'Internal server error'});
        })
    }
    static putData(req,res){
        const reqbody = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.findByPk({
            where: {
                id: req.params.id
            }
        }).then(data => {
            if( data ){
                return Todo.update(reqbody, { where: { id: req.params.id }})
            } else {
                res.status(404);
                res.json({ msg: 'Error not found' });
            }
        }).then( data => {
            res.status(200);
            res.json({ data });
        }).catch( err => {
            res.status(500);
            res.json({ msg: 'Internal server error' });
        })
    }
    static deleteData(req,res){
        Todo.destroy({
            where: {
                id: req.params.id
            }
        }).then( data => {
            if( data === 1 ){
                res.status(200);
                res.json({ data });
            } else {
                res.status(400);
                res.json({ msg: 'Error not found' });
            }
        }).catch( err => {
            res.status(500);
            res.json({ msg: 'Error not found' });
        })
    }
}

module.exports = TodoController;