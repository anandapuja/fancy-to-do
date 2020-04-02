$(document).ready(() => {

    $('#crud-nav').hide();
    $('#reg-log-nav').show();
    $('#section-add-form').hide();
    $('#login-section').hide();
    $('#register-section').hide();
    $('#table-todos').hide();
    $('#message').hide();

    //  REGISTER BUTTON
    $('#register-button').click(() => {
        $('#register-section').show();
        $('#login-section').hide();
    });

    //  REGISTER SUBMIT
    $('#registerForm').submit(( event ) => {
        event.preventDefault();
        const data = {
            email: $('#emailRegister').val(),
            password: $('#emailRegister').val()
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/register',
            data
        }).done( data => {
            const token = data.token;
            localStorage.setItem('token', token);
            if(!localStorage){

            } else {
                localStorage.setItem('token', data.token);
                if(localStorage){
                    $('#register-section').hide();
                    $('#crud-nav').show();
                    $('#reg-log-nav').hide();
                    $('#table-todos').hide();
                } else {
                    $('#login').show();
                    $('#crud-nav').hide();
                }
            }
        }).fail((err) => {
            $('message').show().append(`${err.responseJSON.message}`);
            console.log(err);
        })
    });

    // LOGIN BUTTON
    $('#login-button').click(() => {
        $('#login-section').show();
        $('#register-section').hide();
    });

    // LOGIN SUBMIT
    $('#loginForm').submit(function( event ){
        event.preventDefault()
        const data = {
            email: $('#email').val(),
            password: $('#password').val()
        }
        $.ajax({
            url: 'http://localhost:3000/login',
            type: 'POST',
            data: data
            }).done( data => {
                localStorage.setItem('token', data.token);
                if(localStorage){
                    $('#login-section').hide();
                    $('#crud-nav').show();
                    $('#reg-log-nav').hide();
                    $('#table-todos').show();
                    $.ajax({
                        url: 'http://localhost:3000/todos',
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    }).done( todos => {
                        for( let i = 0; i < todos.data.length; i++ ){
                            $('#table-todos')
                            .append(`
                                <tr class="todosRow" data-todoId="${todos.data[i].id}">
                                    <td>${todos.data[i].title}</td>
                                    <td>${todos.data[i].description}</td>
                                    <td>${todos.data[i].status == true ? 'DONE' : 'NOT YET'}</td>
                                    <td>${todos.data[i].due_date}</td>
                                </tr>
                            `)
                        }
                    }).fail( err => {
                        console.log(err);
                    })
                } else {
                    $('#login').show();
                    $('#crud-nav').hide();
                }
            }).fail( err => {
                $('#error-message').show().append(`${err.responseJSON.message}`);
                console.log(err);
            })
    });

    // SHOW ALL DATA
    $('#dashboard').click(() => {
        $("tr.todosRow").remove();
        $('#message').hide();
        $('#table-todos').show();
        $('#section-add-form').hide();
        $.ajax({
            url: 'http://localhost:3000/todos',
            headers: {
                token: localStorage.getItem('token')
            }
        }).done( todos => {
            for( let i = 0; i < todos.data.length; i++ ){
                $('#table-todos')
                .append(`
                    <tr class="todosRow" data-todoId=${todos.data[i].id}>
                        <td>${todos.data[i].title}</td>
                        <td>${todos.data[i].description}</td>
                        <td>${todos.data[i].status == true ? 'DONE' : 'NOT YET'}</td>
                        <td>${todos.data[i].due_date}</td>
                    </tr>
                `)
            }
        }).fail( err => {
            console.log(err);
        })
    });

    $("#logout").click(() => {
        localStorage.removeItem('token');
        $("#reg-log-nav").show();
        $("#crud-nav").hide();
        $("#table-todos").hide();
        console.log('user logout');
    });

    // ADD BUTTON
    $('#add').click(() => {
        $('#section-add-form').show();
        $('#table-todos').hide();
    });

    // ADD DATA SUBMIT
    $('#addForm').submit(( event ) => {
        $('#message').hide();
        event.preventDefault();
        const data = {
            title: $('#title').val(),
            description: $('#description').val(),
            status: $('#status').val(),
            due_date: $('#due-date').val()
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/todos',
            data,
            headers: {
                token: localStorage.getItem('token')
            }
        }).done( todo => {
            $('#message').show().append('Success ADD todo, view in dashboard');
            console.log(todo);
        }).fail( err => {
            console.log(err);
        })
    });

    // SELECT A DATA
    let selectedItem = null;
    $(document.body).on('click', 'tr.todosRow', function(){
        $('tr.todosRow').removeClass('selected');
        $(this).addClass('selected');
        selectedItem = $(this);
    })

    //  DELETE A DATA
    $('#delete').click(function(event){
        event.preventDefault();
        if(selectedItem){
            const todoId = selectedItem.attr('data-todoId');
            $.ajax({
                type: 'DELETE',
                url: `http://localhost:3000/todos/${todoId}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            }).done(function(result){
                $('#message').show().append('Success DELETE todo, view in dashboard');
                console.log(result);
            }).fail(function(err){
                console.log(err);
            })
            $('.selected').remove();
        }
    })

    //  EDIT DATA
    $('#edit').click(function(event){
        event.preventDefault();
        if(selectedItem){
            const todoId = selectedItem.attr('data-todoId');
            $('#section-add-form').show();
            $('#table-todos').hide();
            // const todoId = selectedItem.attr('data-todoId');
            // $.ajax({
            //     type: 'PUT',
            //     url: `http://localhost:3000/${todoId}`,
            //     headers: {
            //         token: localStorage.getItem('token');
            //     }
            // }).done(function(){

            // }).fail
            // $('.selected').remove();
        }
    })
});