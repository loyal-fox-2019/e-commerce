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

### 2. Inventori/

> &nbsp;
>
> ### <b>access_token didapat setelah login atau register</b>
>
> ### Seluruh akses ke products menggunakan access_token
>
> ### Terdapat autentikasi disetiap routing products
>
> ```
> Error Autentikasi : {
>     msg: 'Anda belum login, silahkan login terlebih dahulu'
> }
> ```
>
> &nbsp;

1. <b>Jual</b>

Tambah list produk baru yg dijual

```
method: 'POST',
url: inventori/add,
headers: {
    token: access_token
},
body: {
    nama: String,
    kategori: String,
    harga: Number,
    stok: String,
    deskripsi: String,
    harga: Number
}

response: {
    success: {
        status: 200,
        data: {
                _id,
                nama,
                deskripsi,
                harga,
                stok,
                gambar,
                kategori,
                tanggal,
                seller,
                userId,
            }
    },
    fail : {
        status: 500,
        msg: 'Internal server error'
    }
```

2. <b>Lihat semua list produk dijual</b>

Dapatkan seluruh list produk yg dijual oleh semua user

```
method: 'GET',
url: inventori/,
headers: {
    token: access_token
}

response: {
    success: {
        status: 200,
        data: [
            {
                _id,
                nama,
                deskripsi,
                harga,
                stok,
                gambar,
                kategori,
                tanggal,
                seller,
                userId,
            }
        ]
    },
    fail : {
        status: 500,
        msg: 'Internal server error'
    }
}
```

3. <b>Lihat semua list produk dijual kecuali punya sendiri</b>

Dapatkan seluruh list produk yg dijual oleh semua user kecuali punyanya sendiri

```
method: 'GET',
url: inventori/own,
headers: {
    token: access_token
}

response: {
    success: {
        status: 200,
        data:  [
            {
                _id,
                nama,
                deskripsi,
                harga,
                stok,
                gambar,
                kategori,
                tanggal,
                seller,
                userId,
            }
        ]
    },
    fail : {
        status: 500,
        msg: 'Internal server error'
    }
}
```

4. <b>Lihat detail produk</b>

Mendapatkan satu target inventori berdasarkan nama penjual dan nama barang

```
method: 'GET',
url: inventori/:userId/:idBarang,
headers: {
    token: access_token
}

response: {
    success: {
        status: 200,
        data:  [
            {
                _id,
                nama,
                deskripsi,
                harga,
                stok,
                gambar,
                kategori,
                tanggal,
                seller,
                userId,
            }
        ]
    },
    fail : {
        status: 500,
        msg: 'Internal server error'
    }
}
```

5. <b>Update stok</b>

Update stok suatu produk

```
method: 'PUT',
url: inventori/update-stok/:id,
headers: {
    token: access_token
},
body: {
    jumlah: jumlah_baru
}

response: {
    success: {
        status: 200,
        data: {
            _id,
            nama,
            deskripsi,
            harga,
            stok,
            gambar,
            kategori,
            tanggal,
            seller,
            userId,
        }
    },
    fail : {
        status: 500,
        msg: 'Internal server error'
    }
}
```

6. <b>Update inventori</b>

Update produk didalam inventori

```
method: 'PUT',
url: inventori/update/:id,
headers: {
    token: access_token
},
body: {
    nama: String,
    kategori: String,
    harga: Number,
    stok: String,
    deskripsi: String,
    harga: Number
}

response: {
    success: {
        status: 200,
        data: {
            _id,
            nama,
            deskripsi,
            harga,
            stok,
            gambar,
            kategori,
            tanggal,
            seller,
            userId,
        }
    },
    fail : {
        status: 500,
        msg: 'Internal server error'
    }
}
```

7. <b>Delete inventori</b>

Menghapus prduk di inventori

```
method: 'DELETE',
url: inventori/delete/:id,
headers: {
    token: access_token
}

response: {
    success: {
        status: 200,
        data: {
            _id,
            nama,
            deskripsi,
            harga,
            stok,
            gambar,
            kategori,
            tanggal,
            seller,
            userId,
        }
    },
    fail : {
        status: 500,
        msg: 'Internal server error'
    }
}
```
