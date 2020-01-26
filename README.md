# E-Commerce

### Web Url : http://ecommerce.mputong.com/

### api-Documentation : 
``` API-BASE-URL: http://34.66.28.216 ```

List of available endpoints:
## Users
- `POST api/users/register`
- `POST api/users/login`
- `GET api/users/verify`
- `PATCH api/users/cart`
- `DELETE api/users/cart/:id`
- `GET api/users/`

## Items
- `GET api/items/`
- `GET api/items/:itemName`
- `POST api/items/register`

## Transactions
- `POST api/transactions/checkout`
- `PATCH api/transactions/:status/:id`
- `GET api/transactions/purchased`
- `GET api/transactions/sells`

### Error response format:
```json
{
  "code": 400,
  "errMsg": "..."
}
```
```json
{
  "code": 401,
  "errMsg": "You have no authorized to do this action"
}
```
```json
{
  "code": 403,
  "errMsg": "..."
}
```
```json
{
  "code": 404,
  "errMsg": "... not found"
}
```
```json
{
  "code": 500,
  "errMsg": "Internal server error"
}
```

#### POST api/users/register
- Request Body:
  - `name: {
             type: String,
             required: true,
             minlength: 3,
             maxlength: 30
         }`
  - `email: {
             type: String,
             required: true,
             unique: true
         },`
  - `password: {
             type: String,
             required: true,
             minlength: 8,
             validate: "Password must contain at least 1 number, letters, symbol, Uppercase and lowercase"
         }`
- Response:
  - `status`: `201`
  - ```json
    {
        "name": "...",
        "token": "...",
        "message": "User successfully registered"
    }
    ```

#### POST api/users/login
- Request Body:
  - `email: {
             type: String,
             required: true,
             unique: true
         },`
  - `password: {
             type: String,
             required: true,
             minlength: 8,
             validate: "Password must contain at least 1 number, letters, symbol, Uppercase and lowercase"
         }`
- Response:
  - `status`: `200`
  - ```json
    {
        "name": "...",
        "token": "...",
        "message": "User successfully verified"
    }
    ```
    
#### GET api/users/verify
- Request Header(s):
  - `token`: `<jwt token>`
- Response:
  - `status`: `200`
  - ```json
    {
        "name": "...",
        "token": "...",
        "message": "User successfully login"
    }
    ```

#### PATCH api/users/cart
- Request Header(s):
  - `token`: `<jwt token>`
- Request Body:
  - `cart: { 
      item: '<item._id>', 
      stock: 0, 
      price: <item.price> 
  },`
- Response:
  - `status`: `200`
  - ```json
    {
        "message": "item successfully add to cart"
    }
    ```

#### DELETE api/users/cart/:id
- Request Header(s):
  - `token`: `<jwt token>`
- Request Params:
  - `id: <cart._id>`
- Response:
  - `status`: `200`
  - ```json
    {
        "message": "item successfully remove from cart"
    }
    ```

#### GET api/users/
- Request Header(s):
  - `token`: `<jwt token>`
- Response:
  - `status`: `200`
  - ```json
    {
        "data": "<Object>"
    }
    ```
    
#### GET api/items/
- Response:
  - `status`: `200`
  - ```json
    {
        "data": "<Object>"
    }
    ```
    
#### GET api/items/:itemName
- Request Params:
  - `name: <item.name>`
- Response:
  - `status`: `200`
  - ```json
    {
        "data": "<Object>"
    }
    ```
    
#### POST api/items/register
- Request Header(s):
  - `token`: `<jwt token>`
- Request Body:
  - `name: {
             type: String,
             required: true,
             unique: true,
             minlength: 3,
             maxlength: 100
         }`
  - `stock: {
             type: Number,
             default: 0
         }`
  - `price: {
             type: Number,
             required: true
         }`
  - `image: {
             type: String
         }`
  - `description: {
             type: String,
             required: true,
             minlength: 15,
             maxlength: 500,
         }`
- Response:
  - `status`: `201`
  - ```json
    {
        "message": "Item successfully registered"
    }
    ```
    
#### POST api/transactions/checkout
- Request Header(s):
  - `token`: `<jwt token>`1
- Request Body:
  - `data: { 
      item: '<item._id>', 
      stock: 0, 
      totalPrice: 0 
  },`
- Response:
  - `status`: `201`
  - ```json
    {
        "message": "Transaction created"
    }
    ```
    
#### PATCH api/transactions/:status/:id
- Request Header(s):
  - `token`: `<jwt token>`
- Request Params:
  - `id: <transaction._id>`
  - `status: 'shipped' or 'done'`
- Response:
  - `status`: `200`
  - ```json
    {
        "message": "Status updated",
        "data": "<Object>"
    }
    ```
    
#### GET api/transactions/purchased
- Request Header(s):
  - `token`: `<jwt token>`
- Response:
  - `status`: `200`
  - ```json
    {
        "data": "<Object>"
    }
    ```
    
#### GET api/transactions/sells
- Request Header(s):
  - `token`: `<jwt token>`
- Response:
  - `status`: `200`
  - ```json
    {
        "data": "<Object>"
    }
    ```