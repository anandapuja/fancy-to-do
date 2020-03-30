TODO REST API DOCUMENTATION

# Todos
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### GET /todos

> Get all todos

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
### POST /assets

> Create new asset

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