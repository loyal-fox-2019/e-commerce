# e-commerce

# E-makcomerace API Documentation

Dokumentai RESTFUL API  E-makcomerace 

### environment variabeles

```PORT = 3000
PORT = 
JWT_SECRET = 
KEY_FILENAME = 
BUCKET_NAME = 
MONGO_URI = 
```

## USAGE

```text
javascript
npm install
npm run dev
```

## BASE URL

```
http://localhost:3000/
```

##  ACCESS

```````text
Access server port: 3000
Access client port: 1234
```````



## CUSTOMERS ROUTES

| Routing      | HTTP   | Header(s) | Body                                                         | Response                                               | Description           |
| ------------ | ------ | --------- | ------------------------------------------------------------ | ------------------------------------------------------ | --------------------- |
| /users       | POST   | none      | username : String (***required***), email : String (***required***), password : String (***required***), phone: Number (***required***) | Error: Internal server error Success: add new customer | Create new customers  |
| /users/login | POST   | none      | email : String (***required***), password : String (***required***) | Error: Internal server error Success: login customer   | normal customer login |
| /users/carts | DELETE | token     | itemId: String(***required***)                               | Error: Internal server error Success: delete carts     | delete carts          |
| /users/carts | PATCH  | token     | itemId: String(***required***), quantity : Number (***required***) | Error: Internal server error Success: update carts     | create new carts      |



## ITEMS ROUTE

| Routing    | HTTP   | Headers(s) | Body                                                         | Response                                                     | Description      |
| ---------- | ------ | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------- |
| /items     | GET    | token      | none                                                         | Error: Internal server error, Success: Show all items        | Show all items   |
| /items     | POST   | token      | name: String(***required***),  image: String(***required***), price: Number(***required***), stock: Number(***required***) | Error: Internal server error, Validation error, Success: create new items | create new items |
| /items/:id | PATCH  | token      | name: String(***required***),  image: String(***required***), price: Number(***required***), stock: Number(***required***) | Error: Internal server error, Success:                       | update items     |
| /items/:id | DELETE | token      | none                                                         | Error: Internal server error, Success:                       | delete items     |