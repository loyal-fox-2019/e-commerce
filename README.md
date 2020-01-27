# e-commerce


## usage app

### run in your computer
```
$ npm install
$ npm start
$ npm run dev    
```
access the API via `http://localhost:3000` or `http://35.240.135.220:3000`

## User

### Register/Create
* Method:  `POST`
* URL:  `/auth/register`
* body: ` email=[string]*` ,`password=[string]*`
* Output
    * 200: 
        ```
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTI0ODRlMzc4MjQ2ZTEzZDc4Y2M5ZTciLCJyb2xlIjoiQXV0aG9yIiwiaWF0IjoxNTc5NDUxNjE5fQ.pc4Njq1KuY6Cact2lGR23e-B2AxI728Y6mMdGbuFEMY"
        }
        ```
    * 400
        ```
        {
            "message": "User validation failed: email: email is required"
        }
        ```
    * 409
        ```
        {
            "message": "email: dzakki@email.com has been used. "
        }
        ```

### Login
* Method:  `POST`
* URL:  `/auth/login`
* body: `email=[string]*` ,`password=[string]*`
* Output
    * 200: 
        ```
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTI0ODRlMzc4MjQ2ZTEzZDc4Y2M5ZTciLCJyb2xlIjoiQXV0aG9yIiwiaWF0IjoxNTc5NDUxNjE5fQ.pc4Njq1KuY6Cact2lGR23e-B2AxI728Y6mMdGbuFEMY"
        }
        ```
    * 400
        ```
        {
            "message": "email/password incorrect"
        }
        ```    


## Product

### Create
* Method:  `POST`
* URL:  `/products`
* header: token
* body: `name=[string]*`,` stock=[number]*` ,`price=[number*]`, `image=[linkimage]`
* Output
    * 201: 
    ``` 
        {
            _id: '1',
            name: 'Kaos oblong',
            stock: '10',
            price: '20000',
            image: 'url....'
            seller: {
                _id: UserId,
                fullname: 'lorem lorem'
            },
            created_at: '...',
            updated_at: '...'
        }
    ```
    * 400:
    ```
        {
          message: 'Name is required'
        }
    ```
    * 409
    ```
      {
          message: 'Name has been used'
      }
    ```

### Get products
* Method:  `GET`
* URL:  `/products`
* Output
    * 200: 
    ``` 
        [{
            _id: '1',
            name: 'Kaos oblong',
            stock: '10',
            price: '20000',
            image: 'url....'
            seller: {
                _id: UserId,
                fullname: 'lorem lorem'
            },
            created_at: '',
            updated_at: ''
        }]
    ```

### Get product
* Method:  `GET`
* URL:  `/products/:_id`
* Output
    * 200: 
    ``` 
        {
            _id: '1',
            name: 'Kaos oblong',
            stock: '10',
            price: '20000',
            image: 'url....'
            seller: {
                _id: UserId,
                fullname: 'lorem lorem'
            },
            created_at: '',
            updated_at: ''
        }
    ```
    * 404:
    ```
        {
            message: 'id not found'
        }
 
    ```

### Update product
* Method:  `PUT`
* URL:  `/products/:_id`
* header: token
* body: `name=[string]*`,` stock=[number]*` ,`price=[number]*`, `categories=[arrayOfCategoryId]`
* Output
    * 200: 
    ``` 
        {
            _id: '1',
            name: 'Kaos oblong',
            stock: '10',
            price: '20000',
            image: 'url....'
            seller: {
                _id: UserId,
                fullname: 'lorem lorem'
            },
            created_at: '',
            updated_at: ''
        }
    ```
    * 400:
    ```
        {
            message: 'Name is required'
        }
    ```
    * 409
    ```
        {
            message: 'Name has been used'
        }
    ```
    * 404:
    ```
        {
            message: 'id not found'
        }
 
    ```

### Delete product
* Method:  `DELETE`
* header: token
* URL:  `/products/:_id`
* Output
    * 200: 
    ``` 
        {
            "n": 1,
            "ok": 1,
            "deletedCount": 1
        }
    ```

## Cart

### Create
* Method:  `POST`
* URL:  `/carts`
* header: token
* body: `product=[productId]*`,` amount=[number]*` 
* Output
    * 201: 
    ``` 
        {
            _id: "5e2dc65228888d16ed83a177"
            product: "5e2d1e819439fd35794e04fc"
            amount: 1
            totalPrice: 90000
            costumer: "5e2c09b88209761f92c71c41"
            created_at: "2020-01-26T17:03:14.756Z"
            updated_at: "2020-01-26T17:03:14.756Z"
        }
    ```
    * 409
    ```
        message: "This product has beed added"
    ```

### Get carts
* Method:  `GET`
* URL:  `/carts`
* header: token
* Output
    * 200: 
    ``` 
        [{
            _id: "5e2dc65228888d16ed83a177"
            product: "5e2d1e819439fd35794e04fc"
            amount: 1
            totalPrice: 90000
            costumer: "5e2c09b88209761f92c71c41"
            created_at: "2020-01-26T17:03:14.756Z"
            updated_at: "2020-01-26T17:03:14.756Z"
        }]
    ```

### Update amount product
* Method:  `PACTH`
* URL:  `/carts/amount/:idCart`
* header: token
* body: ` amount=[number]*` 
* Output
    * 200: 
    ``` 
        {
            _id: "5e2dc65228888d16ed83a177"
            product: "5e2d1e819439fd35794e04fc"
            amount: 1
            totalPrice: 90000
            costumer: "5e2c09b88209761f92c71c41"
            created_at: "2020-01-26T17:03:14.756Z"
            updated_at: "2020-01-26T17:03:14.756Z"
        }
    ```

    * 400: 
    ```
      message: 'Stock less than amount'
    ```

### delete cart 
* Method:  `DELETE`
* header: token
* URL:  `/carts/:_id`
* Output
    * 200: 
    ``` 
        {
            "n": 1,
            "ok": 1,
            "deletedCount": 1
        }
    ```

## IMPORTANT!

* Where i can get a token for header request? 
    you will get token after login/register
