# e-commerce

### <u>Shema</u>

All API access is over HTTP, and accessed from `http://localhost:8080`.
Deployed link `ecommerce.serafimsng.top`.

### <u>Authentication</u>

```
headers: {
  token: UserToken
}
```

# REST API


| Method | URL                          | Headers      | Data                                                                             | Description                                                                                   |
|--------|------------------------------|--------------|----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| POST   | /user/register              | None         | username: string<br> email: string<br> password: string                          | Register a new user                                                                           |
| POST   | /user/login                 | None         | email: string<br> password: string                                               | Login an existing user using email                                             |
| POST   | /user/gsignin            | None         | None                                                                | Login or register using Google OAuth2 service                                                 |
| GET    | /products                    | token:string | None                                                                             | Get all products                                                                    |
| GET    | /product/:id            | token:string | None                                                                             | Get specific product                                           |
| POST   | /product                       | token:string | name:string<br> description:string<br>  picture:string<br> created_date:date<br> price:integer | Create a new product |
| PATCH  | /product/:id                   | token:string | name:string<br> description:string<br>  picture:string<br> price:integer |                                   |
| DELETE | /product/:id                   | token:string | None                                                                             | Delete an product with the specified id                                                           |
| GET   | /cart                       | token:string | name:string<br> description:string<br>  picture:string<br> created_date:date<br> price:integer | Create a new product |
| GET  | /cart/history                  | token:string | name:string<br> description:string<br>  picture:string<br> price:integer |                                   |
| POST | /cart/:productId                   | token:string | None                                                                             | create or update a cart                                                         |
| PATCH  | /cart                  | token:string | none |                                   |
| DELETE | /cart/:cartId                   | token:string | None                                                                             | delete a cart                                                       |


### <u>Register User</u>

*return user name and token*

* **URL**

  /users/register

* **Method**

  `POST`

* **Data params**

  ```
  data: {
   username: string,
   email: email@format.com,
   password: string,
  }
  ```

  

* **Success Response**

    ```
    {
    "token":            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI0NmFkYzk4MGY4ODI5NzIwMmZlZjUiLCJ1c2VybmFtZSI6ImlvIiwiZW1haWwiOiJpb0BtYWlsLmNvbSIsImlhdCI6MTU3OTQ0NDk1Nn0.MqJZJvZ4ZfzjkAgQP35gwghodLVgI-4OX2VsN92dCUc",
    "username": "io",
    "email": "io@mail.com"
}
    ```

* **Error Response**

  * Code: 404
    Content:

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```


### <u>Login User</u>

*return user name and token*

* **URL**

  /user/login

* **Method**

  `POST`

* **Data params**

  ```
  data: {
   email: email@format.com,
   password: string,
  }
  ```

* **Data headers**

  ```
  none
  ```

  

* **Success Response**

  * Code: 202
    Content:  

    ```
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTIyZThhZjY2MzhlMjIxNDFjNmY2NTYiLCJ1c2VybmFtZSI6InNlcmEiLCJlbWFpbCI6InNlcmFAbWFpbC5jb20iLCJpYXQiOjE1Nzk0MzExNDF9.qGuqTtpi15tuH0gyM3gtAmd4QURBP5WTcqwe8RHyWxQ",
    "username": "sera",
    "email": "sera@mail.com"
    }
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```

### <u>Login with Google sign in</u>

*return user name and token*

* **URL**

  /user/gsignin

* **Method**

  `POST`

* **Data params**

  ```
  none

  ```

* **Data headers**

  ```
  none
  ```

  

* **Success Response**

  * Code: 202
    Content:  

    ```
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTIyZThhZjY2MzhlMjIxNDFjNmY2NTYiLCJ1c2VybmFtZSI6InNlcmEiLCJlbWFpbCI6InNlcmFAbWFpbC5jb20iLCJpYXQiOjE1Nzk0MzExNDF9.qGuqTtpi15tuH0gyM3gtAmd4QURBP5WTcqwe8RHyWxQ",
    "username": "sera",
    "email": "sera@mail.com"
    }
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```    



### <u>Create product</u>

*return created product's info*

* **URL**

  /product

* **Method**

  `POST`

* **Data params**


  ```
  data: {
   name: 'How to create API Doc',
   description: 'I have to learn how to make proper api documentation',
   picture: 'img.jpg',
   "price": 15000,
   stock: 20,
   seller: userId
  }
  ```

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 201
    Content:  

    ```
    {
    "_id": "5e2435303d78a61f669eaf7b",
    "name": "hello ",
    "description": "server",
    "stock": "2020-01-19T10:53:36.659Z",
    "price": 15000,
    "picture": "https://storage.googleapis.com/mini-wp-upload/1579431215663-irene-5.jpeg",
    "seller": "5e22e8af6638e22141c6f656"
    }
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```

### <u>Get product</u>

*return  products list*

* **URL**

  /product

* **Method**

  `GET`

* **Data params**

  none

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 202
    Content:  

    ```
    [
        {
            
            "_id": "5e22e9116638e22141c6f658",
            "name": "red",
            "description": "velvet",
            "stock": null,
            "price": 15000,
            "picture": "https://storage.googleapis.com/mini-wp-upload/1579431598317-irene-3.jpg",
            "UserId": {
                "_id": "5e22e8af6638e22141c6f656",
                "username": "sera",
                "email": "sera@mail.com"
                "__v": 0
            },
            "__v": 0
        }
    ]
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    

### <u>Delete product</u>

*return delete information*

* **URL**

  /product/:id

* **Method**

  `DELETE`

* **Data params**

  none

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 200
    Content:  

    ```
    {
        
    "_id": "5e22e8bf6638e22141c6f657",
    "name": "new updated",
    "description": "red velvet",
    "stock": "2020-01-18T12:00:11.000Z",
    "price": 15000,
    "picture": "https://storage.googleapis.com/mini-wp-upload/1579348811875-irene-3.jpg",
    "UserId": {
        "_id": "5e22e8af6638e22141c6f656",
        "username": "sera",
        "email": "sera@mail.com"
        "__v": 0
    }
    }
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
 

### <u>Update product</u>

*return product information*

* **URL**

  /product/:id

* **Method**

  `PATCH`

* **Data params**


  ```
  data: {
    name: 'new name',
    description: 'new description',
    picture: 'img.jpg',
    stock: new stock,
    "price": 15000,
  }
  ```

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

    ```
    {
       
    "result": {
        "_id": "5e230640d7423b30c76e7b43",
        "name": "red",
        "description": "velvet",
        "stock": 16,
        "picture": "https://storage.googleapis.com/mini-wp-upload/1579431635909-irene-3.jpg",
        "price": 15000,
        "__v": 0
    }
    }
    ```

* **Error Response**
    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```
  
  ### <u>Create Cart</u>

*return created product's info*

* **URL**

  /cart

* **Method**

  `POST`

* **Data params**


  ```
  data: {
   productId: 123,
   userId: 456,
   Quantity: 2,
   isCheckOut: false
  }
  ```

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 201
    Content:  

    ```
    {
    "_id": "5e2435303d78a61f669eaf7b",
   "productId": 123,
   "userId": 456,
   "Quantity": 2,
   "isCheckOut": false
    }
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```

### <u>Get product</u>

*return  products list*

* **URL**

  /cart

* **Method**

  `GET`

* **Data params**

  none

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 202
    Content:  

    ```
    [
        {
        "_id": "5e2435303d78a61f669eaf7b",
        "productId": 123,
        "userId": 456,
        "Quantity": 2,
        "isCheckOut": false
        }
    ]
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    

### <u>Delete cart</u>

*return delete information*

* **URL**

  /cart/:id

* **Method**

  `DELETE`

* **Data params**

  none

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 200
    Content:  

    ```
    {
    "_id": "5e2435303d78a61f669eaf7b",
   "productId": 123,
   "userId": 456,
   "Quantity": 2,
   "isCheckOut": false
    }
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
 

### <u>Update cart</u>

*return product information*

* **URL**

  /cart

* **Method**

  `PATCH`

* **Data params**


  ```
  data: {
    "_id": "5e2435303d78a61f669eaf7b",
   "productId": 123,
   "userId": 456,
   "Quantity": 2,
   "isCheckOut": false
    }
  ```

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

    ```
    {
    "_id": "5e2435303d78a61f669eaf7b",
   "productId": 123,
   "userId": 456,
   "Quantity": 2,
   "isCheckOut": false
    }
    ```

* **Error Response**
    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```
  