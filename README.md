# search-api
simple search api

## Requirements

* NODE: `>= 10`
* YARN: `1.9.4`
* mongoDB: `4`
* DATABASE: `green-house-db`

## Setup

```bash
# clone the project
git clone https://github.com/iamgkstack/search-api.git && cd search-api

# install the dependencies
yarn

# start the project
yarn start
```
* This starts the server on the port 5200

## APIs availabe

Fetch all the available result which has name like %Lelia%

```curl
curl -X GET http://localhost:5200/api/v1/search/users/Lelia
```
