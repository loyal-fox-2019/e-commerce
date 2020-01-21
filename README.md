# e-commerce

## Product

### Create
* Method:  `POST`
* URL:  `/products`
* body: `name=[string]*`,` stock=[number]*` ,`price=[number*`, `categories=[arrayOfCategoryId]`
* Output
    * 201: 
    ``` 
        product: {
            _id: '1',
            name: 'Kaos oblong',
            stock: '10',
            price: '20000',
            categories: ['idCategory'],
            seller: {
                _id: UserId
            },
            created_at: '',
            updated_at: ''
        }
    ```
    * 400:
    ```
        errors: [
            'Name is required'
        ]
    ```
    * 409
    ```
        errors: [
            'Name has been used'
        ]
    ```
### Get products
* Method:  `GET`
* URL:  `/products`
* Output
    * 200: 
    ``` 
        products: [{
            _id: '1',
            name: 'Kaos oblong',
            stock: '10',
            price: '20000',
            categories: [{
                _id: idCategory,
                name: 'Baju'
            }],
            seller: {
                _id: UserId
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
        products: {
            _id: '1',
            name: 'Kaos oblong',
            stock: '10',
            price: '20000',
            categories: [{
                _id: idCategory,
                name: 'Baju'
            }],
            seller: {
                _id: UserId
            },
            created_at: '',
            updated_at: ''
        }
    ```
    * 404:
    ```
        error: {
            message: 'id not found'
        }
 
    ```

### Update product
* Method:  `PUT`
* URL:  `/products/:_id`
* body: `name=[string]*`,` stock=[number]*` ,`price=[number]*`, `categories=[arrayOfCategoryId]`
* Output
    * 200: 
    ``` 
        products: {
            _id: '1',
            name: 'Kaos oblong',
            stock: '10',
            price: '20000',
            categories: [{
                _id: idCategory,
                name: 'Baju'
            }],
            seller: {
                _id: UserId
            },
            created_at: '',
            updated_at: ''
        }
    ```
    * 400:
    ```
        errors: [
            'Name is required'
        ]
    ```
    * 409
    ```
        errors: [
            'Name has been used'
        ]
    ```
    * 404:
    ```
        error: {
            message: 'id not found'
        }
 
    ```

### Delete product
* Method:  `DELETE`
* URL:  `/products/:_id`
* Output
    * 200: 
    ``` 
        product: {
            "n": 1,
            "ok": 1,
            "deletedCount": 1
        }
    ```

## Cart


## Customer
