# Express Single Resource API

This express single resource API allows a user to make GET, POST, and DELETE requests to the Artist object. The user can POST a new Artist name and genre, receive an id, and can delete the Artist by that id.

### Set-Up

In your Terminal

```sh
$ git clone <repository url>
$ cd 11-express_single_resource_api
$ npm i
```
This will install the proper dependencies. You should receive the following in your package.json file:

```sh
"dependencies": {
  "bluebird": "^3.4.6",
  "body-parser": "^1.15.2",
  "chai": "^3.5.0",
  "debug": "^2.4.5",
  "express": "^4.14.0",
  "http-errors": "^1.5.1",
  "morgan": "^1.7.0",
  "node-uuid": "^1.4.7",
  "superagent": "^3.3.1"
}
```

Run `node server.js` to start your server. You will receive a response of 'server live on PORT: `<PORT>`'


### Use

Making a POST request
* Run `http POST localhost:<PORT>/api/artist name='<name>' genre='<genre>'`
* This will update the Artist object to show `name:` `genre:` and `id:`
* You will also receive a status code of 200.

Example:
```sh
HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: application/json
Date: Fri, 16 Dec 2016 17:41:21 GMT
Transfer-Encoding: chunked
{
    "genre": "Punk",
    "id": "db41b700-c3b6-11e6-9f26-b925a6666a4c",
    "name": "Blink-182"
}
```

Making a GET request
* Run `http localhost:<PORT>/api/artist?id=<id>`
* You must copy and paste the id from the post request.
* You will also receive a status code of 200.

Making a DELETE request
* Run `http DELETE localhost:<PORT>/api/artist?id=<id>`
* This will delete the Artist with the id you pass in
* You will receive a status code of 204 No Content.

Example:
```sh
HTTP/1.1 204 No Content
Connection: keep-alive
Content-Type: application/json
Date: Fri, 16 Dec 2016 17:44:38 GMT
```


* If you run `http localhost:<PORT>/api/artist` you should receive a 400 status code, and a message of 'bad request'

* If you run `http POST localhost:<PORT>/api/artist` you should receive a 400 status code, and a message of 'bad request'
