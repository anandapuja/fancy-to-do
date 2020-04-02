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
                res.status(200);
                res.json({ data });
            } else {
                res.status(400);
                res.json({ msg: 'Error not found' });
            }
        }).catch( err => {
            res.status(500);
        })
    }
    // POST DATA
    static postTodoData(req,res){
        console.log(req.body)
        console.log(req.userId)
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userId
        }).then( data => {
            console.log('Data 1 >>>>>', data);
            if( data ){
                console.log('Data 2 >>>>>', data);
                res.status(201).json( data );
            } else {
                res.status(400).json({ msg: err.errors[0].message });
            }
        }).catch( err => {
            if( err.errors[0].message ){
                res.status(400).json({ msg: err.errors[0].message });
            } else {
                res.status(500).json({ msg: 'Internal server error'});
            }
        })
    }
    // GET A DATA
    static getTodoData(req,res){
        console.log('MASUK GET DATA')
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
        console.log('MASUK PUT DATA')
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
                res.status(200).json({ data: updatedData, status: 'success update' });
            } else {
                res.status(404).json({ msg: 'Error not found'});
            }
        }).catch( err => {
            res.status(500).json({ msg: 'Internal server error' });
        })
    }
    // DELETE DATA
    static deleteData(req,res){
        console.log('MASUK DELETE DATA')
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