"use strict";
const { Product } = require("./models");

const data = [
  {
    "name": "SOUVENIR AWP | DRAGON LORE",
    "image": "https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZYMUrsm1j-9xgEObwgfEh_nvjlWhNzZCveCDfIBj98xqodQ2CZknz56I_OKMyJYfwHGCKVIXfkF8BrtDig818Z0ROi6_rwOPWOz5cCRZq5_YtseF8HWUqODb1z07B1sg6IIecSApS3n3y3va2xbCka_-mgCzrWHpPI11dsTLfPm/",
    "wear": "FACTORY NEW",
    "stock": 2,
    "price": 240910826
  },
  {
    "name": "KARAMBIT | DOPPLER (Ruby)",
    "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20heL2KoTcl3lT5MB4kOzFyoD8j1yg5UNkaz_xIdfEd1A5aQ3U-lPskunphJHptZvPwSM26CUht3_UmUe3gEpSLrs4ZlidBgY/",
    "wear": "FACTORY NEW",
    "stock": 1,
    "price": 38786883
  },
  {
    "name": "KARAMBIT | DOPPLER (Sapphire)",
    "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20hPbkI7PYhG5u5cRjiOXE_JbwjGu4ohQ0J3egI4ORcQNqYw3W8la5w-frgJK77ZXKwCQysyVwtnbayxKzhxlIarRum7XAHvqFh2jA/",
    "wear": "FACTORY NEW",
    "stock": 1,
    "price": 56093741
  },
  {
    "name": "BUTTERFLY KNIFE | ULTRAVIOLET",
    "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq5OEqOfhIavdk1Rd4cJ5ntbN9J7yjRrl-kU_Z2GhcoDEdlc9Yg7V_AW_wLzsh5a4tZzAzXBh63En7SnUnBawn1gSOc3pULhL/",
    "wear": "FIELD-TESTED",
    "stock": 10,
    "price": 4249426
  },
  {
    "name": "CLASSIC KNIFE",
    "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQh5hlcX0nvUOGsx8DdQBJjIAVHubSaIAlp1fb3ci5Rooy0x9PbwKb3YePSxjlUvsMg0-ySo9_xiw2180BkZm_1d4CQdwE9aVHOug_phDL4LJg/",
    ""wear"": "VANILLA",
    "stock": 5,
    "price": 7446336
  },
  {
    "name": "AK-47 | BLOODSPORT",
    "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhnwMzJemkV0966m4-PhOf7Ia_ummJW4NFOhujT8om73ASy-0RqNW-hLYTAcg5vMgvT_Vm4wefthpO_v8yYwHVlsicr4C3fzQv330_79eypFA/",
    "wear": "FIELD-TESTED",
    "stock": 34,
    "price": 650641
  },
  {
    "name": "AWP | GRAPHITE",
    "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAZt7PDaZDBS4NmJlpKKgfjLP7LWnn9u5MRjjeyPoIqg0VCx-UFrN2v7JNCWIQVsYlGGqwS5lOrm1MW9uJ7Kynow6yVw52GdwULDeIeGVQ/",
    "wear": "MINIMAL WEAR",
    "stock": 89,
    "price": 860688
  },
  {
    "name": "AWP | ASIIMOV",
    "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7cqWdQ-sJ0xOzAot-jiQa3-hBqYzvzLdSVJlQ3NQvR-FfsxL3qh5e7vM6bzSA26Sg8pSGKJUPeNtY/",
    "wear": "FIELD-TESTED",
    "stock": 40,
    "price": 960215
  },
  {
    "name": "M4A4 | HOWL",
    "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwT09S5g4yCmfDLP7LWnn9u5MRjjeyP9tqhiQ2yqEo6Mmn3doPBcwZqZQrRr1O-we_sgMO5tZ_BzCFr6ycltmGdwULa1vGJFg/",
    "wear": "FACTORY NEW",
    "stock": 3,
    "price": 25231262
  },
  {
    "name": "AWP | GUNGNIR",
    "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJF-dKxmomZqPv9NLPFqWdQ-sJ0xO-ZpY-n0AHt_0M6ZGygd9eQegE9YAzYrwDqx7y7jcTpvc7IwSdgsnI8pSGKcZwC8Qk/",
    "wear": "FACTORY NEW",
    "stock": 9,
    "price": 20800912
  },
];

Product
  .insertMany(data)
  .then(() => console.log("Success"))
  .catch((err) => console.log(err))
