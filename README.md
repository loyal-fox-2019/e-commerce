# E-commerce

## Models
### Users
Attribute | Data type | Info
--- | --- | ---
`username` | String | Unique, Required<br>If standard login, `username` is alphanumeric and may contain underscore. If google login, `username` is user's Gmail
`password` | String | Required<br>Hashed password
`login_type` | String | Either `standard` or `google`
`cart` | [MongoDB ObjectId] | Array of `_id`s of `product`s


### Products
Attribute | Data type | Info
--- | --- | ---
`name` | String | Required
`price` | Number | Required


## REST API routes

### Users routes
* `POST /users/login`<br>
Body:

* `POST /users/gsignin`<br>
Body:

* `POST /users/register`<br>
Body:

* `PUT /users/:id`<br>
`PATCH /users/:id`

* `GET /users/cart`

* `POST /users/cart`

* `DELETE /users/cart/:id`

* `DELETE /users/:id`

### Products routes

* `GET /products`

* `GET /products/:id`

* `POST /products`

* `PUT /products/:id`<br>
`PATCH /products/:id`

* `DELETE /products/:id`
