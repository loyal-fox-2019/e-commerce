# e-commerce

### Web: http://ecommerce.kennys.my.id/

### API URL: 

  `http://35.240.193.48:3000/`

### Postman API documentation: https://documenter.getpostman.com/view/9976335/SWT8hf1m

  ---

## Routes

### Create Product

* **Route**

  `POST /product`

* **Req body**

    - `name`: `{ type: String, required: true }`
    - `description`: `{ type: String, required: true }`
    - `price`: `{ type: Number, required: true }`
    - `picture`: `{ file }`

* **Req headers**

  ```
  {
  	token: "..."
  }
  ```

* **Response**

  ```
  {
  	_id: "...",
  	name: "...",
  	description: "...",
  	price: "...",
  	picture: "..."
  }
  ```

  