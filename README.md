# e-commerce

# E-makcomerace API Documentation

Dokumentai RESTFUL API  E-makcomerace 

### environment variabeles

```PORT = 3000

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

| Routing                 | HTTP | Header(s) | Body                                                         | Response                                                  | Description           |
| ----------------------- | ---- | --------- | ------------------------------------------------------------ | --------------------------------------------------------- | --------------------- |
| /customers              | POST | none      | username : String (***required***), email : String (***required***), password : String (***required***), phone: Number (***required***) | Error: Internal server error Success: add new customer    | Create new customers  |
| /customers/login        | POST | none      | email : String (***required***), password : String (***required***) | Error: Internal server error Success: login customer      | normal customer login |
| /users/customers/google | POST | none      | email : String (***required***), password : String (***required***) | Error: Internal server error Success: login google member | google customer login |



## ITEMS ROUTE

| Routing    | HTTP   | Headers(s) | Body                                                         | Response                                                     | Description      |
| ---------- | ------ | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------- |
| /items     | GET    | token      | none                                                         | Error: Internal server error, Success: Show all items        | Show all items   |
| /items     | POST   | token      | name: String(***required***),  image: String(***required***), price: Number(***required***), stock: Number(***required***) | Error: Internal server error, Validation error, Success: create new items | create new items |
| /items/:id | PATCH  | token      | name: String(***required***),  image: String(***required***), price: Number(***required***), stock: Number(***required***) | Error: Internal server error, Success:                       | update items     |
| /items/:id | DELETE | token      | none                                                         | Error: Internal server error, Success:                       | delete items     |