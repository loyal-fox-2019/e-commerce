# E-Commerce | Okka_Linardi

#### AWS Deploy Link

```
http://h8commerce.lieprojects.com.s3-website-ap-southeast-1.amazonaws.com/
```



#### Before doing anything else

```
$ npm install
```



## Main Routes

|  Routes   |
| :-------: |
|  /users   |
| /products |
|  /carts   |



### User Routes

| Route  | Method | Body                                                         | Query | Result                                                       |
| ------ | ------ | ------------------------------------------------------------ | ----- | ------------------------------------------------------------ |
| /      | post   | name: user registration name<br />email: user registration email<br />password: user registration password<br />admin: (can only be registered at admin panel)<true / false><br /> |       | {<br />_id: userID<br />name: user's name<br />email:user's email<br />admin: user's admin status<br />} |
| /login | post   | email:  registered user email address<br />password:  registered user password |       | {<br />token<br />}                                          |
|        |        |                                                              |       |                                                              |



### Product Routes

 

| Routes      | Method | Body                                                         | Query | Result                                                       |
| ----------- | ------ | :----------------------------------------------------------- | :---- | ------------------------------------------------------------ |
| /           | get    |                                                              |       | [<br />{<br />productName<br />productImage<br />description<br />price<br />stock<br />}<br />] |
| /           | post   | productName: product name (String)<br />productImage: product thumbnail(String)<br />description: product description (String)<br />price: product price(number)<br />stock: product stock(number)<br />category: product category |       | {<br />productName<br />productImage<br />description<br />price<br />stock<br />category<br />} |
| /:productId | get    |                                                              |       | {<br />productName<br />productImage<br />description<br />price<br />stock<br />} |
| /:productId | delete |                                                              |       |                                                              |
| /:productId | put    | productName: product name (String)<br />description: product description (String)<br />price: product price(number)<br />stock: product stock(number) |       | {<br />productName<br />productImage<br />description<br />price<br />stock<br />} |
| /:productId | patch  | stock: product stock(number)                                 |       | add or subtract product stock                                |



### Cart Routes

| Route       | Method | Body                                                         | Query | Result                                                       |
| ----------- | ------ | ------------------------------------------------------------ | ----- | ------------------------------------------------------------ |
| /           | get    |                                                              |       | see cart based on userID                                     |
| /           | post   | [<br />{<br />productID: product id<br />total: total item<br />}<br />] |       | [<br />{<br />_id: cartID<br />userID: userId(based on logged user)<br />product: product id<br />}<br />] |
| /           | delete |                                                              |       | clear cart                                                   |
| /:productId | patch  |                                                              |       | decreases total item of a product                            |
| /:productId | delete |                                                              |       | removes an item from cart                                    |





## Middlewares

This app uses  {number of middlewares}  middlewares: **Authentication**, **Authorization**, **Google Cloud Services** and **ErrorHandler**



### Authentication

​		Decrypts token and makes sure user is logged in



### Authorization

​		Checks if logged user is admin or not



### Google Cloud Services

​		Uploads images to Google Storage



### ErrorHandler

​		Handles all errors on server

