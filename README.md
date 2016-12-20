# Single Resource Express API

This project creates a single resource REST API using [Express.js](http://expressjs.com/) and allows users send POST, GET and DELETE requests related
to dogs through the terminal.
When sending requests, use filepath `/api/dog` with a query and a response will return with appropriate message/content.
You will need to [HTTPie](https://httpie.org/) to send requets through the terminal.

## How to run

Install any Dependencies from the `package.json` file into the project root
directory. Using [Node.js](https://nodejs.org/), to create a `package.json` file, enter command `npm init` in the project root.
You can run the command `npm i` to install all depenenedcies. Make sure to have a `data` folder in the root directory.
This is where POST requests will write to.

## Running server

Run the `server.js` file using command `node server.js` or `npm start`. In terminal, you should see `Server up: 8000` or
port that is set in your environmental variable in terminal.

## Sending POST GET DELETE Request

>POST Request

In an new terminal window, send a `POST` request by using the command
`http POST localhost:8000/api/dog name=<name> breed=<breed> color=<color>`.
Example: `http POST localhost:8000/api/dog name='Buddy' breed='Golden Retriever' color='brown`
The POST request must include `name` `breed` and `color` parameters.
The successful response should return a JSON object with values you entered along with a unique `id` and
a status code of `200`. This will also create a new `.json` file into the `data` folder with the `id`
as the file name.

![POST request screenshot](/assets/post-response-screenshot.png)

>GET Request

In an new terminal window, send a `GET` request by using the command `http localhost:8000/api/dog?id=<id>`.
Example: `http localhost:8000/api/dog?id=00000000-c303-11e6-a4a3-73422de980bc`
The successful reponse should return a JSON object with a status of `200`.

![GET request screenshot](/assets/get-response-screenshot.png)

>DELETE Request

In an new terminal window, send a `DELETE` request by using the command
`http DELETE localhost:8000/api/dog?id=<id>`.
Example: `http DELETE localhost:8000/api/dog?id=00000000-c303-11e6-a4a3-73422de980bc`
The a successful response should return a `204` status code with no content.

![DELETE request screenshot](/assests/delete-response-screenshot.png)

## Closing server

In server terminal, enter ```control``` + ```c```.
