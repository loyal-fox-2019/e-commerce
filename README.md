# E-Commerce

## Fitur: 
  1. Registrasi dan login
  2. Jual produk
  3. Lihat list produk yang dijual
  4. Riwayat penjualan
  5. Beli produk
  6. Lihat list produk yg dijual oleh user lain
  7. Riwayat pembelian 

## Endpoints  
### 1. Users/

1. <b>Register</b>

User daftar akun baru

Ketentuan:
1. Username dan email harus unik, dalam artian berbeda satu dengan yg lain
2. Minimum password adalah 6 karakter

``` 
method : 'POST',
url : users/register
body :  { 
    username: String, 
    password: String, 
    email: String 
}

response : {
    success :{
        status : 201,
        msg: 'Registrasi berhasil',
        access_token: token
    },
    fail : {
        status: 400,
        msg: [
            'Username atau email sudah ada',
            'Password minimal 6 karakter'
        ]
    }
}
```

2. <b>Login</b>

Login user

```
method: 'POST',
url: users/login,
body: {
    username: String
        OR
    email: String,
    password: String
}

response : {
    success: {
        status: 200,
        msg: 'Login berhasil',
        access_token: token
    },
    fail: {
        status: 400,
        msg: 'Username atau password salah'
    }
}
```

### 2. Products/

> &nbsp;
> ### <b>access_token didapat setelah login atau register</b>
> ### Seluruh akses ke products menggunakan access_token
> ### Terdapat autentikasi disetiap routing products
> ```
> Error Autentikasi : {
>     msg: 'Anda belum login, silahkan login terlebih dahulu'
> }
> ```
> &nbsp;

1. <b>Jual</b>

Tambah list produk baru yg dijual

```
method: 'POST',
url: products/sell,
headers: {
    token: access_token
},
body: {
    nama: String,
    stok: String,
    kategori: String,
    harga: Number 
}
```

2. <b>Lihat list produk dijual</b>

Dapatkan seluruh list produk yg dijual oleh user

```
method: 'GET',
url: products/sell/list,
headers: {
    token: access_token
}

response: {
    success: {
        status: 200,
        data: {
            _id,
            nama,
            kategori,
            harga,
            userId,
            createdAt       
        }
    },
    fail : {
        status: 500,
        msg: 'Internal server error'
    }
}
```

3. <b></b>

Dapatkan seluruh list produk yg dijual oleh user

```
method: 'GET',
url: products/sell/list,
headers: {
    token: access_token
}

response: {
    success: {
        status: 200,
        data: {
            _id,
            nama,
            kategori,
            harga,
            userId,
            createdAt       
        }
    },
    fail : {
        status: 500,
        msg: 'Internal server error'
    }
}
```