# e-commerce

**User: Register**
----
  Register new user to app.

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

   name: [String],
   email: [String],
   password: [String]

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** <br />```{
        "_id": "5e243323b1155a4fa129cb8c",
        "name": "Peter",
        "email": "peter@gmail.com"
    }```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** <br />`{
        "error": [
            "Please fill a valid email address"
        ]
    }`
    
    **Content:** <br />`{
        "error": [
            "Email already exist"
        ]
    }`

**User: Login**
----
  Login user to app.

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

   email: [String],
   password: [String]

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** <br />`{
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjQzMzIzYjExNTVhNGZhMTI5Y2I4YyIsImlhdCI6MTU3OTQzMTUxMn0.KF1JfoIdvLoy4RACrKpnLs8PgUWeLN8xowAALyPP8wA",
        "name": "Peter"
    }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** <br />`{
        "error": "Incorrect email/password"
    }`

**Product: Create**
----
  Add new product to app.

* **URL**

  /product

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

   name: [String],
   brand: [String],
   category: [String],
   description: [String],
   price: [Number],
   sale_price: [Number],
   stock: [Number],
   picture: [String]

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** <br />```{
    "product": {
        "created_At": "2020-01-14T07:35:16.671Z",
        "_id": "5e1d6fd677689e1e3736dbe8",
        "name": "Mouse Wire",
        "brand": "Logitech",
        "category": "Computer",
        "description": "Mouse wire with 2 button and 1 scroll button.",
        "price": 35000,
        "sale_price": 50000,
        "stock": 100,
        "picture": ""
    }
    }```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{
}`

**Product: Find**
----
  Find all products.

* **URL**

  /product

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />`{
        [
            {
                "created_At": "2020-01-14T07:35:16.671Z",
                "_id": "5e1d6fd677689e1e3736dbe8",
                "name": "Mouse Wire",
                "brand": "Logitech",
                "category": "Computer",
                "description": "Mouse wire with 2 button and 1 scroll button.",
                "price": 35000,
                "sale_price": 50000,
                "stock": 100
            },
            {
                "created_At": "2020-01-14T07:35:16.671Z",
                "_id": "6e3d6fd677689e1e3333dbe9",
                "name": "Keyboard Wire",
                "brand": "Logitech",
                "category": "Computer",
                "description": "Keyboard wire with backlight.",
                "price": 45000,
                "sale_price": 60000,
                "stock": 150
            }
        ]
    }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{
}`

**Product: FindOne**
----
  Find one product.

* **URL**

  /product/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   id: [String]

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />`{
        "created_At": "2020-01-14T07:35:16.671Z",
        "_id": "6e3d6fd677689e1e3333dbe9",
        "name": "Keyboard Wire",
        "brand": "Logitech",
        "category": "Computer",
        "description": "Keyboard wire with backlight.",
        "price": 45000,
        "sale_price": 60000,
        "stock": 150
    }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{
}`

**Product: Update**
----
  Update one product.

* **URL**

  /product/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   id: [String]

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />`{ Successfully update 1 record data:
    {
        "created_At": "2020-01-14T07:35:16.671Z",
        "_id": "6e3d6fd677689e1e3333dbe9",
        "name": "Keyboard Wire",
        "brand": "Logitech",
        "category": "Computer",
        "description": "Keyboard wire with backlight.",
        "price": 45000,
        "sale_price": 60000,
        "stock": 150
    }
    }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{
}`

**Product: Delete**
----
  Delete one product.

* **URL**

  /product/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   id: [String]

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />`{ Successfully delete 1 record data.
    }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{
}`

**Cart: Create**
----
  Add new item to cart.

* **URL**

  /cart

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

   ProductId: [String],
   UserId: [String],
   date_cart: [Date],
   quantity: [Number],
   sale_price: [Number],
   discount: [Number],
   sub_total: [Number],

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** <br />`{
    "cart": {
        "created_At": "2020-01-14T07:35:16.671Z",
        "ProductId": "5e1d6fd677689e1e3736dbe8",
        "UserId": "7e1d6fd677689e1e3736dbe9",
        "date_cart": 2020/01/11,
        "quantity": 1,
        "sale_price": 50000,
        "discount": 5000,
        "sub_total": 45000,
    }
    }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{
}`

**Cart: Delete**
----
  Delete item in cart.

* **URL**

  /cart/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   id: [String]

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />`{ Successfully delete 1 record data.
    }`
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** `{
}`

