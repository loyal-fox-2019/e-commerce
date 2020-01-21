# e-commerce
## Documentation
Base url for accessing all APIs are :
```
http://localhost:3000
```

## User
### Register
- Method: `POST`
- Route: `/user/register`
- Body:
  ```
  {
    firstName: <first name>,
    lastName: <last name>,
    email: <email>,
    username: <username>,
    password: <password>
  }
  ```
- Output:
  - Status: **201**
  ```
  {
    firstName: <first name>,
    lastName: <last name>,
    email: <email>,
    username: <username>,
    message: 'Registration success'
  }
  ```
- Error Handler:
  - Status: **400**
  ```
    {
      "message": "Username or email already taken"
    }
  ```

### Login
- Method: `POST`
- Route: `/user/login`
- Body:
  ```
  {
    username: <username / email>,
    password: <password>
  }
  ```
- Output:
  - Status: **200**
  ```
  {
    token: <token>
  }
  ```
- Error Handler:
  - Status: **404**
  ```
    {
      "message": "Invalid username or password"
    }
  ```

## Product
### Get all products
- Method: `GET`
- Route: `/products`
- Headers: `{ token: <token> }`
- Output:
  - Status: **200**
  ```
  [
    {
      name: <product name>,
      price: <product price>,
      seller: <product seller id>,
      stock: <stock product>
    }
  ]
  ```
- Error Handler:
  - Status: **404**
  ```
    {
      "message": "Product not found"
    }
  ```
### Add new product
- Method: `POST`
- Route: `/products`
- Headers: `{ token: <token> }`
- Body:
  ```
  {
    name: <product name>,
    price: <product price>,
    seller: <product seller id>,
    stock: <stock product>
  }
  ```
- Output:
  - Status: **201**
  ```
  {
    name: <product name>,
    price: <product price>,
    seller: <product seller id>,
    stock: <stock product>,
    message: 'Product registered successfully'
  }
  ```
- Error Handler:
  - Status: **400**
  ```
    {
      "message": "You are not authorized accessing this data"
    }
  ```

### Update product data
- Method: `PUT`
- Route: `/products/:articleId`
- Headers: `{ token: <token> }`
- Body:
  ```
  {
    name: <product name>,
    price: <product price>,
    seller: <product seller id>,
    stock: <stock product>
  }
  ```
- Output:
  - Status: **201**
  ```
  {
    name: <product name>,
    price: <product price>,
    seller: <product seller id>,
    stock: <stock product>,
    message: 'Product updated successfully'
  }
  ```
- Error Handler:
  - Status: **400**
  ```
    {
      "message": "You are not authorized accessing this data"
    }
  ```

### Update product data
- Method: `DELETE`
- Route: `/products/:articleId`
- Headers: `{ token: <token> }`
- Output:
  - Status: **200**
  ```
  {
    name: <product name>,
    price: <product price>,
    seller: <product seller id>,
    stock: <stock product>,
    message: 'Product deleted successfully'
  }
  ```
- Error Handler:
  - Status: **400**
  ```
    {
      "message": "You are not authorized accessing this data"
    }
  ```

## Cart
### Create new cart
- Method: `POST`
- Route: `/products/:articleId/cart`
- Headers: `{ token: <token> }`
- Output:
  - Status: **201**
  ```
  {
    name: <product name>,
    price: <product price>,
    seller: <product seller id>,
    stock: <stock product>,
    message: 'Product added to cart successfully'
  }
  ```
- Error Handler:
  - Status: **400**
  ```
    {
      "message": "You are not authorized accessing this data"
    }
  ```
### Delete cart
- Method: `Delete`
- Route: `/products/:articleId/cart`
- Headers: `{ token: <token> }`
- Output:
  - Status: **200**
  ```
  {
    name: <product name>,
    price: <product price>,
    seller: <product seller id>,
    stock: <stock product>,
    message: 'Product removed from cart successfully'
  }
  ```
- Error Handler:
  - Status: **400**
  ```
    {
      "message": "You are not authorized accessing this data"
    }
  ```
  - Status: **404**
  ```
    {
      "message": "Product not found in cart"
    }
  ```