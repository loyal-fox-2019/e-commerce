# e-commerce

#### Getting Started

Welcome to E-commerce API Documentation, You can use the API to access Ecommerece API endpoints.

All API can be accessed from the `//35.185.188.169:3000`

To Use API Endpoints, the format is as follows:

`//35.185.188.169:3000/{resource}`

### USERS

---

##### POST `/users/register`

```
url: '//35.185.188.169:3000/users/register',
method: 'POST',
body :{
	'full_name' : 'Angga Budiman',
	'email' : 'angga@mail.com',
	'password' : 'yourpowerfullpassword'
}

response:{
	'token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTFiY2Q1MWQ0N2I0NTBhNWQ1NmM2OGEiLCJ1c2VybmFtZSI6InVzZXJuYW1lMTAxIiwiaWF0IjoxNTc4ODgwNDg4fQ.I0E3TnxdECuYr2Ao-4pZ-R7LL_liFvvVVjtbQYge9SY'
}
```

##### POST `/users/login`

```
url: '//35.185.188.169:3000/users/register',
method: 'POST',
body :{
	'email' : 'angga@mail.com',
	'password' : 'yourpowerfullpassword'
}

response:{
	'token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTFiY2Q1MWQ0N2I0NTBhNWQ1NmM2OGEiLCJ1c2VybmFtZSI6InVzZXJuYW1lMTAxIiwiaWF0IjoxNTc4ODgwNDg4fQ.I0E3TnxdECuYr2Ao-4pZ-R7LL_liFvvVVjtbQYge9SY'
}
```

##### PATCH `/users/`

```
url: '//35.185.188.169:3000/users/{id}/address',
method: 'PATCH',
'headers':{
    'token':{token}
},
'body' :{
	'address':'Jakarta Street',
}

response:{
	'message' : 'Address Updated'
}
```

#####

### Admin Login

---

##### POST `/users/admin/`

```
url:'//35.185.188.169:3000/usres/admin'
method: 'POST',
body:{
	'email':'adminemail',
	'password':'adminpassword'
}

response:{
	'token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTFiY2Q1MWQ0N2I0NTBhNWQ1NmM2OGEiLCJ1c2VybmFtZSI6InVzZXJuYW1lMTAxIiwiaWF0IjoxNTc4ODgwNDg4fQ.I0E3TnxdECuYr2Ao-4pZ-R7LL_liFvvVVjtbQYge9SY'
}
```

### PRODUCT

---

##### GET `/products/`

```
url:'//35.185.188.169:3000/products/'
method: 'GET'

response:[
	{
        "_id": "5e2c7bd0cfbff872e7510678",
        "productName": "FUNKO Pop! Movies: Ready Player One - Shoto FU22054",
        "description": "Funko Pop! FU22054 merupakan action figure berbahan vinly yang terinspirasi dari Movies: Ready Player One. Action figure ini dirancang menyerupai tokoh karakter Shoto. Desainnya yang menarik dapat dimainkan oleh anak-anak atau dijadikan sebagai koleksi pajangan memukau di rumah Anda. ",
        "price": 155000,
        "stock": 37,
        "thumbnail": "https://storage.googleapis.com/miniwp-upload/1579973583245-nHBfsgAAGwAAAAIAGtWzKgAELNY.jpg",
        "__v": 0
    }
]
```

##### GET `/products/{id}`

```
url:'//35.185.188.169:3000/products/5e2c577ae8b36a2854ab18f3'
method: 'GET'

response: {
    "_id": "5e2c577ae8b36a2854ab18f3",
    "productName": "Huawei NOVA 5T (8/128GB) 48MP FIVE AI Cameras",
    "description": "Huawei Nova 5T\n\nEMUI 9.1.0 (compatible with Android 9)\n\nHUAWEI Kirin 980 CPU, Octa-core, 2 x Cortex A76 Based 2.6GHz + 2 x Cortex A76 Based 1.92GHz + 4 x Cortex A55 Based 1.8GHz",
    "price": 4999990,
    "stock": 120,
    "thumbnail": "https://storage.googleapis.com/miniwp-upload/1579964281126-amZzL3Q1Mi8yNjYvMTc3NjMwODk4Lzk3MzY5Lzk2N2JmZGYzLzVlMWQzN2ZjTjE4M2VkZTQx.jpg",
    "__v": 0
}
```

##### POST `/products/`

```
url:'//35.185.188.169:3000/products/'
method: 'POST',
headers:{
	token:'{token}' //Require Admin Role
}
body:{
	productName:'Nokia 8810',
	description:'Handphone dengan kekebalan yang sangat ampuh, upto 480 Hari',
	price:120000,
	stock:30,
	thumbnail:'https://cf.shopee.co.id/file/d1c1e4ced6796379a1861bf82b64960a'
}

response:{
    "_id": "5e2d6928c44c1232440a14b0",
    "productName": "Nokia 8810",
    "description": "Handphone dengan kekebalan yang sangat ampuh, upto 480 Hari",
    "price": 120000,
    "stock": 30,
    "thumbnail": "https://cf.shopee.co.id/file/d1c1e4ced6796379a1861bf82b64960a",
    "__v": 0
}

```

##### DELETE `/products/{id}`

```
url:'//35.185.188.169:3000/products/5e2d69c8c44c1232440a14b1'
method: 'DELETE',
headers:{
	token:'{token}' //Require Admin Role
}

response :{
    "message": "Successfully deleted Product"
}
```

##### PUT `/products/{id}`

```
url:'//35.185.188.169:3000/products/5e2d69c8c44c1232440a14b1'
method:'PUT'
headers:{
	token:'{token}' //Require Admin Role
}

response:{
    "message": "Product Detail Updated"
}
```

##### PATCH `/products/{id}/stock`

```
url:'//35.185.188.169:3000/products/5e2d69c8c44c1232440a14b1/stock'
method:'PATCH'
headers:{
	token:'{token}' //Require Admin Role
}

response:{
    "message": "Stock Porduct Udated"
}
```

### CART

---

##### GET `/cart/`

```
url:'//35.185.188.169:3000/cart/'
method:'GET'
headers:{
	token:'{token}'
}

response : [
    {
        "isCheckout": false,
        "_id": "5e2d6f07c44c1232440a14b2",
        "UserId": {
            "_id": "5e2d64a1c44c1232440a14af",
            "full_name": "Johan Fahri"
        },
        "ProductId": {
            "_id": "5e2c5358e8b36a2854ab18f2",
            "productName": "XIAOMI 70 Minutes Smart WiFi DVR Wireless car Dash Cam 130 Degree Mstar 8328P Sony IMX323 30fps",
            "price": 480900,
            "thumbnail": "https://storage.googleapis.com/miniwp-upload/1579963223223-nHBfsgAA7QAAABUALAfKCwACdwA.jpg"
        },
        "amount": 2,
        "__v": 0
    }
]
```

##### POST `/cart/`

```
url:'//35.185.188.169:3000/cart/'
method:'POST'
headers:{
	token:'{token}'
},
body:{
	amount:2,
	productId:'5e2c5358e8b36a2854ab18f2',
}

response:{
    "isCheckout": false,
    "_id": "5e2d6f07c44c1232440a14b2",
    "UserId": "5e2d64a1c44c1232440a14af",
    "ProductId": "5e2c5358e8b36a2854ab18f2",
    "amount": 2,
    "__v": 0
}
```

##### DELETE `/cart/{id}`

```
url:'//35.185.188.169:3000/cart/5e2d6f07c44c1232440a14b2'
method:'DELETE'
headers:{
	token:'{token}'
}

response:{
    "message": "Deleted from Cart"
}
```

##### DELETE `/cart/`

This WIll Delete All cart by user

```
url:'//35.185.188.169:3000/cart'
method:'DELETE'
headers:{
	token:'{token}'
}

response:{
    "message": "Deleted All"
}
```

##### PATCH `/cart/`

```
url:'//35.185.188.169:3000/cart/'
method:'PATCH'
headers:{
	token:'{token}'
}

response:{ message: "Update change to Checkout" }
```

### Error Handling

---

- Validation Login

  ```
  Status Code : 400

  response : {
  	message: "Email / Password Wrong"
  }
  ```

- Not Found

  ```
  Status Code : 404

  response:{
  	message:"Item Not Found"
  }
  ```

- Token Validation

  ```
  Status Code : 400

  response:{
  	message:"Invalid Token"
  }
  ```

- Unauthorized

  ```
  Status Code : 401

  response:{
  	message:"Authentication Required"
  }
  ```

- Validation Error

  ```
  Status Code : 400

  response:{
  	message:"Invalid Email Format"
  }
  ```

- Internal Server Error

  ```
  Status Code : 500

  response:{
  	message:"Internal Server Error"
  }
  ```
