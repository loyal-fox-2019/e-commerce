# e-commerce

#### This app was build by Express and Mongoose

#### All routes must initially be given _http://localhost:3000_

# List of User routes:

### User Register

*POST* _http://localhost:3000/user/register_ 

```javascript
method: 'post',
url: 'http://localhost:3000/user/register',
data: {
    email: 'rafael@mail.com',
    name: 'Rafael Alviano Dafito',
    password: 'b1625nfb'
}

response: {
    message: 'New user has been created',
    data: {
        _id: UserID,
        email: 'rafael@mail.com',
        name: 'Rafael Alviano Dafito',
        password: 'b1625nfb'
    }
}
```
### User Login

*POST* _http://localhost:3000/user/privateAuth_

```javascript
method: 'post',
url: 'http://localhost:3000/user/privateAuth',
data: {
    email: 'rafael@mail.com',
    paswsword: 'b1625nfb'
}

response: {
    token: userToken
}
```

# List of product routes: 

### Get All Products

*GET* _http://localhost:3000/product_

```javascript
method: 'get',
url: 'http://localhost:3000/product'

response: {
    message: 'OK',
    data: (array of product);
}
```

### Get One Product

*GET* _http://localhost:3000/product/:id_

```javascript
method: 'get',
url: 'http://localhost:3000/product/:id',

response: {
    message: 'OK',
    data: (object of product)
}
```

### Create Product

*POST* _http://localhost:3000/product_

```javascript
method: 'post',
url: 'http://localhost:3000/product',
data: {
    productImage: (object of file),
    brand: 'Forgiato',
    type: 'GTR',
    description: (product description),
    stock: 10,
    price: 120000000
},
headers: {
    token: (Your userToken)
}

response: {
    message: 'New product has been added',
    data: (object of new product)
}
```

### Update Product

*PUT* _http://localhost:3000/product/:id_

```javascript
method: 'put',
url: 'http://localhost:3000/product/:id',
data: {
    brand: 'Rays',
    type: 'TE37',
    stock: 100,
    price: 70000000
}
headers: {
    token: (Your userToken)
}

response: {
    message: 'Product has been updated',
    data: nModified: 1 (important key and value)
}
```
### Delete Product

*DELETE* _http://localhost:3000/product/:id_

```javascript 
method: 'delete',
url: 'http://localhost:3000/product/:id',
headers: {
    token: (Your userToken)
}

response: {
    message: 'Product has been deleted',
    data: deletedCount: 1 (important key and value)
}
```

#List Of Cart Routes: 

### Get All Cart Item 

*GET* _http://localhost:3000/cart_

```javascript 
method: 'get',
url: 'http://localhost:3000/cart',
headers: {
    token: (Your userToken)
}

response: {
    message: 'OK',
    data: (array of carts)
}
```
### Add To Cart

*POST* _http://localhost:3000/cart_

```javascript 
method: 'post',
url: 'http://localhost:3000/cart',
data: {
    productId: (the id of the product you choose),
    amount: 2,
},
headers: {
    token: (Your userToken)
}

response: {
    message: 'Product has been added to cart',
    data: (object of cart item)
}
```

### Remove from Cart

*DELETE* _http://localhost:3000/cart_

```javascript
method: 'delete',
url: 'http://localhost:3000/cart',
headers: {
    token: (Your userToken)
}

response: {
    message: 'Your item has been removed from cart',
    data: deletedCount: 1 (important key and value)
}
```

# List of portofolios route: 

### Get All Portofolio

*GET* _http://localhost:3000/portofolio_

```javascript 
method: 'get',
url: 'http://localhost:3000/portofolio',

response: {
    message: 'OK',
    data: (array of portofolios)
}
```

### Add New Portofolio

*POST* _http://localhost:3000/portofolio_

```javascript 
method: 'post',
url: 'http://localhost:3000/portofolio',
data: {
    image: (portofolio image),
    description: (description of portofolio)
}
headers: {
    token: (Your userToken)
}

response: {
    message: 'New portofolio has been added',
    data: (object of new portofolio)
}
```

# ErrorHandler:

*Status 400* _ValidationError_

```javascript 
{
    errors: array of errors
}
```

*Status 400* _BadRequest_

```javascript 
{
    errors: object of errors
}
```

*Status 400* _JsonWebTokenErro_

```javascript 
{
    errors: object of errors
}
```

*Status 404* _NotFound_

```javascript 
{
    errors: object of errors
}
```

*Status 403* _NotAuthorized_

```javascript 
{
    errors: object of errors
}
```
Make sure you have Node.js and npm installed in your computer, and then run these commands:

* $ npm install
* $ npm start
* $ npm run dev