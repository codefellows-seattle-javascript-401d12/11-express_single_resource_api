# REST API USING Express

This REST-API provides necessary backend support functionality create, read, update and delete. Currently it is saving data on data file using fs-node module which provides a little persistence.

### Dependencies:

- bluebird
- body-parser
- debug
- express
- http-error
- morgan
- node-uuid
- superagent
- mocha
- chai

This API is structured on a Model View Controller(MVC) architecture pattern. The base technologies are node.js express.


POST:
topic is required parameter as request body.
example: http POST localhost:3000/api/simple_resource
data: topic='some topic' book='some book'.

result:

````
http POST localhost:3000/api/simple_resource topic='some topic' book='some book'
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 85
Content-Type: application/json; charset=utf-8
Date: Tue, 20 Dec 2016 19:29:22 GMT
ETag: W/"55-rGlt9UK1EtZHiKpS3mGyxw"
X-Powered-By: Express

{
    "book": "some book",
    "id": "9c5aebb0-c6ea-11e6-865c-d5e13121e327",
    "topic": "some topic"
}
````

GET:
id is required as query string.
example: http GET localhost:3000/api/simple_resource?id="xxxxxxxxxxxxxxxx"


````
http GET localhost:3000/api/simple_resource id=="9c5aebb0-c6ea-11e6-865c-d5e13121e327"


HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 85
Content-Type: application/json; charset=utf-8
Date: Tue, 20 Dec 2016 19:30:40 GMT
ETag: W/"55-rGlt9UK1EtZHiKpS3mGyxw"
X-Powered-By: Express

{
    "book": "some book",
    "id": "9c5aebb0-c6ea-11e6-865c-d5e13121e327",
    "topic": "some topic"
}

````

PUT:
id is required parameter as request body.
example: http PUT localhost:3000/api/simple_resource id="xxxxxxxxxxxxxxxx" book='xxx' topic='xxx' instructor='xxxxx'

````
http PUT localhost:3000/api/simple_resource id="9c5aebb0-c6ea-11e6-865c-d5e13121e327" book='you donot know js' topic='javascript' instructor='Brian'

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 114
Content-Type: application/json; charset=utf-8
Date: Tue, 20 Dec 2016 19:33:50 GMT
ETag: W/"72-CHOLh28sVJNLFGAmtoAvCg"
X-Powered-By: Express

{
   "book": "you donot know js",
   "id": "9c5aebb0-c6ea-11e6-865c-d5e13121e327",
   "instructor": "Brian",
   "topic": "javascript"
}
````

DELETE:
id is required parameter as request query string.
example: http DELETE localhost:3000/api/simple_resource id="xxxxxxxxxxxxxxxx"
````
http DELETE localhost:3000/api/simple_resource id=="9c5aebb0-c6ea-11e6-865c-d5e13121e327"

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 15
Content-Type: application/json; charset=utf-8
Date: Tue, 20 Dec 2016 19:39:16 GMT
ETag: W/"f-ylZ9HW13eVLeeOl4qKFjDA"
X-Powered-By: Express

"file deleted!"
````
