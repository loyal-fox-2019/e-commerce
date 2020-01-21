# API Documentation

## CRUD Users

### Register

**Endpoint**: `POST /users/register`

**Description**: user register

**Headers**: `none`

**Body**:

```json
{
  "email": string,
  "password": string
}
```

**Responses**:

201 Created

```json
{
  "message": "User has been successfully created!",
  "token": string
}
```

400 Bad Request

```json
{
  "message": "Email and password are required!"
}
```

403 Forbidden

```json
{
  "message": "Email is already registered!"
}
```

### Login

**Endpoint**: `POST /users/login`

**Description**: user login

**Headers**: `none`

**Body**:

```json
{
  "email": string,
  "password": string
}
```

**Responses**:

200

```json
{
  "message": "User has been successfully login!",
  "token": string
}
```

400 Bad Request

```json
{
  "message": "Email and password are required!"
}
```

403 Forbidden

```json
{
  "message": "Email or password is invalid!"
}
```

---

## CRUD Items

### Create Item

**Endpoint**: `POST /items`

**Description**: create a new item

**Headers**:

```json
{
  "token": string
}
```

**Body**:

```json
{
  "title": string,
  "description": string,
  "price": number,
  "stock": number
}
```

**Response**:

201

```json
{
  "message": "Item has successfuly been created!"
}
```

400

```json
{
  "message": "Title, description, price, and stock are required!"
}
```

500

```json
{
  "message": "Internal server error"
}
```

### Get All Items

**Endpoint**: `GET /items`

**Description**: get all items available

**Headers**: `none`

**Body**: `none`

**Responses**:

200

```json
{
  "message": "All items are successfully retrevied!",
  "data": [Object]
}
```

404

```json
{
  "message": "Collection is empty!"
}
```

500

```json
{
  "message": "Internal server error!"
}
```

### GET One Item

**Endpoint**: `GET /items/:itemId`

**Description**: get one item

**Headers**: `none`

**Body**: `none`

**Responses**:

200

```json
{
  "message": "Item is successfully retrevied!",
  "data": Object
}
```

404

```json
{
  "message": "Item is not found!!"
}
```

500

```json
{
  "message": "Internal server error!"
}
```

### Update Item

**Endpoint**: `PUT /items/:itemId`

**Description**: update an item

**Headers**:

```json
{
  "token": string
}
```

**Body**:

```json
{
  "title": string,
  "description": string,
  "price": number,
  "stock": number
}
```

**Responses**:

200

```json
{
  "message": "Item is successfully updated!"
}
```

404

```json
{
  "message": "Item is not found!!"
}
```

500

```json
{
  "message": "Internal server error!"
}
```

### Delete Item

**Endpoint**: `DELETE /items/:itemId`

**Description**: delete an item

**Headers**:

```json
{
  "token": string
}
```

**Body**: `none`

**Responses**:

200

```json
{
  "message": "Item is successfully removed!"
}
```

404

```json
{
  "message": "Item is not found!!"
}
```

500

```json
{
  "message": "Internal server error!"
}
```

---

## CRUD Carts

### Create a new cart

**Endpoint**: `POST /carts`

**Description**: create a new cart

**Headers**:

```json
{
  "token": string
}
```

**Body**:

```json
{
  "itemId": ObjectId,
  "totalItem": number,
  "totalPrice": number,
  "userId": ObjectId,
  "isCheckout": boolean
}
```

**Responses**:

201

```json
{
  "message": "Cart is successfully created!",
  "data": Object
}
```

400

```json
{
  "message": "ItemId and totalItem is required!"
}
```

500

```json
{
  "message": "Internal server error!"
}
```

### Get all carts

**Endpoints**: `GET /carts`

**Description**: get all carts

**Headers**:

```json
{
  "token": string
}
```

**Body**: `none`

**Responses**:

200

```json
{
  "message": "All cart are successfully created!",
  "data": [Object]
}
```

500

```json
{
  "message": "Internal server error!"
}
```

### Get one cart

**Endpoints**: `GET /carts/:cartId`

**Description**: get one carts

**Headers**:

```json
{
  "token": string
}
```

**Body**: `none`

**Responses**:

200

```json
{
  "message": "Cart is successfully retrieved!",
  "data": Object
}
```

404

```json
{
  "message": "Cart is not found!"
}
```

500

```json
{
  "message": "Internal server error!"
}
```

### Update cart

**Endpoints**: `PUT /carts/:cartId`

**Description**: update the cart

**Headers**:

```json
{
  "token": string
}
```

**Body**:

```json
{
  "itemId": ObjectId,
  "totalItem": number,
  "totalPrice": number,
  "userId": ObjectId,
  "isCheckout": boolean
}
```

**Responses**:

200

```json
{
  "message": "Cart is successfully updated!"
}
```

404

```json
{
  "message": "Cart is not found!"
}
```

500

```json
{
  "message": "Internal server error!"
}
```

### DELETE cart

**Endpoints**: `DELETE /carts/:cartId`

**Description**: delete cart

**Headers**:

```json
{
  "token": string
}
```

**Body**: `none`

**Responses**:

200

```json
{
  "message": "Cart is successfully deleted!"
}
```

404

```json
{
  "message": "Cart is not found!"
}
```

500

```json
{
  "message": "Internal server error!"
}
```

---

## CRUD Transactions

### Create a transaction

**Endpoint**: `POST /transactions`

**Description**: create a new transaction

**Headers**:

```json
{
  "token": string
}
```

**Body**:

```json
{
  "cartId": ObjectId,
  "userId": ObjectId
}
```

**Responses**:

201

```json
{
  "message": "Transaction is successfully created!",
  "data": Object
}
```

400

```json
{
  "message": "CartId and userId is required!"
}
```

500

```json
{
  "message": "Internal server error!"
}
```

### Get all transactions

**Endpoint**: `GET /transactions`

**Description**: get all transactions

**Headers**:

```json
{
  "token": string
}
```

**Body**: `none`

**Responses**:

200

```json
{
  "message": "All transactions are successfully retrieved!",
  "data": [Object]
}
```

404

```json
{
  "message": "Collection is empty!"
}
```

500

```json
{
  "message": "Internal server error!"
}
```

### Get one transaction

**Endpoint**: `GET /transactions/:transactionId`

**Description**: get one transaction

**Headers**:

```json
{
  "token": string
}
```

**Body**: `none`

**Reponses**:

200

```json
{
  "message": "Transaction is successfully retrieved!",
  "data": [Object]
}
```

404

```json
{
  "message": "Transaction is not found!"
}
```

500

```json
{
  "message": "Internal server error!"
}
```

### Update transaction

**Endpoint**: `PUT /transactions/:transactionId`

**Headers**:

```json
{
  "token": string
}
```

**Body**

```json
{
  "cardId": ObjectId,
  "userId": ObjectId
}
```

**Reponses**

200

```json
{
  "message": "Transaction is successfully updated!"
}
```

404

```json
{
  "message": "Transaction is not found!"
}
```

500

```json
{
  "message": "Internal server error!"
}
```

### Delete transaction

**Endpoint**: `DELETE /transactions/:transactionId`

**Headers**:

```json
{
  "token": string
}
```

**Body**: `none`

**Reponses**

200

```json
{
  "message": "Transaction is successfully deleted!"
}
```

404

```json
{
  "message": "Transaction is not found!"
}
```

500

```json
{
  "message": "Internal server error!"
}
```
