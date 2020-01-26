# e-commerce

### Web: http://ecommerce.kennys.my.id/

### API URL: 

  `http://35.240.193.48:3000/`

### Postman API documentation: https://documenter.getpostman.com/view/9976335/SWT8hf1m

  ---

## Products Routes

### Create Product

* **POST /products**

  `http://35.240.193.48:3000/products`

* **Req headers**

  ```
  {
  	token: "..."
  }
  ```

* **Req body**

    - `name`: `{ type: String, required: true }`
    - `description`: `{ type: String, required: true }`
    - `price`: `{ type: Number, required: true }`
    - `picture`: `{ file }`
    - `stock`: `{ type: Number, required: true }`

* **Response**

  - `Status`: `201`
  ```
  {
    _id: "...",
    name: "...",
    description: "...",
    price: "...",
    picture: "...",
    stock: "...",
    userOwner: "...",
    created_at: "...",
    updatedAt: "..."
  }
  ```
  - `Status`: `401`
  ```
  {
    message: "Authentication fail"
  }
  ```
   - `Status`: `400`

  <details>

    ```
    {
      "errors": {
        "name": {
          "message": "name is required",
          "name": "ValidatorError",
          "properties": {
            "message": "name is required",
            "type": "required",
            "path": "name"
          },
          "kind": "required",
          "path": "name"
        },
        "description": {
          "message": "description is required",
          "name": "ValidatorError",
          "properties": {
            "message": "description is required",
            "type": "required",
            "path": "description"
          },
          "kind": "required",
          "path": "description"
        },
        "price": {
          "message": "price is required",
          "name": "ValidatorError",
          "properties": {
            "message": "price is required",
            "type": "required",
            "path": "price"
          },
          "kind": "required",
          "path": "price"
        },
        "stock": {
          "message": "stock is required",
          "name": "ValidatorError",
          "properties": {
            "message": "stock is required",
            "type": "required",
            "path": "stock"
          },
          "kind": "required",
          "path": "stock"
        }
      },
      "_message": "Product validation failed",
      "message": "Product validation failed: name: name is required, description: description is required, price: price is required, stock: stock is required",
      "name": "ValidationError"
    }
    ```

  </details>
  
### Get All Products

* **Get /products**

  `http://35.240.193.48:3000/products`

* **Response**

  - `Status`: `200`
  ```
  [
    {
      _id: "...",
      name: "...",
      description: "...",
      price: "...",
      picture: "...",
      stock: ...,
      userOwner: {
        profpic: "...",
        _id: "...",
        name: "...",
        email: "...",
        cart: []
      },
      created_at: "...",
      updatedAt: "..."
    }
  ]
  ```
### Get Logged In User's Products

* **Get /products/myProducts**

  `http://35.240.193.48:3000/products/myProducts`

* **Req headers**

  ```
  {
  	token: "..."
  }
  ```
* **Response**

  - `Status`: `200`
  ```
  [
    {
      _id: "...",
      name: "...",
      description: "...",
      price: "...",
      picture: "...",
      stock: ...,
      userOwner: {
        profpic: "...",
        _id: "...",
        name: "...",
        email: "...",
        cart: []
      },
      created_at: "...",
      updatedAt: "..."
    }
  ]
  ```
  - `Status`:`401`
  ```
  {
    message: "Authentication fail"
  }
  ```

### Update Product by Product ID

* **PATCH /products/:productId**

  `http://35.240.193.48:3000/products/:productId`

* **Req headers**

  ```
  {
  	token: "..."
  }
  ```
* **Req body**

  - `name`: `{ type: String, required: true }`
  - `description`: `{ type: String, required: true }`
  - `price`: `{ type: Number, required: true }`
  - `picture`: `{ file }`
  - `stock`: `{ type: Number, required: true }`


* **Response**

  - `Status`: `200`
  ```
  {
    _id: "...",
    name: "...",
    description: "...",
    price: "...",
    picture: "...",
    stock: "...",
    userOwner: "...",
    created_at: "...",
    updatedAt: "..."
  }
  ```
  - `Status`:`401`
  ```
  {
    message: "Authentication fail"
  }
  ```
  - `Status`:`403`
  ```
  {
    message: "Forbidden access"
  }
  ```
  - `Status`:`404`
  ```
  {
    "message": "Product not found"
  }
  ```

### Delete Product by Product ID

* **DELETE /products/:productId**

  `http://35.240.193.48:3000/products/:productId`

* **Req headers**

  ```
  {
  	token: "..."
  }
  ```

* **Response**

  - `Status`: `200`
  ```
  {
    _id: "...",
    name: "...",
    description: "...",
    price: "...",
    picture: "...",
    stock: "...",
    userOwner: "...",
    created_at: "...",
    updatedAt: "..."
  }
  ```
  - `Status`:`401`
  ```
  {
    message: "Authentication fail"
  }
  ```
  - `Status`:`403`
  ```
  {
    message: "Forbidden access"
  }
  ```
  - `Status`:`404`
  ```
  {
    "message": "Product not found"
  }
  ```

## Users Routes

### Register User

* **POST /users/register**

  `http://35.240.193.48:3000/users/register`

* **Req body**

  - `name`: `{ type: String, required: true }`
  - `email`: `{ type: String, required: true }`
  - `password`: `{ type: String, required: true , min_length: 6 }`

* **Response**

  - `Status`: `201`
  ```
  {
    token: "...",
    userId: "...",
    username: "...",
  }
  ```
  - `Status`:`400`
  ```
  {
    "errors": [
      "name is required",
      "Email is required",
      "Password is required"
    ]
  }
  ```
  - `Status`: `400` (password length, email not unique)
  ```
  {
    "errors": [
      "Minimum password length 6 character",
      "Email already registered"
    ]
  }
  ```
### Login User

* **POST /users/login**

  `http://35.240.193.48:3000/users/login`

* **Req body**

  - `email`: `{ type: String, required: true }`
  - `password`: `{ type: String, required: true , min_length: 6 }`

* **Response**

  - `Status`: `200`
  ```
  {
    token: "...",
    userId: "...",
    username: "...",
  }
  ```
  - `Status`:`400`
  ```
  {
    "message": "Wrong email/password"
  }
  ```

### Get User Data

* **GET /users**

  `http://35.240.193.48:3000/users`

* **Req headers**

  ```
  {
  	token: "..."
  }
  ```
* **Response**

  - `Status`: `200`
  <details>

  ```
  {
    profpic: "...",
    _id: "...",
    name: "...",
    email: "...",
    cart: [
      {
        _id: "...",
        item: {
          _id: "...",
          name: "...",
          description: "...",
          price: "...",
          picture: "...",
          stock: "...",
          userOwner: "...",
          created_at: "...",
          updatedAt: "...",
        },
        quantity: "..."
      }
    ]
  }
  ```

  </details>

  - `Status`:`401`
  ```
  {
    message: "Authentication fail"
  }
  ```

### Update User Profile Picture

* **PATCH /users/profpic**

  `http://35.240.193.48:3000/users/profpic`

* **Req headers**

  ```
  {
  	token: "..."
  }
  ```

* **Req body**

  - `profpic`: `{ file }`

* **Response**

  - `Status`: `200`
  <details>

    ```
    {
      profpic: "...",
      _id: "...",
      name: "...",
      email: "...",
      cart: [
        {
          _id: "...",
          item: {
            _id: "...",
            name: "...",
            description: "...",
            price: "...",
            picture: "...",
            stock: "...",
            userOwner: "...",
            created_at: "...",
            updatedAt: "...",
          },
          quantity: "..."
        }
      ]
    }
    ```

  </details>

  - `Status`:`401`
  ```
  {
    message: "Authentication fail"
  }
  ```

### Add To Cart

* **PATCH /users/addCart**

  `http://35.240.193.48:3000/users/addCart`

* **Req headers**

  ```
  {
  	token: "..."
  }
  ```

* **Req body**

  - `item`: `{ Product ID }`
  - `quantity`: `{ type: Number, required: true }`

* **Response**

  - `Status`: `200`
  ```
  {
    message: "Item added to cart successfully"
  }
  ```
  - `Status`: `400` (quantity < 1)
  ```
  {
    message: "Minimum purchase quantity is 1"
  }
  ```
  - `Status`: `400` (product stock not enough)
  ```
  {
    message: "Product stock not enough for your purchase quantity"
  }
  ```
  - `Status`:`401`
  ```
  {
    message: "Authentication fail"
  }
  ```
  - `Status`: `404`
  ```
  {
    message: "Product not found"
  }
  ```

### Edit Cart

* **PATCH /users/edit-cart**

  `http://35.240.193.48:3000/users/edit-cart`

* **Req headers**

  ```
  {
  	token: "..."
  }
  ```
* **Req body**
  
  ```
  {
    newQuantity: "...",
    cartData: {
      _id: "...",
      item: {...},
      quantity: "..."
    }
  }
  ```
* **Response**

  - `Status`: `200`
  ```
  {
    message: "Cart item quantity updated"
  }
  ```
  - `Status`: `400` (newQuantity < 1)
  ```
  {
    message: "Minimum purchase quantity is 1"
  }
  ```
  - `Status`: `400` (product stock not enough)
  ```
  {
    message: "Product stock not enough for your purchase quantity"
  }
  ```
  - `Status`:`401`
  ```
  {
    message: "Authentication fail"
  }
  ```
  - `Status`: `404`
  ```
  {
    message: "Product not found"
  }

### Remove Item from Cart

* **PATCH /users/remove-item**

  `http://35.240.193.48:3000/users/remove-item`

* **Req headers**

  ```
  {
  	token: "..."
  }
  ```

* **Req body**
  
  ```
  {
    cartData: {
      _id: "...",
      item: {...},
      quantity: "..."
    }
  }
  ```

* **Response**

  - `Status`: `200`
  ```
  {
    message: "[item.name] removed from cart"
  }
  ```
  - `Status`:`401`
  ```
  {
    message: "Authentication fail"
  }
  ```
### Checkout

* **PATCH /users/checkout**

  `http://35.240.193.48:3000/users/checkout`

* **Req headers**

  ```
  {
  	token: "..."
  }
  ```

* **Req body**

  ```
  {
    cart: [
      {
        _id: "...",
        item: {
            _id: "...",
            name: "...",
            description: "...",
            price: "...",
            picture: "...",
            stock: "...",
            userOwner: "...",
            created_at: "...",
            updatedAt: "..."
        },
        quantity: "..."
      }
    ]
  }
  ```

* **Response**

  - `Status`: `200`
  ```
  {
    message: "Checkout success"
  }
  ```
  - `Status`: `400`
  ```
  {
    message: "[item.name] stock is not enough"
  }
  ```
  - `Status`:`401`
  ```
  {
    message: "Authentication fail"
  }
  ```