# Express Single Resource API

### About
The Express Single Resource API is a simple RESTful API that utilizes Express for server creation and routing. All testing is handled via mocha, chai, and superagent. The API handles 3 types of RESTful Methods: `GET`, `POST`, and `DELETE`. The API is built to accept two pieces of data, location and rating, and stores them locally in the file system to create a layer of persistence. Each `POST` entry will also be assigned a unique id via `node-uuid`. The unique id allows the user to then either `GET` or `DELETE` files by using the unique id.

### Current Version (0.1.0)
The current version of this application will persist user data locally on the users file system. Users can `POST`, `GET`, and `DELETE` files.

### Setting up Express Single Resource API on your local machine
* Fork this repo
* git clone the forked copy to your local machine
* **Node** is required to run the server. Confirm you have node installed on your local machine by typing `npm -v` into your terminal. If you don't have node installed please follow the instructions here.
* Install the dependencies by running `npm i`.
* The server is set up to run using `npm scripts` so to turn on the server and run the program you will need to run `npm run start` in the terminal.
* When you start the server the port number should be printed to the terminal console. You will need to provide this to any users wanting to connect.

### API Commands
* `POST`: `http POST localhost:<YOUR PORT NUMBER>/api/ski location='<YOUR LOCATION DATA>' rating=<NUMBER>`
 * This will return a header with status code and a JSON representation of the data you just added.
 * The POST will write a file to the ../data/skiData/ file saved with uuid as the file name.
* `GET`: `http localhost:<YOUR PORT NUMBER>/api/ski?id=<ID OF OBJECT YOU WANT BACK>`
 * This will return a header with status code and a JSON representation of the data you just requested.
 * If you request a file via and id that does not exist then the api will return 404.
 * If you run a bad GET method and do not pass an id the api will return 400.
* `DELETE`: `http DELETE localhost:<YOUR PORT NUMBER>/api/ski?id=<ID OF OBJECT YOU WANT TO DELETE>`
 * This will return a header with a status code of 204.
 * The object deleted will be removed for the database.
* `mocha`: this will run tests set up to validate that the code is working as expected.
at the time of publication of this README.md all tests are currently passing.
* `gulp`: this will run the gulp file which includes tasks for `eslint` and `test`.
 * `test` task will perform the same tests that would be run if `mocha` was run.


### How the API works - detailed walkthrough
#### POST
**1.** Run `app.post('/api/ski', parseJson, function(req, res, next)` function on server.js

  **a.)** `/api/ski`: this is the `POST` path

  **b.)** `parseJson`: middleware that sends the `req` and `res` to the `body-parser.json` module. Expected return is a JSON res.

  **c.)** `function(req, res, next)`: is the handler that takes the returned `req` and `res` from the `parseJson` middleware.

    **c.i)** inside of the handler function (see last point) the `SkiData.createData` function that is in the `/model/ski-data.js` is called and passed the `req.body` as it's argument

    **c.ii)** `req.body` is equal to an object that has the to data `{ location: 'Mt Baker', rating: '10' }` that was passed by the user when running `http POST :3000/api/ski location="Mt Baker" rating=10`

**2.** Run `SkiData.createData = function(_data) {}`

  **a.)** The `_data` parameter contains the data passed to the `SkiData.createData` function in **_1.c.i_** and **_1.c.ii_**.
    **a.i)** `_data`: `{ location: 'Mt Baker', rating: '10' }`

  **b.)** A `try {} catch {}` block is run in order to account for any errors that may result from the data being passed to `_data`.

  **c.)** Assuming there is no `err` in the data passed, the `try {}` block is run.

    **c.i)** A variable of `skiData` is set up to hold the newly created `SkiData` object.

    **c.ii)** In order to build the `SkiData` object the constructor must be passed two parameters `location` and `rating`. Inside of `createData` the `_data` parameter is equal to an object that contains two pieces of data (see **_2.a.i_**). In order to access `location` the `_data.location` must be passed and to access the `rating` the `_data.rating` must be passed.

**3.** Run `const SkiData = module.exports = function(location, rating) {}`

  **a.)** The SkiData constructor is run via the `SkiData.createData` function and is expecting to receive two arguments, `location` and `rating`.

    **a.i)** the `location` and the `rating` are equal to the data that is passed the constructor in **_2.c.ii_** which ultimately tracks back to the data provided by the `req.body` **_1.c.ii_**.

  **b.)** If no `location` or `rating` data is passed the `createError` function is thrown with a 400 error with an error message indicating that data was expected but not received.

  **c.)** `location` and `rating` are set to the object.

  **d.)** A random id is generated via `node-uuid.v1`.

**4.** The newly constructed object is passed back to the `SkiData.createData` function and assigned to the `skiData` variable inside of the `try {}` block.

**5.** The `SkiData.createData` `try {}` block then returns the function `data.setItem()` which accepts two arguments.

  **a.)** The first argument will be used to set the `schemaName` inside of the `data.setItem()` function.

  **b.)** The second argument must be the newly constructed `SkiData` object that was created in step **_3_** and assigned to the variable `skiData` in step **_4_**.

**6.** Run `exports.setItem = function(schemaName, item) {}`

  **a.)** The `schemaName` parameter contains the data passed as the first argument in the `data.setItem` function in **_5.a_**.

    **a.i)** In the case of this API this is currently set as `skiData`.

    **a.ii)** The schemaName is used to name the sub-folder the data will be saved into inside of the data folder.

  **b.)** The `item` parameter contains the newly constructed SkiData object that was assigned to skiData variable in step **_4_**.

    **b.i)** The `SkiData` object has three key/value pairs (`location`, `rating`, `id`)

  **c.)** The same error check is run as in step **_3.b_** so that if any parameter is missing an error is thrown and the a rejected promise returned.

  **d.)** The `item` parameter is stringifyed via `JSON.stringify` and then assigned to the variable of `json`.

    **d.i)** example of what the `json` variable contains after stringify is run on the item: `{"location":"Mt Baker","rating":"10","id":"3bd05f10-c6e9-11e6-81a2-77dc09716381"}`

  **e.)** The `setItem` function then returns a `fs.writeFile` function that uses a `Prom`.

    **e.i)** The `Prom` suffix is used on the `fs.writeFile` function in order to Promisify it.

    **e.ii)** the `fs.writeFileProm` accepts two arguments: the location for the file to be written to and the json object to write to that file. In this use case the json object to be written is equal to the `json` variable created in **_6.d_**.

  **f.)** If the file was successfully written the a `.then()` function is run. Otherwise the `.catch()` is run and a 500 error is returned to the user.

  **g.)** Assuming success an anonymous function is called and returns an `item`.

    **g.i)** `item` is equal to `{ location: 'Mt Baker',rating: '10',id: '9b505980-c6ea-11e6-910f-e93d29c226e2' }` and will be passed back to the `SkiData.createData` function as the parameter `.then()` function.

**7.** Run the Promise `.then()` on the `SkiData.createData` function in the server.js file.

  **a.)** `skiData` parameter is equal to the object passed back from the `fs.writeFileProm` function. (see above **_6.g.i_**)

  **b.)** `skiData` is passed to back through the `body-parser.json` module and finally the res is printed to the terminal with the status code of 200.

#### GET


#### DELETE
