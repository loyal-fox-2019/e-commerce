# e-commerce

## Users
- ### Register :
    -  url : `/user/register`
    - method : `post`
    - body : 
        - email : `String`
        - password : `String`
        - phone : `String`
        - address : `String`
        - name : `String`
        - gender : `String`
        - age : `Integer`
    - returns : 
        - Status : `201`
        - jsonwebtoken
        ````
        ````
- ### Login :
    - url : `/user/login`
    - method : `post`
    - body : 
        - email : `String`
        - password : `String`
    - returns : 
        - Status : `200`
        - jsonwebtoken
        ````
        ````

- ### Delete Account :
    - url : `/user/delete`
    - method : `post`
    - headers : 
        - token : `jsonwebtoken`
    - body : 
        - email : `String`
        - password : `String`
    - returns : 
        - Status : `200`
        - confirmation message
        ````
        ````

## Products
- ### Headers :
    - token : `jsonwebtoken`
     required for all product endpoints
- ### Add Product :
    -  url : `/product/`
    - method : `post`
    - body : 
        - name : `String`
        - price : `Integer`
        - category : `String`
        - created_at : `String`
    - returns : 
        - Status : `201`
        - json of the added product
        ````
        ````
- ### Get All Products :
    -  url : `/product/`
    - method : `get`  
    - returns : 
        - Status : `200`
        - json of the products
        ````
        ````

- ### Edit Product :
    -  url : `/product/:id`
    - method : `put`
    - params : 
        - id : `product id`
    - body : 
        - name : `String`
        - price : `Integer`
        - category : `String`
        - created_at : `String`
    - returns : 
        - Status : `200`
        - json of success message
        ````
        ````
- ### Delete Product :
    -  url : `/product/:id`
    - method : `delete`
    - params : 
        - id : `product id`
    - returns : 
        - Status : `200`
        - json of success message
        ````
        ````