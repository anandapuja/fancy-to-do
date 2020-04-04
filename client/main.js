
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

function onSignIn(googleUser) {
    console.log('user sign in via Google');
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/googleSignIn',
        data: {
            token: id_token
        }
    })
    .done( data => {
        localStorage.setItem('token', data.token);
        hideAll();
        $('#crud-nav').show();
        $('#todoTable').show();
        showAll();
        $('#table-todos').show();
    })
    .fail( err => {
        console.log(err);
    })
}

function googleLogOut(){
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.removeItem('token');
    $('#password').val('');
    $('#email').val('');
}

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
        if(data === 'Email UNVERIFIED by MAILBOXVALIDATOR'){
            console.log(data)
        } else {
            const token = data.token;
            localStorage.setItem('token', token);
            if(!localStorage){}
            else {
                localStorage.setItem('token', data.token);
                if(localStorage){
                    loginSuccessHandler();
                } else {
                    $('#login').show();
                    $('#crud-nav').hide();
                }
            }
        }
    }).fail((err) => {
        messageShow(err.responseJSON.msg);
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
                loginSuccessHandler();
            } else {
                $('#login').show();
                $('#crud-nav').hide();
            }
        }).fail( err => {
            messageShow(err.responseJSON.message);
            console.log(err);
        }
    );
});

//LOGOUT
$("#logout").click(() => {
    Swal.fire(
    'Logged out!',
    'Please login back.',
    'success'
    );
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
    $('#delete').attr('disabled', true);
    $('#edit').attr('disabled', true);
});

//  ADD NEW DATA BUTTON
$('#title-to-do-list').click(() => {
    hideAll();
    $('#crud-nav').show();
    $('#section-add-form').show();
    $('#delete').attr('disabled', true);
    $('#edit').attr('disabled', true);
    $('#title-to-do-list').empty();
});

// ADD DATA SUBMIT
$('#addForm').submit(( event ) => {
    event.preventDefault();
    let statusValue;
    statusValue = $("input[name='status']:checked").val();
    const data = {
        title: $('#title').val(),
        description: $('#description').val(),
        status: statusValue,
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
        successFormHandler();
    }).fail( err => {
        catchFormHandler(err);
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
    $('#delete').attr('disabled', true);
    $('#edit').attr('disabled', true);
});

//  DELETE A DATA
$('#delete').click(function(event){
    event.preventDefault();
    confirmDelete(selectedItem);
});

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

$('#cancel-edit').click(() => {
    confirmEdit()
});

//  EDIT/ PUT SUBMIT
$('#editForm').submit(( event ) => {
    event.preventDefault();
    let statusValue;
    statusValue = $("input[name='status']:checked").val();
    const dataEdited = {
        title: $('#titleedit').val(),
        description: $('#descriptionedit').val(),
        status: statusValue,
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
        successFormHandler()
    }).fail( err => {
        catchFormHandler(err);
    });
});


/*
***
FUNCTION SECTION
***
*/

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
    });
}

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
                $('#title-to-do-list').show();
                $('#title-to-do-list').append('<p class="text-light text-center">ADD NEW TODO HERE!</p>');
        } else {
            $('#table-todos')
            .append(`        
                <tr id="todosRow">
                    <th>No</th>
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
                        <td>${i+1}</td>
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

function emptyField(){
    $('#title').val('');
    $('#description').val('');
    $('#due_date').val('');
}

function catchFormHandler(err){
    if(err.status === 0){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong in server!',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.responseJSON.msg
        });
    }
    console.log(err);
}

function successFormHandler(){
    Swal.fire(
        'Success!',
        `Your Todo's action has been saved!`,
        'success'
    );
    hideAll();
    $('#crud-nav').show();
    $('#todoTable').show();
    $('#table-todos').show();
    showAll();
    emptyField();
}

function loginSuccessHandler(){
    Swal.fire(
        'Success!',
        `Now you're logged in!`,
        'success'
    );
    hideAll();
    $('#crud-nav').show();
    $('#todoTable').show();
    $('#table-todos').show();
    showAll();
    emptyField();
}

function confirmEdit(){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
      
    swalWithBootstrapButtons.fire({
        title: 'Cancel edit data?',
        text: "Press cancel to back home!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Continue edit',
        cancelButtonText: 'Yes, CANCEL!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) { }
        else if (result.dismiss === Swal.DismissReason.cancel) {
            hideAll();
            $('#crud-nav').show();
            $('#todoTable').show();
            $('#table-todos').show();
            showAll();
            emptyField();
        }
    });
}

function confirmDelete(selectedItem){
    Swal.fire({
        title: 'Are you sure to delete?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
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
        }
    })
}

function messageShow(message){
    $('#message-data').append(`<p>${message}</p>`);
    $('#message-data').show();
    $('#message-data').fadeOut(4000, ()=>{
        $('#message-data').empty();
    });
}