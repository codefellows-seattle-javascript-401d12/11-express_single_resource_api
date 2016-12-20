### Express Single Resource API

This is a fun project where we created refactored our Vanilla REST API to use Express.js! Woo!

### Get the Project Running

To get this project running, type the following in your command line:

1. `git clone https://github.com/brittdawn/11-express_single_resource_api.git`
2. `cd 11-express_single_resource_api.git`
3. `npm i`
4. `brew install httpie`
5. `node server.js`

You will now see the phrase "server is up: 3000" if you have not already specified a port number.

### Test the Vanilla REST API (POST)

1. Open a new terminal located at the root of this project and type `http POST localhost:3000/api/song title="meow" description="meow meow"`
2. You should get a JSON response with a description, id, and title with a `200` status code, like this example:

``` javascript
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 86
Content-Type: application/json; charset=utf-8
Date: Tue, 20 Dec 2016 03:49:14 GMT
ETag: W/"56-eWDnWC1unrCb1RCpC08DRQ"
X-Powered-By: Express

{
    "description": "meow meow",
    "id": "465251f0-c667-11e6-979e-15e9bd7f18fe",
    "title": "meow"
}
```

### Test the Vanilla REST API (GET)

After making a POST, you can make a GET request.

1. Copy the id from your POST request above. Add it as a querystring to your GET request, like this example: ` http localhost:3000/api/song?id=465251f0-c667-11e6-979e-15e9bd7f18fe`

2. You should get a JSON response with a description, id, and title with a `200` status code, like this example:

``` javascript
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 86
Content-Type: application/json; charset=utf-8
Date: Tue, 20 Dec 2016 03:49:38 GMT
ETag: W/"56-eWDnWC1unrCb1RCpC08DRQ"
X-Powered-By: Express

{
    "description": "meow meow",
    "id": "465251f0-c667-11e6-979e-15e9bd7f18fe",
    "title": "meow"
}
```

### Test the Vanilla REST API (DELETE)

After making a GET or a POST, you can make a DELETE request.

1. Copy the id from your POST/GET request above. Add it as a querystring to your DELETE request, like this example: `http DELETE localhost:3000/api/song?id=465251f0-c667-11e6-979e-15e9bd7f18fe`

2. You should get a JSON response with a description, id, and title with a `200` status code, like this example:

``` javascript
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 0
Content-Type: application/json
Date: Tue, 20 Dec 2016 03:49:50 GMT
X-Powered-By: Express
```

3. If you try a GET request now for the item you deleted, it should not be found. For example, with the item above: `http DELETE localhost:3000/api/song?id=465251f0-c667-11e6-979e-15e9bd7f18fe`. Now if you will get this `404` (not found) response, because you deleted the item, yo:

``` javascript
HTTP/1.1 404 Not Found
Connection: keep-alive
Content-Length: 13
Content-Type: text/html; charset=utf-8
Date: Tue, 20 Dec 2016 03:49:53 GMT
ETag: W/"d-8ImJlDOBcq5A9PkBq5sbQw"
X-Powered-By: Express

NotFoundError
```
