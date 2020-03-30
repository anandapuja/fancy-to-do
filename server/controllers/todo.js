const { Todo } = require('../models');

class TodoController {
    // GET ALL DATA
    static getTodosData(req,res){
        Todo.findAll()
        .then( data => {
            res.status(200);
            res.json({ data });
        }).catch( err => {
            res.status(500);
        })
    }
    // POST DATA
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
    // GET A DATA
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
    // UPDATE DATA
    static putData(req,res){
        const reqbody = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        let rowUpdate;
        Todo.findByPk(Number(req.params.id))
        .then(data => {
            if( data ){
                console.log(data);
                rowUpdate = {
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    due_date: data.due_date
                }
                return Todo.update(reqbody, { where: { id: req.params.id }})
            } else {
                res.status(404);
                res.json({ msg: 'Error not found' });
            }
        }).then( data => {
            res.status(200);
            res.json({ data: rowUpdate });
        }).catch( err => {
            res.status(500);
            res.json({ msg: 'Internal server error' });
        })
    }
    // DELETE DATA
    static deleteData(req,res){
        let deletedData;
        Todo.findByPk(Number(req.params.id))
        .then( data => {
            deletedData = {
                title: data.title,
                description: data.description,
                status: data.status,
                due_date: data.due_date
            };
            return Todo.destroy({ where: { id: req.params.id }})
        }).then( data => {
            if( data === 1 ){
                res.status(200);
                res.json({ data: deletedData });
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