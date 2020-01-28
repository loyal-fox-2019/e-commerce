# e-commerce

##  List API

### Register User
send json data  

* #### URL
/register

* #### Method:
`POST`

* #### URL Params
None

* #### Data Params

    * Required:
        * `id= [Integer]`
        * `name= [String]`
        * `email= [String]`
        * `password= [String]`

* #### Success Response: 
Code: 201
Content: { message: "create success" }

* #### Error Response:
	* __Code__:  400 BAD REQUEST 
	__Content__ : `{ message: ValidationError } //ex { message: email is required }`
	OR
	* __Code__: 500 INTERNAL SERVER ERROR
	__Content__: `{ message: err.message }`

* #### Sample Call:
```vue
register(){
	axios.post('http://localhost:3000/register', {
		name: this.name,
		email: this.email,
		password: this.password
	})
	.then(response => {
		this.response = 'response'
	})
	.catsh(err => {
		this.response = 'Error: ' + err.response.status
	})
}
```

### Login User
send json data  

* #### URL
/login

* #### Method:
`POST`

* #### URL Params
None

* #### Data Params

    * Required:
        * `email= [String]`
        * `password= [String]`

* #### Success Response: 
Code: 201
Content: { token }

* #### Error Response:
	* __Code__:  400 BAD REQUEST 
	__Content __ : `{ message: "Please provide a valid username and password."}` 
	OR
	* __Code__: 500 INTERNAL SERVER ERROR
	__Content__: `{ message: err.message }`

* #### Sample Call:
```vue
register(){
	axios.post('http://localhost:3000/login', {
		email: this.email,
		password: this.password
	})
	.then(response => {
		this.$cookie.set("token", response.data)
	})
	.catsh(err => {
		this.response = `'Error: ' + err.response.status`
	})
}
```

### Read All Product
Return json data about list all product

* #### URL
/

* #### Method:
`GET`

* #### URL Params
None

* #### Data Params

None`

* #### Success Response: 
    * __Code__:  200
    __Content__:
``` 
    [
        { 
            name: t-shirt,
            picture: url://picture,
            price: 120000,
            quantity: 5
        },
        { 
            name: TV 20inch,
            picture: url://picture,
            price: 2200000,
            quantity: 2
        },
    ]
```

* #### Error Response:
	* __Code:__ 404 NOT  FOUND
	__Content:__  { error: "Product doesn't exist" }

* #### Sample Call:
```vue
	axios.get('http://localhos:3000/')
	.then(response => {
		this.response = response
	})
	.catch(err => {
		this.response = 'Error: ' + err.response.status
	})
```

### Create Product
Return json data about list all product

* #### URL
/product/create

* #### Method:
`POST`

* #### URL Params
None

* #### Data Params
	* Required: 
		* name= [String]
		* quantity= [Number]
		* price= [Number] 

* #### Success Response: 
    * __Code__:  200
    __Content__: `{ message: 'create product success' }`
    
* #### Error Response:
	* __Code__:  401
	__Content__: 
	OR
	* __Code__: 500 INTERNAL SERVER ERROR
	__Content__: `{ message: err.message }`

* #### Sample Call:
```vue

```
### Update Product
Return json data about list all product

* #### URL
/

* #### Method:
`GET`

* #### URL Params
None

* #### Data Params

None`

* #### Success Response: 
    * __Code__:  200
    __Content__:
    
* #### Error Response:
	* __Code__: asdad    
	__Content__: 
	OR
	* __Code__:   
	__Content__: 

* #### Sample Call:
```vue

```

### Delete Product
Return json data about list all product

* #### URL
/

* #### Method:
`GET`

* #### URL Params
None

* #### Data Params

None`

* #### Success Response: 
    * __Code__:  200
    __Content__:
    
* #### Error Response:
	* __Code__: asdad    
	__Content__: 
	OR
	* __Code__:   
	__Content__: 

* #### Sample Call:
```vue

```


### Create Cart
Return json data about list all product

* #### URL
/

* #### Method:
`GET`

* #### URL Params
None

* #### Data Params

None`

* #### Success Response: 
    * __Code__:  200
    __Content__:
    
* #### Error Response:
	* __Code__: asdad    
	__Content__: 
	OR
	* __Code__:   
	__Content__: 

* #### Sample Call:
```vue

```