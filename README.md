# User

## Register Customer

Melakukan register customer

**URL** : `/users/register`

**Method** : `POST`

**Auth Required** : NO

**Success Status Code** : 201

## Register Admin

Melakukan register admin pada app e-commerce ini

**URL** : `/users/register`

**Method** : `POST`

**Auth Required** : NO

**Success Status Code** : 201

## Login

Melakukan login

**URL** : `/users/login`

**Method** : `POST`

**Auth Required** : NO

**Request Body**

```json
{
  "email": "harrypotter@hogwarts",
  "password": "password"
}
```

**Success Status Code** : 200

## Logout

Untuk logout

**URL** : `/users/logout`

**Method** : `POST`

**Auth Required** : YES

**Success Status Code** : 200

## Get Profile

Untuk mendapatkan informasi login user dengan menggunakan token yang di simpan
pada browser

**URL** : `/users/profile`

**Method** : `GET`

**Auth Required** : YES

**Success Status Code** : 200

# Products

## Get Products

Mendapat list barang yang di jual

**URL** : `/products`

**Method** : `GET`

**Auth Required** : NO

**Success Status Code** : 200

## Post Product

Menambahkan produk kedalam database

**URL** : `/products`

**Method** : `POST`

**Auth Required** : YES (Admin Only)

**Success Status Code** : 201

## Edit Product

Mengedit produk kedalam database

**URL** : `/products/:productId`

**Method** : `PATCH`

**Auth Required** : YES (Admin Only)

## DELETE Product

Menambahkan produk kedalam database

**URL** : `/products/:productId`

**Method** : `DELETE`

**Auth Required** : YES (Admin Only)

**Success Status Code** : 200

# Transaction

## Get All Transactions

Mendapat semua list transaksi user

**URL** : `/transactions`

**Method** : `GET`

**Auth Required** : YES(Admin Only)

**Success Status Code** : 200

## Post Transactions

Menambahkan transaksi kedalam database

**URL** : `/transactions/:productId`

**Method** : `POST`

**Auth Required** : YES (Admin Only)

**Success Status Code** : 201

## Edit `Transaction`

Mengedit transaksi kedalam database

**URL** : `/transactions/:transactionId`

**Method** : `PATCH`

**Auth Required** : YES (Admin Only)

## DELETE Transaction

Menghapus transaksi

**URL** : `/transactions/:transactionId`

**Method** : `DELETE`

**Auth Required** : YES

**Success Status Code** : 200

## Get User Transaction

Mendapatkan seluruh transaksi user

**URL** : `/transactions/user`

**Method** : `GET`

**Auth Required** : YES

**Success Status Code** : 200

## Checkout item (patch transaction status)

Checkout item ubah status transaksi

**URL** : `/transactions/checkout/:transactionId`

**Method** : `GET`

**Auth Required** : YES

**Success Status Code** : 200

#ERROR

## Error

**CODE RESPONSE**

403 => diakibatkan oleh email/password salah, token tidak valid yang membuat
aplikasi logout.

401 => request tidak memiliki authorisasi

400 => Bad Request, kesalahan dari client

500 => Error berasal dari internal server
