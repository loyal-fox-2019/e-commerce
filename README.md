# e-commerce

#### Getting Started

Welcome to E-commerce API Documentation, You can use the API to access Ecommerece API endpoints.

All API can be accessed from the `//localhost:3000`

To Use API Endpoints, the format is as follows:

`//localhost:3000/{resource}`



### USERS

------

##### POST `/users/register`

```json
url: '//localhost:3000/users/register',
body :{
	'full_name' : 'Angga Budiman',
	'email' : 'angga@mail.com',
	'password' : 'yourpowerfullpassword'
}

response:{
	'token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTFiY2Q1MWQ0N2I0NTBhNWQ1NmM2OGEiLCJ1c2VybmFtZSI6InVzZXJuYW1lMTAxIiwiaWF0IjoxNTc4ODgwNDg4fQ.I0E3TnxdECuYr2Ao-4pZ-R7LL_liFvvVVjtbQYge9SY'
}
```

##### POST `/users/login`

```json
url: '//localhost:3000/users/register',
body :{
	'email' : 'angga@mail.com',
	'password' : 'yourpowerfullpassword'
}

response:{
	'token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTFiY2Q1MWQ0N2I0NTBhNWQ1NmM2OGEiLCJ1c2VybmFtZSI6InVzZXJuYW1lMTAxIiwiaWF0IjoxNTc4ODgwNDg4fQ.I0E3TnxdECuYr2Ao-4pZ-R7LL_liFvvVVjtbQYge9SY'
}
```

##### PATCH `/users/{id}/address`

```json
url: '//localhost:3000/users/{id}/address',
body :{
	address:'Jakarta Street',
    city:'Jakarta',
    zipcode:'2021'
}

response:{
	'message' : 'Address Successfully Edited'
}
```

##### DELETE `/users/{id}`

```json
url: '//localhost:3000/users/{id}',

response:{
	'message' : 'Users Successfully Deleted'
}
```



### PRODUCTS

##### 