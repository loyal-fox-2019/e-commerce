# e-commerce

## Product

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

  