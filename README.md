# ecommerce
E-commerce is a platform that allows user to buy and sell products

  - Built with Vue CLI
 - Built with rest API
 - Data storage is in mongo atlas utilizing mongoose
# Usage
Make sure to install all dependencies on both client and server side
> npm install

# Routes
| Route | HTTP | Request | Response | Description|
| ----------- | ----------- |----------- |----------- | ----------- |
| /user/google | POST |idToken|201(Created), 500(Internal Server Error)|Sign in with google|
| /user/register | POST |firstName, lastName, email, password|201(Created), 500(Internal Server Error)|Register to the website|
| user/login | POST |email, password|200(OK),500(Internal Server Error) |Log in to the Website
| /product| POST |Body: name, file, stock, price, description. Header: token |201(OK),500(Internal Server Error) |Post Product to sell (authenticated User)
| /product/all | GET |null|200(Created), 500(Internal Server Error)|Get All product
| product/myProduct| GET |null|200(OK),500(Internal Server Error) |See all of User's products (authenticated)
| product/:name| GET |null|200(OK),500(Internal Server Error) |Search product by name
| product/id/:id| GET |null|200(OK),500(Internal Server Error) |Get product by id
| product/:id| PUT |null|200(OK),401(Unauthorized),500(Internal Server Error) |Edit article by id (Authenticated and Authorized)
| product/:id| DELETE |null|200(OK),401(Unauthorized),500(Internal Server Error) |Delete article by id (Authenticated and Authorized)
| product/addToCart/:id| POST |null|201(OK),500(Internal Server Error) |Add to cart (authenticated)
| product/cart/myCart| Get |null|200(OK),500(Internal Server Error) |Get user's cart (authenticated)
| product/cart/myCart/delete/:id| DELETE |null|200(OK),401(Unauthorized),500(Internal Server Error) |Delete product by id from cart (Authenticated and Authorized)
| product/cart/myCart/checkOut| PATCH |null|200(OK),500(Internal Server Error) |Checkout (Authenticated)
| product/history/transaction| GET |null|200(OK),500(Internal Server Error) |Get  user's checkout history (Authenticated)


## Environment
The following variable are the needed environment to be set before running the program
> JWT_SECRET=
keyFilename=
bucketName=
CLIENT_ID=
MONGO_URL_DEV=
DEFAULT_PASSWORD=



