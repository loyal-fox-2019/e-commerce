# e-commerce

# Usage

## First thing to do

Clone this repository to your local computer by using this command

```
git clone https://github.com/harfialpharaby/e-commerce.git
```

## Server side

Go to folder `server` and do all steps below :

1. Type command in terminal

```
npm i
```

2. Make a new file `.env` or rename `.env_template` and add this lines

```
MONGO_PASSWORD=MONGO-ATLAS-PASSWORD
JWT_SECRET=YOUR-OWN-SECRET
KEYFILE=DOWNLOADED-KEYFILE-FROM-GOOGLE-BUCKET
BUCKET_NAME=BUCKET-NAME-IN-GOOGLE-CLOUD
```

3. You are ready to go, type command in terminal

```
npm run dev
```

## Client side

Go to folder `client` and type command below :

```
npm run serve
```

Wait until all loadings finishes and open `http://localhost:8080`

## Deploy Link
http://tookoo.harfialfaraby.com/

## Online Documentation Link

https://documenter.getpostman.com/view/3871398/SWT8gzWQ?version=latest
