# e-commerce

# User
## register customer

Melakukan register customer

**URL** : `/users/register`

**Mehod** : `post`

**Auth Required** : `NO`

**Request Body** : 
```json
{
  "name": "John Doe",
  "email": "john.doe@mail.com",
  "password": "se7enSins"
}
```

**Success Status Code** : `201`

**Success Response** :
```json
{
  "token": "",
  "name": "John Doe",
  "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfFExj43vNWFXXhr4_S6vYSGqFzjC77uObABaR7mk1biI9Y4eK"
}
```

## Login

Melakukan login

**URL** : `/users/login`

**Method** : `POST`

**Auth Required** : NO

**Request Body**
```json
{
  "email": "midori.green@ua.sch",
  "password": "PlusUltra",
}
```

**Success Status Code** : `200`

**Success Response**
```json
{
  "token": "",
  "name": "Green Naruto",
  "imgSrc": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfFExj43vNWFXXhr4_S6vYSGqFzjC77uObABaR7mk1biI9Y4eK"
}
```

## Logout

Untuk logout

**URL** : `/users/logout`

**Method** : `POST`

**Auth Required** : YES

**Success Status Code** : `200`

**Request Body**

**Success Response**
```json
{
  "message": "Successfully logout",
  "accountType": "default"
}
```

## Get Profile

Mendapatkan informasi user yang sedang login menggunakan token yang tersimpan pada browser

**URL** : `/users/profile`

**Method** : `GET`

**Auth Required** : YES

**Success Status Code** : 200

**Success Response**
```json
{
  "name": "Sulthon Abdul Malik",
  "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfFExj43vNWFXXhr4_S6vYSGqFzjC77uObABaR7mk1biI9Y4eK",
}
```

