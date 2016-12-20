![CF](https://camo.githubusercontent.com/70edab54bba80edb7493cad3135e9606781cbb6b/687474703a2f2f692e696d6775722e636f6d2f377635415363382e706e67) Lab 11: Single Resource Express API
===

## To Submit this Assignment
  * Fork this repository
  * Write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-brian`
  * Push to your repository
  * Submit a pull request to this repository
  * Submit a link to your PR in canvas
  * Write a question and observation on canvas

## Include
  * `package.json`
  * `.eslintrc`
  * `gulpfile.js`
  * `.gitignore`
  * `README.md`
    * your `README.md` should include detailed instructions on how to use your API

## Description
  * Create an HTTP server using `express`
  * Create a object constructor that creates a _simple resource_ with at least 3 properties
    * it can **not** have the same properties as the in-class sample code (other than the `id`)
    * a unique `id` property should be included *(node-uuid)*
    * include two additional properties of your choice
  * Use the JSON parser included with the `body-parser` module as a middleware component to parse the request body on `POST` and `PUT` routes
  * Use the npm `debug` module to log the methods in your application
  * Create an `npm` script to automate the `debug` process and start the server
  * Persist your API data using the storage module and file system persistence

## Server Endpoints
  * **`/api/simple-resource-name`**
  * `POST` request
   * pass data as stringifed JSON in the body of a **POST** request to create a new resource
  * `GET` request
   * pass `?id=<uuid>` as a query string parameter to retrieve a specific resource (as JSON)
  * `DELETE` request
   * pass `?id=<uuid>` in the query string to **DELETE** a specific resource
   * this should return a 204 status code with no content in the body

## Tests
  * write a test to ensure that your api returns a status code of 404 for routes that have not been registered
  * write tests to ensure the `/api/simple-resource-name` endpoint responds as described for each condition below:
   * `GET`: test 404, it should respond with 'not found' for valid requests made with an id that was not found
   * `GET`: test 400, it should respond with 'bad request' if no id was provided in the request
   * `GET`: test 200, it should contain a response body for a request made with a valid id
   * `POST`: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
   * `POST`: test 200, it should respond with the body content for a post request with a valid body
