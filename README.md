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
`description` | String | Required
`price` | Number | Required
`stock` | Number | Required
`sold` | Number | Required


## REST API routes

Documentation: https://documenter.getpostman.com/view/10143757/SWT8hza9?version=latest