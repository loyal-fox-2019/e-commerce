# e-commerce

# Product Routes

| Route | HTTP | Request | Response | Description|
| ----------- | ----------- |----------- |----------- | ----------- |
| /allProducts | GET |null||Get All products|
| /product | POST |Body:<br />- name:{type: String, required: true}<br />- description: {type: String, required: true}<br />- price: {type: Number, required: true}<br />-file: { file }<br /><br />Headers:<br />- token : {type: String}|{<br />_id:"...",<br />name: ".....",<br />description: "......",<br /><br />price: "....",<br />file: "......"}||

