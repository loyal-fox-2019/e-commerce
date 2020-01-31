# e-commerce

http://ecommerce.alvinatjia.com/

---

**Create a User**

- **URL**
  <_/users/register_>

- **Method:**
  `POST`

- **URL Params** <br />
  `None`

- **Data Params**
  **Required:**

  `name=[string]` <br />
  `email=[string]` <br />
  `password=[string]`
  
- **Sample Request:**
```javascript
    axios({
        "method": "POST",
        "url": "http://35.198.208.136/users/register",
        "data": {
            "name": "Alvina",
            "email": "vina@mail.com",
            "password": "PASSWORD"
        }
    })
```

- **Success Response:**
  - **Code:** 201 <br />
    **Content:**
    ```javascript
        {
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzM5OGQxMDJkM2ZkMmYwOTM1YzQyYSIsImlhdCI6MTU4MDQzOTc2MSwiZXhwIjoxNTgwNDQzMzYxfQ.H0GxCdrsGNcbGsrTixUzgyvWaMyPHiyp3JWS2I11lcs",
            "name": "Alvina",
            "image": "https://ui-avatars.com/api/?name=Alvina&size=512"
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "This email vina@mail.com has already been used!" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Log In**

- **URL**
  <_/users/signin_>

- **Method:**
  `POST`

- **URL Params** <br />
  `None`

- **Data Params**
  **Required:**

  `email=[string]` <br />
  `password=[string]`

- **Sample Request:**

  ```javascript
      axios({
          "method": "POST",
          "url": "http://35.198.208.136/users/login",
          "data": {
              "email": "vina@mail.com",
              "password": "PASSWORD"
          }
      })
  ```

- **Success Response:**
  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzM5OGQxMDJkM2ZkMmYwOTM1YzQyYSIsImlhdCI6MTU4MDQzOTg1NiwiZXhwIjoxNTgwNDQzNDU2fQ.V1Nq1KB8ZZC421BNwG16DkF4xzpmD377Vw0yxdwdP8g",
        "name": "Alvina",
        "image": "https://ui-avatars.com/api/?name=Alvina&size=512",
        "id": "5e3398d102d3fd2f0935c42a"
    }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Incorrect email/password" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Find user's profile**

- **URL**
  <_/users/{id}_>

- **Method:**
  `GET`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **URL Params** <br />
  `id=[string]`

- **Sample Request:**
  ```javascript
      axios({
          "method": "GET",
          "url": "http://35.198.208.136/users/5e3398d102d3fd2f0935c42a",
          "headers": {
              "access_token": "YOUR_ACCESS_TOKEN"
          }
      })
  ```

- **Success Response:**
  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "_id": "5e3398d102d3fd2f0935c42a",
        "name": "Alvina",
        "email": "vina@mail.com",
        "password": "$2a$08$pX4/RJ.UN5ZicCUsmsVOdehEYp7ktxGlUXcHVYzbVhdQFLoAyPBk6",
        "createdAt": "2020-01-31T03:02:41.751Z",
        "updatedAt": "2020-01-31T03:02:41.751Z",
        "image": "https://ui-avatars.com/api/?name=Alvina&size=512"
    }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "User not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Get all products in database**

- **URL**
  <_/products_>

- **Method:**
  `GET`

- **URL Params** <br />
  `None`

- **Request Headers** <br />
  `None`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://35.198.208.136/products",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        {
            "_id": "5e281871bf0e1863669c4452",
            "name": "Baby Shoes",
            "price": 299000,
            "stock": 89,
            "description": "Free shipping for all\n\nJust add the products in your shopping card and confirm your order\nYour child will be grateful after they put on these soft sole Ebooba yellow (tan) shoes. They are made solely for the comfort and warmth of your baby’s feet.\n\nLook at our ather modes made of perforated leather (many small holes): https://www.etsy.com/listing/279987606/\n\nSize chart: https://www.etsy.com/shop/ebooba/policy\n\n0-6 months insole length 4.5 inches (11.5 CM)\n6-12 months 5.1 inches (13.0 CM)\n12-18 months 5.5 inches (14.0 CM)\n18-24 months 5.9 inches (15.0 CM)\n2-3 years 6.25 inches (16.0 CM)\n3-4 years 6.9 inches (16.5 CM)",
            "weight": 500,
            "category": "Fashion",
            "brand": "Ebooba",
            "seller": {
                "_id": "5e279603a7d84c2afc5e5482",
                "name": "Jane Doe",
                "email": "jane@mail.com",
                "image": "https://storage.googleapis.com/ecommerce-vn/1579683727889Sound_of_Music_-_Maria_on_the_hill.jpg"
            },
            "image": "https://storage.googleapis.com/ecommerce-vn/1579685998118il_1588xN.911758559_97qw.jpg",
            "createdAt": "2020-01-22T09:40:01.512Z",
            "updatedAt": "2020-01-27T04:20:42.589Z"
        },
        {
            "_id": "5e281945bf0e1863669c4453",
            "name": "Baby Teething Rings",
            "price": 147000,
            "stock": 8911111108,
            "description": "Our teething rings are the perfect way to entertain baby while they navigate through the teething stage. The soft, brightly colored, silicone beads help to ease little one’s sore gums as they chew. The teething ring is easy for baby to grasp and when shaken the wooden pieces make a gentle rattling sound. Each teething ring features one natural wood, animal shaped, teether, one natural wood ring, and a variety of wooden and FDA approved, food grade, 100% silicone beads. Teething rings can include up to 10 silicone letter beads. Each teething ring is individually hand crafted to ensure the highest possible quality. Prior to packaging, teething rings are inspected and given a hard \"pull\" test",
            "weight": 300,
            "category": "Toys",
            "brand": "BabyWhatKnots",
            "seller": {
                "_id": "5e279603a7d84c2afc5e5482",
                "name": "Jane Doe",
                "email": "jane@mail.com",
                "image": "https://storage.googleapis.com/ecommerce-vn/1579683727889Sound_of_Music_-_Maria_on_the_hill.jpg"
            },
            "image": "https://storage.googleapis.com/ecommerce-vn/1579686211219toys.jpg",
            "createdAt": "2020-01-22T09:43:33.240Z",
            "updatedAt": "2020-01-27T04:00:42.645Z"
        },
        {
            "_id": "5e281a1698307767e7c2b8f6",
            "name": "Baby Soft Book",
            "price": 199000,
            "stock": 3,
            "description": "This baby quiet book - sensory busy book for children a must have for first age. The format is suitable for its little hands. Such a variety of tapes on the pages to attract baby's inquisitive mind and help him to coordinate the movements of the hands to examine them. The toy can easily be attached to a stroller, a crib or a highchair for feeding.\nToy contains 10 pages (Size: 15 x 15 cm (6 x 6 inches)), with primary colours in harmony of different materials and with activities :\n1. Chicken with opening wing and egg on Velcro\n2. Page with colored windows, where the characters are hiding\n3. Airplane with a screw that baby can twist your finger, the cabin hides a character\n4. Page with different textures, zipper and Velcro, the sun emits a squeak\n5. Apple in which the caterpillar lives\n6. Flower with rainbow colors petals, inside the flower is a safe mirror\n7. Car with wheels on velcro\n8. Page with different types of fasteners, zipper, magnetic button, button, velcro\n9. Cat for playing in a peek-a-boo\n10. Spider with paws on an elastic band",
            "weight": 1000,
            "category": "Books",
            "brand": "BabyWhatKnots",
            "seller": {
                "_id": "5e279603a7d84c2afc5e5482",
                "name": "Jane Doe",
                "email": "jane@mail.com",
                "image": "https://storage.googleapis.com/ecommerce-vn/1579683727889Sound_of_Music_-_Maria_on_the_hill.jpg"
            },
            "image": "https://storage.googleapis.com/ecommerce-vn/1579686419967il_1588xN.2083321711_9gbm.jpg",
            "createdAt": "2020-01-22T09:47:02.341Z",
            "updatedAt": "2020-01-27T06:27:44.248Z"
        },
        {
            "_id": "5e2e659a762c3933b77160d4",
            "name": "adasdasdasdasdasd",
            "price": 199000,
            "stock": 15,
            "description": "wqretryturyrre",
            "weight": 1000,
            "category": "2435e5yet43421",
            "brand": "234tryfre12`234rt",
            "seller": {
                "_id": "5e2e64ea6eb12a32f231db64",
                "name": "vivi",
                "email": "vivi@mail.com",
                "image": "https://ui-avatars.com/api/?name=vivi&size=512"
            },
            "image": "https://storage.googleapis.com/ecommerce-vn/1580099779421il_1588xN.2083321711_9gbm.jpg",
            "createdAt": "2020-01-27T04:22:50.294Z",
            "updatedAt": "2020-01-27T04:36:22.751Z"
        }
    ]
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

---

**Search products**

- **URL**
  <_/products/search/{keyword}_>

- **Method:**
  `GET`

- **URL Params** <br />
  `keyword=[string]`

- **Request Headers** <br />
  `None`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://35.198.208.136/products/search/shoe",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        {
            "_id": "5e281871bf0e1863669c4452",
            "name": "Baby Shoes",
            "price": 299000,
            "stock": 89,
            "description": "Free shipping for all\n\nJust add the products in your shopping card and confirm your order\nYour child will be grateful after they put on these soft sole Ebooba yellow (tan) shoes. They are made solely for the comfort and warmth of your baby’s feet.\n\nLook at our ather modes made of perforated leather (many small holes): https://www.etsy.com/listing/279987606/\n\nSize chart: https://www.etsy.com/shop/ebooba/policy\n\n0-6 months insole length 4.5 inches (11.5 CM)\n6-12 months 5.1 inches (13.0 CM)\n12-18 months 5.5 inches (14.0 CM)\n18-24 months 5.9 inches (15.0 CM)\n2-3 years 6.25 inches (16.0 CM)\n3-4 years 6.9 inches (16.5 CM)",
            "weight": 500,
            "category": "Fashion",
            "brand": "Ebooba",
            "seller": {
                "_id": "5e279603a7d84c2afc5e5482",
                "name": "Jane Doe",
                "email": "jane@mail.com",
                "image": "https://storage.googleapis.com/ecommerce-vn/1579683727889Sound_of_Music_-_Maria_on_the_hill.jpg"
            },
            "image": "https://storage.googleapis.com/ecommerce-vn/1579685998118il_1588xN.911758559_97qw.jpg",
            "createdAt": "2020-01-22T09:40:01.512Z",
            "updatedAt": "2020-01-27T04:20:42.589Z"
        }
    ]
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Get a product**

- **URL**
  <_/products/{id}_>

- **Method:**
  `GET`

- **URL Params** <br />
  `id=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://35.198.208.136/products/5e281a1698307767e7c2b8f6",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "_id": "5e281a1698307767e7c2b8f6",
        "name": "Baby Soft Book",
        "price": 199000,
        "stock": 3,
        "description": "This baby quiet book - sensory busy book for children a must have for first age. The format is suitable for its little hands. Such a variety of tapes on the pages to attract baby's inquisitive mind and help him to coordinate the movements of the hands to examine them. The toy can easily be attached to a stroller, a crib or a highchair for feeding.\nToy contains 10 pages (Size: 15 x 15 cm (6 x 6 inches)), with primary colours in harmony of different materials and with activities :\n1. Chicken with opening wing and egg on Velcro\n2. Page with colored windows, where the characters are hiding\n3. Airplane with a screw that baby can twist your finger, the cabin hides a character\n4. Page with different textures, zipper and Velcro, the sun emits a squeak\n5. Apple in which the caterpillar lives\n6. Flower with rainbow colors petals, inside the flower is a safe mirror\n7. Car with wheels on velcro\n8. Page with different types of fasteners, zipper, magnetic button, button, velcro\n9. Cat for playing in a peek-a-boo\n10. Spider with paws on an elastic band",
        "weight": 1000,
        "category": "Books",
        "brand": "BabyWhatKnots",
        "seller": {
            "_id": "5e279603a7d84c2afc5e5482",
            "name": "Jane Doe",
            "email": "jane@mail.com",
            "image": "https://storage.googleapis.com/ecommerce-vn/1579683727889Sound_of_Music_-_Maria_on_the_hill.jpg"
        },
        "image": "https://storage.googleapis.com/ecommerce-vn/1579686419967il_1588xN.2083321711_9gbm.jpg",
        "createdAt": "2020-01-22T09:47:02.341Z",
        "updatedAt": "2020-01-27T06:27:44.248Z"
    }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Question not found" }`

---

**Search all logged in user's products**

- **URL**
  <_/products/all/own_>

- **Method:**
  `GET`

- **URL Params** <br />
  `keyword=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://35.198.208.136/products/all/own",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        {
            "_id": "5e281a1698307767e7c2b8f6",
            "name": "Baby Soft Book",
            "price": 199000,
            "stock": 3,
            "description": "This baby quiet book - sensory busy book for children a must have for first age. The format is suitable for its little hands. Such a variety of tapes on the pages to attract baby's inquisitive mind and help him to coordinate the movements of the hands to examine them. The toy can easily be attached to a stroller, a crib or a highchair for feeding.\nToy contains 10 pages (Size: 15 x 15 cm (6 x 6 inches)), with primary colours in harmony of different materials and with activities :\n1. Chicken with opening wing and egg on Velcro\n2. Page with colored windows, where the characters are hiding\n3. Airplane with a screw that baby can twist your finger, the cabin hides a character\n4. Page with different textures, zipper and Velcro, the sun emits a squeak\n5. Apple in which the caterpillar lives\n6. Flower with rainbow colors petals, inside the flower is a safe mirror\n7. Car with wheels on velcro\n8. Page with different types of fasteners, zipper, magnetic button, button, velcro\n9. Cat for playing in a peek-a-boo\n10. Spider with paws on an elastic band",
            "weight": 1000,
            "category": "Books",
            "brand": "BabyWhatKnots",
            "seller": {
                "_id": "5e279603a7d84c2afc5e5482",
                "name": "Jane Doe",
                "email": "jane@mail.com",
                "image": "https://storage.googleapis.com/ecommerce-vn/1579683727889Sound_of_Music_-_Maria_on_the_hill.jpg"
            },
            "image": "https://storage.googleapis.com/ecommerce-vn/1579686419967il_1588xN.2083321711_9gbm.jpg",
            "createdAt": "2020-01-22T09:47:02.341Z",
            "updatedAt": "2020-01-27T06:27:44.248Z"
        }
    ]
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Post a product**

- **URL**
  <_/products_>

- **Method:**
  `POST`

- **URL Params** <br />
  `None`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params**
  **Required:**
  `name=[string]` <br />
  `price=[number]` <br />
  `stock=[number]` <br />
  `category=[string]` <br />
  `image=[file]` <br />
  `weight=[number]`

  **Optional:**
  `description=[string]` <br />
  `brand=[string]`

- **Sample Request:**
```javascript
    axios({
        "method": "POST",
        "url": "http://35.198.208.136/products",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        },
        "data": {
            "name": "Baby Soft Book",
            "price": 199000,
            "stock": 3,
            "description": "This baby quiet book - sensory busy book for children a must have for first age. The format is suitable for its little hands. Such a variety of tapes on the pages to attract baby's inquisitive mind and help him to coordinate the movements of the hands to examine them. The toy can easily be attached to a stroller, a crib or a highchair for feeding.\nToy contains 10 pages (Size: 15 x 15 cm (6 x 6 inches)), with primary colours in harmony of different materials and with activities :\n1. Chicken with opening wing and egg on Velcro\n2. Page with colored windows, where the characters are hiding\n3. Airplane with a screw that baby can twist your finger, the cabin hides a character\n4. Page with different textures, zipper and Velcro, the sun emits a squeak\n5. Apple in which the caterpillar lives\n6. Flower with rainbow colors petals, inside the flower is a safe mirror\n7. Car with wheels on velcro\n8. Page with different types of fasteners, zipper, magnetic button, button, velcro\n9. Cat for playing in a peek-a-boo\n10. Spider with paws on an elastic band",
            "weight": 1000,
            "category": "Books",
            "brand": "BabyWhatKnots",
            "image": "file",
        }
    })
```
  
- **Success Response:**
  - **Code:** 201 <br />
    **Content:**
    ```javascript
        {
            "_id": "5e281a1698307767e7c2b8f6",
            "name": "Baby Soft Book",
            "price": 199000,
            "stock": 3,
            "description": "This baby quiet book - sensory busy book for children a must have for first age. The format is suitable for its little hands. Such a variety of tapes on the pages to attract baby's inquisitive mind and help him to coordinate the movements of the hands to examine them. The toy can easily be attached to a stroller, a crib or a highchair for feeding.\nToy contains 10 pages (Size: 15 x 15 cm (6 x 6 inches)), with primary colours in harmony of different materials and with activities :\n1. Chicken with opening wing and egg on Velcro\n2. Page with colored windows, where the characters are hiding\n3. Airplane with a screw that baby can twist your finger, the cabin hides a character\n4. Page with different textures, zipper and Velcro, the sun emits a squeak\n5. Apple in which the caterpillar lives\n6. Flower with rainbow colors petals, inside the flower is a safe mirror\n7. Car with wheels on velcro\n8. Page with different types of fasteners, zipper, magnetic button, button, velcro\n9. Cat for playing in a peek-a-boo\n10. Spider with paws on an elastic band",
            "weight": 1000,
            "category": "Books",
            "brand": "BabyWhatKnots",
            "seller": "5e279603a7d84c2afc5e5482",
            "image": "https://storage.googleapis.com/ecommerce-vn/1579686419967il_1588xN.2083321711_9gbm.jpg",
            "createdAt": "2020-01-22T09:47:02.341Z",
            "updatedAt": "2020-01-27T06:27:44.248Z"
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Image is required" }`
  - **Code:** 401 Forbidden <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Edit a question**

- **URL**
  <_/products/{id}_>

- **Method:**
  `PUT`

- **URL Params** <br />
  `id=[string]`

- **Request Headers** <br />
  **Required:**
  `image=[file]`

- **Data Params** <br />
  **Optional:**
  `name=[string]` <br />
  `price=[number]` <br />
  `stock=[number]` <br />
  `category=[string]` <br />
  `weight=[number]` <br />
  `description=[string]` <br />
  `brand=[string]`

- **Sample Request:**
```javascript
    axios({
        "method": "PUT",
        "url": "http://35.198.208.136/products/5e281a1698307767e7c2b8f6",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        },
        "data": {
            "name": "Baby Quiet Book"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "_id": "5e281a1698307767e7c2b8f6",
        "name": "Baby Quiet Book",
        "price": 199000,
        "stock": 3,
        "description": "This baby quiet book - sensory busy book for children a must have for first age. The format is suitable for its little hands. Such a variety of tapes on the pages to attract baby's inquisitive mind and help him to coordinate the movements of the hands to examine them. The toy can easily be attached to a stroller, a crib or a highchair for feeding.\nToy contains 10 pages (Size: 15 x 15 cm (6 x 6 inches)), with primary colours in harmony of different materials and with activities :\n1. Chicken with opening wing and egg on Velcro\n2. Page with colored windows, where the characters are hiding\n3. Airplane with a screw that baby can twist your finger, the cabin hides a character\n4. Page with different textures, zipper and Velcro, the sun emits a squeak\n5. Apple in which the caterpillar lives\n6. Flower with rainbow colors petals, inside the flower is a safe mirror\n7. Car with wheels on velcro\n8. Page with different types of fasteners, zipper, magnetic button, button, velcro\n9. Cat for playing in a peek-a-boo\n10. Spider with paws on an elastic band",
        "weight": 1000,
        "category": "Books",
        "brand": "BabyWhatKnots",
        "seller": "5e279603a7d84c2afc5e5482",
        "image": "https://storage.googleapis.com/ecommerce-vn/1579686419967il_1588xN.2083321711_9gbm.jpg",
        "createdAt": "2020-01-22T09:47:02.341Z",
        "updatedAt": "2020-01-27T06:27:44.248Z"
    }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 403 Forbidden <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Question not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Delete a product**

- **URL**
  <_/products/{id}_>

- **Method:**
  `DELETE`

- **URL Params** <br />
  `id=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "DELETE",
        "url": "http://35.198.208.136/products/5e281a1698307767e7c2b8f6",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
      "Product successfully deleted"
    }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 403 Forbidden <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Product not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Add product to cart**

- **URL**
  <_/cart_>

- **Method:**
  `POST`

- **URL Params** <br />
  `None`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  **Required:**
  `product=[string]` <br />
  `quantity=[number]`

- **Sample Request:**
```javascript
    axios({
        "method": "POST",
        "url": "http://35.198.208.136/cart",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        },
        "data": {
          "product": "5e281871bf0e1863669c4452",
          "quantity": 2
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        {
            "_id": "5e339ec77db0a81e6d081d33",
            "product": "5e281871bf0e1863669c4452",
            "quantity": 2
        }
    ]
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Product's quantity is required" }`
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Find all products in cart**

- **URL**
  <_/cart_>

- **Method:**
  `GET`

- **URL Params** <br />
  `None`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params**
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://35.198.208.136/cart",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```
  
- **Success Response:**
  - **Code:** 201 <br />
    **Content:**
    ```javascript
    [
        {
            "_id": "5e339ec77db0a81e6d081d33",
            "product": {
                "_id": "5e281871bf0e1863669c4452",
                "name": "Baby Shoes",
                "price": 299000,
                "stock": 87,
                "description": "Free shipping for all\n\nJust add the products in your shopping card and confirm your order\nYour child will be grateful after they put on these soft sole Ebooba yellow (tan) shoes. They are made solely for the comfort and warmth of your baby’s feet.\n\nLook at our ather modes made of perforated leather (many small holes): https://www.etsy.com/listing/279987606/\n\nSize chart: https://www.etsy.com/shop/ebooba/policy\n\n0-6 months insole length 4.5 inches (11.5 CM)\n6-12 months 5.1 inches (13.0 CM)\n12-18 months 5.5 inches (14.0 CM)\n18-24 months 5.9 inches (15.0 CM)\n2-3 years 6.25 inches (16.0 CM)\n3-4 years 6.9 inches (16.5 CM)",
                "weight": 500,
                "category": "Fashion",
                "brand": "Ebooba",
                "seller": "5e279603a7d84c2afc5e5482",
                "image": "https://storage.googleapis.com/ecommerce-vn/1579685998118il_1588xN.911758559_97qw.jpg",
                "createdAt": "2020-01-22T09:40:01.512Z",
                "updatedAt": "2020-01-31T03:28:07.636Z"
            },
            "quantity": 2
        }
    ]
    ```

- **Error Response:**
  - **Code:** 401 Forbidden <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Create a transaction**

- **URL**
  <_/transactions_>

- **Method:**
  `POST`

- **URL Params** <br />
  `None`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  **Required:**
  `address=[string]` <br />
  `courier=[string]` <br />
  `delivery_fee=[number]`

- **Sample Request:**
```javascript
    axios({
        "method": "POST",
        "url": "http://35.198.208.136/transactions",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        },
        "data": {
            "address": "Jl. Bumi no.17 Jakarta Selatan",
            "courier": "JNE",
            "delivery_fee": 15000
        }
    })
```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```javascript
    {
        "status": "prepared",
        "courier": "JNE",
        "_id": "5e33a1767db0a81e6d081d34",
        "cart": [
            {
                "_id": "5e339ec77db0a81e6d081d33",
                "product": "5e281871bf0e1863669c4452",
                "quantity": 1
            }
        ],
        "address": "Jl. Bumi no.17 Jakarta Selatan",
        "delivery_fee": 15000,
        "buyer": "5e339b5f7db0a81e6d081d32",
        "createdAt": "2020-01-31T03:39:34.090Z",
        "updatedAt": "2020-01-31T03:39:34.090Z"
    }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Add product to cart**

- **URL**
  <_/cart_>

- **Method:**
  `POST`

- **URL Params** <br />
  `None`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  **Required:**
  `product=[string]` <br />
  `quantity=[number]`

- **Sample Request:**
```javascript
    axios({
        "method": "POST",
        "url": "http://35.198.208.136/cart",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        },
        "data": {
          "product": "5e281871bf0e1863669c4452",
          "quantity": 2
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        {
            "_id": "5e339ec77db0a81e6d081d33",
            "product": "5e281871bf0e1863669c4452",
            "quantity": 2
        }
    ]
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Product's quantity is required" }`
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Find all products in cart**

- **URL**
  <_/cart_>

- **Method:**
  `GET`

- **URL Params** <br />
  `None`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params**
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://35.198.208.136/cart",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```
  
- **Success Response:**
  - **Code:** 201 <br />
    **Content:**
    ```javascript
    [
        {
            "_id": "5e339ec77db0a81e6d081d33",
            "product": {
                "_id": "5e281871bf0e1863669c4452",
                "name": "Baby Shoes",
                "price": 299000,
                "stock": 87,
                "description": "Free shipping for all\n\nJust add the products in your shopping card and confirm your order\nYour child will be grateful after they put on these soft sole Ebooba yellow (tan) shoes. They are made solely for the comfort and warmth of your baby’s feet.\n\nLook at our ather modes made of perforated leather (many small holes): https://www.etsy.com/listing/279987606/\n\nSize chart: https://www.etsy.com/shop/ebooba/policy\n\n0-6 months insole length 4.5 inches (11.5 CM)\n6-12 months 5.1 inches (13.0 CM)\n12-18 months 5.5 inches (14.0 CM)\n18-24 months 5.9 inches (15.0 CM)\n2-3 years 6.25 inches (16.0 CM)\n3-4 years 6.9 inches (16.5 CM)",
                "weight": 500,
                "category": "Fashion",
                "brand": "Ebooba",
                "seller": "5e279603a7d84c2afc5e5482",
                "image": "https://storage.googleapis.com/ecommerce-vn/1579685998118il_1588xN.911758559_97qw.jpg",
                "createdAt": "2020-01-22T09:40:01.512Z",
                "updatedAt": "2020-01-31T03:28:07.636Z"
            },
            "quantity": 2
        }
    ]
    ```

- **Error Response:**
  - **Code:** 401 Forbidden <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Get all logged in user's transactions**

- **URL**
  <_/transactions/all/own_>

- **Method:**
  `GET`

- **URL Params** <br />
  `None`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://35.198.208.136/transactions",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        {
            "status": "prepared",
            "courier": "JNE",
            "_id": "5e33a1767db0a81e6d081d34",
            "cart": [
                {
                    "_id": "5e339ec77db0a81e6d081d33",
                    "product": {
                        "_id": "5e281871bf0e1863669c4452",
                        "name": "Baby Shoes",
                        "price": 299000,
                        "stock": 871,
                        "description": "Free shipping for all\n\nJust add the products in your shopping card and confirm your order\nYour child will be grateful after they put on these soft sole Ebooba yellow (tan) shoes. They are made solely for the comfort and warmth of your baby’s feet.\n\nLook at our ather modes made of perforated leather (many small holes): https://www.etsy.com/listing/279987606/\n\nSize chart: https://www.etsy.com/shop/ebooba/policy\n\n0-6 months insole length 4.5 inches (11.5 CM)\n6-12 months 5.1 inches (13.0 CM)\n12-18 months 5.5 inches (14.0 CM)\n18-24 months 5.9 inches (15.0 CM)\n2-3 years 6.25 inches (16.0 CM)\n3-4 years 6.9 inches (16.5 CM)",
                        "weight": 500,
                        "category": "Fashion",
                        "brand": "Ebooba",
                        "seller": "5e279603a7d84c2afc5e5482",
                        "image": "https://storage.googleapis.com/ecommerce-vn/1579685998118il_1588xN.911758559_97qw.jpg",
                        "createdAt": "2020-01-22T09:40:01.512Z",
                        "updatedAt": "2020-01-31T03:34:25.200Z"
                    },
                    "quantity": 1
                }
            ],
            "address": "Jl. Bumi no.17 Jakarta Selatan",
            "delivery_fee": 15000,
            "buyer": {
                "_id": "5e339b5f7db0a81e6d081d32",
                "name": "Tilda Swinton",
                "email": "swinton@mail.com",
                "image": "https://ui-avatars.com/api/?name=Tilda Swinton&size=512"
            },
            "createdAt": "2020-01-31T03:39:34.090Z",
            "updatedAt": "2020-01-31T03:39:34.090Z"
        }
    ]
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Get logged in user's transaction**

- **URL**
  <_/transactions/{id}_>

- **Method:**
  `GET`

- **URL Params** <br />
  `None`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **URL Params** <br />
  **Required:**
  `id=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://35.198.208.136/transactions/5e33a1767db0a81e6d081d34",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        {
            "status": "prepared",
            "courier": "JNE",
            "_id": "5e33a1767db0a81e6d081d34",
            "cart": [
                {
                    "_id": "5e339ec77db0a81e6d081d33",
                    "product": {
                        "_id": "5e281871bf0e1863669c4452",
                        "name": "Baby Shoes",
                        "price": 299000,
                        "stock": 871,
                        "description": "Free shipping for all\n\nJust add the products in your shopping card and confirm your order\nYour child will be grateful after they put on these soft sole Ebooba yellow (tan) shoes. They are made solely for the comfort and warmth of your baby’s feet.\n\nLook at our ather modes made of perforated leather (many small holes): https://www.etsy.com/listing/279987606/\n\nSize chart: https://www.etsy.com/shop/ebooba/policy\n\n0-6 months insole length 4.5 inches (11.5 CM)\n6-12 months 5.1 inches (13.0 CM)\n12-18 months 5.5 inches (14.0 CM)\n18-24 months 5.9 inches (15.0 CM)\n2-3 years 6.25 inches (16.0 CM)\n3-4 years 6.9 inches (16.5 CM)",
                        "weight": 500,
                        "category": "Fashion",
                        "brand": "Ebooba",
                        "seller": "5e279603a7d84c2afc5e5482",
                        "image": "https://storage.googleapis.com/ecommerce-vn/1579685998118il_1588xN.911758559_97qw.jpg",
                        "createdAt": "2020-01-22T09:40:01.512Z",
                        "updatedAt": "2020-01-31T03:34:25.200Z"
                    },
                    "quantity": 1
                }
            ],
            "address": "Jl. Bumi no.17 Jakarta Selatan",
            "delivery_fee": 15000,
            "buyer": {
                "_id": "5e339b5f7db0a81e6d081d32",
                "name": "Tilda Swinton",
                "email": "swinton@mail.com",
                "image": "https://ui-avatars.com/api/?name=Tilda Swinton&size=512"
            },
            "createdAt": "2020-01-31T03:39:34.090Z",
            "updatedAt": "2020-01-31T03:39:34.090Z"
        }
    ]
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Transaction not found!" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Update a transaction's delivery status**

- **URL**
  <_/transactions/{id}/delivered_>

- **Method:**
  `PATCH`

- **URL Params** <br />
  `None`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **URL Params** <br />
  **Required:**
  `id=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "PATCH",
        "url": "http://35.198.208.136/transactions/5e33a1767db0a81e6d081d34/delivered",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        {
            "status": "delivered",
            "courier": "JNE",
            "_id": "5e33a1767db0a81e6d081d34",
            "cart": [
                {
                    "_id": "5e339ec77db0a81e6d081d33",
                    "product": {
                        "_id": "5e281871bf0e1863669c4452",
                        "name": "Baby Shoes",
                        "price": 299000,
                        "stock": 871,
                        "description": "Free shipping for all\n\nJust add the products in your shopping card and confirm your order\nYour child will be grateful after they put on these soft sole Ebooba yellow (tan) shoes. They are made solely for the comfort and warmth of your baby’s feet.\n\nLook at our ather modes made of perforated leather (many small holes): https://www.etsy.com/listing/279987606/\n\nSize chart: https://www.etsy.com/shop/ebooba/policy\n\n0-6 months insole length 4.5 inches (11.5 CM)\n6-12 months 5.1 inches (13.0 CM)\n12-18 months 5.5 inches (14.0 CM)\n18-24 months 5.9 inches (15.0 CM)\n2-3 years 6.25 inches (16.0 CM)\n3-4 years 6.9 inches (16.5 CM)",
                        "weight": 500,
                        "category": "Fashion",
                        "brand": "Ebooba",
                        "seller": "5e279603a7d84c2afc5e5482",
                        "image": "https://storage.googleapis.com/ecommerce-vn/1579685998118il_1588xN.911758559_97qw.jpg",
                        "createdAt": "2020-01-22T09:40:01.512Z",
                        "updatedAt": "2020-01-31T03:34:25.200Z"
                    },
                    "quantity": 1
                }
            ],
            "address": "Jl. Bumi no.17 Jakarta Selatan",
            "delivery_fee": 15000,
            "buyer": {
                "_id": "5e339b5f7db0a81e6d081d32",
                "name": "Tilda Swinton",
                "email": "swinton@mail.com",
                "image": "https://ui-avatars.com/api/?name=Tilda Swinton&size=512"
            },
            "createdAt": "2020-01-31T03:39:34.090Z",
            "updatedAt": "2020-01-31T03:39:34.090Z"
        }
    ]
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Invalid access" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Transaction not found!" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---