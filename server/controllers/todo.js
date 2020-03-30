const { Todo } = require('../models');

class TodoController {
    static getTodosData(req,res){
        Todo.findAll()
        .then( data => {
            res.status(200);
            res.json({ data });
        }).catch( err => {
            res.status(404);
            res.json({ msg: 'Data not found' });
        })
    }
    static postTodoData(req,res){
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }).then( data => {
            res.status(210);
            res.json( data );
        }).catch( err => {
            res.status(500);
            res.json({ msg: 'Internal server error' });
        })
    }
    static getTodoData(req,res){
        res.send('masuk get todo')
    }
    static putData(req,res){
        res.send('masuk put todo')
    }
    static deleteData(req,res){
        res.send('masuk delete todo')
    }
}

module.exports = TodoController;