# FANCY TO DO APP

Fancy To Do application is created to manage your todo list, or manage your activity.

This application is build using latest technology include:
* RESTful API
* ExpressJS
* Postgres
* Sequelize
* Cors
* Bootstrap
* jQuery, ajax
* Node
* Sweetalert2
* ...

We are include
# 3rd PARTY API
* MailBoxValidator. [Click here!](https://www.mailboxvalidator.com/api-single-validation)
```
{
We using this 3rd party API to "extremly" CHECK validation of registrant email. You, that "REAL EXIST EMAIL ACCOUNT" can register in our application.
}
```

# oAuth
* Google Signin Integration [Click here!](https://developers.google.com/identity/sign-in/web/sign-in)
```
{
You can sign in into our application using GOOGLE SIGN IN. Your data will be added into our database.
}
```

We have several endpoints here:
# OUR ENDPOINTS

Route | Method | Req(s) | Res(s) | Description
---|---|---|---|---
`/todos` | GET | **Headers**<br>token: `String`<br>**Body**<br> not needed | **Success**<br>`200` All todos displayed<br>**Fail**<br>`500` Internal Server Error | Get all todos
`/todos` | POST | **Headers**<br>token: `String`<br>**Body**<br>title: `String`<br>description: `String`<br>status: `Boolean`<br>dueDate: `Date` | **Success**<br>`201` New todo created<br>**Fail**<br>`400` Validation error messages<br>`500` Internal Server Error | Create a todo
`/todos/:id` | GET | **Headers**<br>token:`String`<br>**Body**<br> not needed  | **Success**<br>`200` Todo displayed<br>**Fail**<br>`404` Todo not found<br>`500` Internal Server Error | Get one todo
`/todos/:id` | PUT | **Headers**<br>token: `String`<br>**Body**<br>title: `String`<br>description: `String`<br>status: `Boolean`<br>dueDate: `Date` | **Success**<br>`200` Edited todo displayed<br>**Fail**<br>`404` Todo not found<br>`400` Validation error messages<br>`500` Internal Server Error | Update one todo
`/todos/:id` | DELETE | **Headers**<br>token:`String`<br>**Body**<br> not needed  | **Success**<br>`200` Deleted todo displayed<br>**Fail**<br>`404` Todo not found<br>`500` Internal Server Error | Delete a todo

> Get all todos
### GET /todos

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "title": "Javascript",
    "description": "Learning Javascript",
    "status": "true",
    "due_date": "2020-01-04"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
  },
  {
    "id": 2,
    "title": "REST API",
    "description": "Learning REST API",
    "status": "true",
    "due_date": "2020-03-04"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "<returned error message>"
}
```
---
> Post new todo
### POST /todos

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "REST API",
  "description": "Learning REST API",
  "status": "true",
  "due_date": "2020-03-04"
}
```

_Response (201 - Created)_
```
{
    "id": 2,
    "title": "REST API",
    "description": "Learning REST API",
    "status": "true",
    "due_date": "2020-03-04"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<returned error message>"
}
```

---
> Get a todo
### GET /todos/:id

> Get a todo by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "id": 1,
    "title": "Javascript",
    "description": "Learning Javascript",
    "status": "true",
    "due_date": "2020-01-04"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z"
  }
```

_Response (400 - Bad Request)_
```
{
  "message": "<returned error message>"
}
```

---
> Update a todo
### PUT /todos/:id

> Update a todo by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "REST API",
  "description": "Learning REST API",
  "status": "true",
  "due_date": "2020-03-04"
}
```

_Response (200 - OK)_
```
{
  "title": "REST API",
  "description": "Learning REST API",
  "status": "true",
  "due_date": "2020-03-04"
}
```

_Response (404 - Not Found)_
```
{
  "message": "<returned error message>"
}
```

### DELETE /todos/:id

> Delete a todo by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "title": "REST API",
  "description": "Learning REST API",
  "status": "true",
  "due_date": "2020-03-04"
}
```

_Response (404 - Not Found)_
```
{
  "message": "<returned error message>"
}
```
