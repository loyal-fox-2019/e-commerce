# e-commerce

# e-commerce

#### This app was build by Express and Mongoose

#### Currently run on _http://localhost:3000_

User routes:

Route | HTTP | Header(s) | Body | Description | Response |
------|------|-----------|------|-------------|----------|
_user/register_ | **POST** | none | name, email, password | Register new uer | (201) Success, (400) Validate error
_user/login_ | **POST** | none | email, password | Normal login with jwt | (200) Success, (404) Not Found, need register
_user/google_ | **POST"** | none | id_token | Login with google account | (200) Success, (500) Server Error
 
Items routes: 

Route | HTTP | Header(s) | Body | Description | Response |
------|------|-----------|------|-------------|----------|
_/item_ | **GET**| none | none | Get all item list | (200) Success, (404) no data
_/item/:id_ | **GET** | none | none | Get one specific item | (200) Success, (500) server error |
_/item/category/:category_  | **GET**  | none | none  | Get detail item by category | (200) OK, (500) server error
_/item_   | **POST** | usertoken, ADMIN ONLY | {name, description, price, stocks, category, image} | Add new item | (201) OK, (500) server error
_/item//:id_ | **PUT**| usertoken, ADMIN ONLY | {name, description, price, stocks, category, image} | Edit one specific item | (200) OK, (500) server error
_/item//:id_ | **DELETE**| usertoken, ADMIN ONLY | none | Delete one specific item | (200) OK, (500) server error

List of cart routes: 

Route | HTTP | Header(s) | Body | Description | Response |
------|------|-----------|------|-------------|----------|
_/cart_| *POST* | userToken | none | Add product to cart | (201) OK, (403) not authorize
_/cart_| *GET* | userToken | none | Get specific user's cart | (200) OK, (403) not authorize
_/cart/:id_| *DELETE* | userToken | none | Delete one specific user's cart | (200) OK, (403) not authorize
_/cart/transaction/:id_| *POST* | userToken | none | Complete single cart item and create transaction| (200) OK, (500) server error
_/cart/transaction_| *GET* | userToken, ADMIN ONLY | none | Get all transaction data | (200) OK, (403) not authorize


```
$ npm install
$ npm start
$ npm run dev
```