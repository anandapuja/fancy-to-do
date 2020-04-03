$(document).ready(() => {
    if(localStorage.getItem('token')){
        hideAll();
        $('#crud-nav').show();
        $('#todoTable').show();
        $('#table-todos').show();
        showAll();
        $(document.body).on('click', '.selected', function(){
            $('tr.todosRow').removeClass('selected');
        });
    } else {
        hideAll();
        $('#reg-log-nav').show();
        $('#register-section').show();
    }
});

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
            password: $('#passwordRegister').val()
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/register',
            data
        }).done( data => {
            const token = data.token;
            localStorage.setItem('token', token);
            if(!localStorage){}
            else {
                localStorage.setItem('token', data.token);
                if(localStorage){
                    hideAll();
                    $('#crud-nav').show();
                    $('#todoTable').show();
                    $('#table-todos').show();
                    showAll();
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
                if(localStorage.getItem('token')){
                    hideAll();
                    $('#crud-nav').show();
                    $('#todoTable').show();
                    $('#table-todos').show();
                    showAll();
                } else {
                    $('#login').show();
                    $('#crud-nav').hide();
                }
            }).fail( err => {
                // $('#message').show().append(`${err.responseJSON.message}`);
                console.log(err);
            })
    });

    //LOGOUT
    $("#logout").click(() => {
        hideAll();
        localStorage.removeItem('token');
        $('#reg-log-nav').show();
        $('#login-section').show();
        console.log('user logout');
    });

    // ADD BUTTON
    $('#add').click(() => {
        hideAll();
        $('#crud-nav').show();
        $('#section-add-form').show();
    });

    //  GOOGLE LOGOUT
    function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('User signed out.');
        });
    }

    // ADD DATA SUBMIT
    $('#addForm').submit(( event ) => {
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
            hideAll();
            $('#crud-nav').show();
            $('#todoTable').show();
            $('#table-todos').show();
            showAll();
            // $('#message').show().append('Success ADD todo, view in dashboard');
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
        $('#delete').removeAttr('disabled');
        $('#edit').removeAttr('disabled');
    });

    // DESELECT A DATA
    $(document.body).on('click', '.selected', function(){
        $('tr.todosRow').removeClass('selected');
    });

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
                hideAll();
                $('#crud-nav').show();
                $('#todoTable').show();
                $('#table-todos').show();
                showAll();
            }).fail(function(err){
                $('#message').show().append('Error DELETE todo');
            })
            $('.selected').remove();
        }
    })

    let dataId;
    //  EDIT BUTTON
    $('#edit').click(function(event){
        event.preventDefault();
        hideAll();
        $('#crud-nav').show();
        if(selectedItem){
            const todoId = selectedItem.attr('data-todoId');
            $('#section-edit-form').show();
            $.ajax({
                type: 'GET',
                url: `http://localhost:3000/todos/${todoId}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            }).done( data => {
                dataId = data.data.id;
                const dataWillEdit = {
                    title: data.data.title,
                    description: data.data.description,
                    status: data.data.status,
                    due_date: data.data.due_date
                };

                //  assignValue
                $('#titleedit').val(dataWillEdit.title);
                $('#descriptionedit').val(dataWillEdit.description);
                if(dataWillEdit.status === true){
                    $('.doneedit').attr('checked', true);
                } else {
                    $('.not-yetedit').attr('checked', true);
                }
                $('#due-dateedit').val(dataWillEdit.due_date);
            }).fail( function(err){
                $('#message').show().append('Error EDIT todo');
                console.log(err);
            })
        }
    });

    //  EDIT SUBMIT
    $('#editForm').submit(( event ) => {
        event.preventDefault();
        const dataEdited = {
            title: $('#titleedit').val(),
            description: $('#descriptionedit').val(),
            status: $('#statusedit').val(),
            due_date: $('#due-dateedit').val()
        };
        $.ajax({
            type: 'PUT',
            url: `http://localhost:3000/todos/${dataId}`,
            data: dataEdited,
            headers: {
                token: localStorage.getItem('token')
            }
        }).done( result => {
            hideAll();
            $('#crud-nav').show();
            $('#todoTable').show();
            $('#table-todos').show();
            showAll();
            // $('#message').show().append('Success EDIT todo, view in dashboard');
            // showAll();
        }).fail( err => {
            $('#message').show().append('Eror EDIT todo');
            console.log(err);
        });
    })


function showAll(){
    $('#delete').attr('disabled', true);
    $('#edit').attr('disabled', true);
    $('#delete-edit-message').show();
    $('#table-todos').show();
    $('#section-edit-form').hide();
    $('#section-add-form').hide();
    $('#table-todos').empty()
    $.ajax({
        url: 'http://localhost:3000/todos',
        headers: {
            token: localStorage.getItem('token')
        }
    }).done( todos => {
        if( todos.data.length === 0 ){
            $('#message-data').append(`<p>You haven't a data, please ADD YOUR TODO first</p>`);
            $('#message-data').show();
            $('#message-data').fadeOut(5000, ()=>{
                $('#message-data').empty();
            });
        } else {
            $('#table-todos')
            .append(`        
                <tr id="todosRow">
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Due Date</th>
                </tr>
            `);
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
        }
    }).fail( err => {
        console.log(err);
    });
};

function hideAll(){
    $('.sembunyi').hide();
};