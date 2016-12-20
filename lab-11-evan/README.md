# ExpressJs REST API for adding and storing recipes

## *Overview*
This is RESTful API built out using ExpressJs. The API has established routes for GET, POST, and DELETE. At the moment editing(changing recipes after their creation is not available). This API will keep your recipes until they're are deleted, making use of writing to the file-system.
## *How to use*
* First you will need to clone this repo.
* Unique ID's are provided by `node-uuid`, and the application has other dependencies you will need, so you will need to run `npm i` once you've cloned it.
* Upon getting your dependencies installed, to see the API in action, you will need to download [httpie](http://httpie.org), so that you may make GET, POST, DELETE, and soon PUT requests.
## *UPDATES*
* Recently modularized code to decrease file size and decrease amount of writing.
* Utilized the file-system to create persistent-storage.
* Refactored by using npm modules like body-parser.
* Started utilizing debug, morgan.

## *Example httpie requests*


### POST
  * `http POST localhost:<yourportnumber>/api/recipe name=burger ingredients=meat,bun,deliciousness category=american`

### GET
  * `http localhost:<yourportnumber>/api/recipe?id=<id created by node-uuid>`

### DELETE
  * `http DELETE localhost:<yourportnumber>/api/recipe?id=<id created by node-uuid>`
