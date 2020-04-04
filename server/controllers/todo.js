const { Todo } = require('../models');

class TodoController {
    // GET ALL DATA
    static getTodosData(req,res){
        Todo.findAll({
            order: [['id', 'desc']],
            where: {
                UserId: req.userId
            }
        })
        .then( data => {
            if( data.length > 0 ){
                res.status(200).json({ data });
            } else {
                res.status(200).json({ data, msg: 'Data empty' });
            }
        }).catch( err => {
            res.status(500).json({
                msg: 'internal Server Error'
            });
        })
    }
    // POST DATA
    static postTodoData(req,res){
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userId
        }).then( data => {
            res.status(201).json( data );
        }).catch( err => {
            res.status(400).json({ msg: err.errors[0].message });
        })
    }
    // GET A DATA
    static getTodoData(req,res){
        Todo.findByPk(Number(req.params.id))
        .then( data => {
            if( data ){
                res.status(200).json({ data });
            } else {
                res.status(404).json({ msg: 'Error not found' });
            }
        }).catch( err => {
            res.status(500).json({ msg: 'Internal server error'});
        })
    }
    // UPDATE DATA
    static putData(req,res){
        const reqbody = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userId
        }
        let updatedData;
        Todo.findByPk(Number(req.params.id))
        .then(data => {
            if( data !== null ){
                updatedData = {
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    due_date: data.due_date
                }
                return Todo.update(reqbody, { where: { id: req.params.id }})
            } else {
                return 0;
            }
        }).then( data => {
            if( data.length > 0 ){
                res.status(200).json({ data: updatedData, status: 'Success update' });
            } else {
                res.status(404).json({ msg: 'Error not found'});
            }
        }).catch( err => {
            res.status(400).json({ msg: err.errors[0].message });
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
                res.status(200).json({ data: deletedData, status: 'success delete' });
            } else {
                res.status(404).json({ msg: 'Error not found' });
            }
        }).catch( err => {
            res.status(500).json({ msg: 'Error not found' });
        })
    }
}

module.exports = TodoController;