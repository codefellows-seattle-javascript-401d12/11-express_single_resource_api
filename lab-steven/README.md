#Vanilla Single-Resource REST API
###Steven Bateman's Lab 08 for JS 401

###Overview

This is an app that will allow you to practice GET, POST, and DELETE requests against a simple, single-resource API.

###Installation

To install this app, clone down the repository, navigate to the `lab-steven` directory, then run `npm i`. Then, to start your server, run `node server.js`. You should see the message: `Server running on port <port#>`.

###Installing HTTPIE

This app was tested using HTTPIE in the terminal. You can get HTTPIE through the following methods from your terminal:

If on a Mac:
* `brew install httpie`

If on Linux:
* `sudo apt install httpie`

###Usage

Now open up an additional terminal shell/tab and you can connect to the API by using HTTPIE.

By default, the API does not have any resources available, so you will need to POST some to use GET or DELETE.

###POSTing a new student

This particular API supports the POSTing of student objects that have a name and an age field. You can include as many properties as you'd like, but it must at least have a name and age. You can POST an object by running `http POST localhost:<port#>/api/student name="<name>" age="<age>"`.

* Example: `http POST localhost:8080/api/student name="Steven" age="30"`

If you forget to include the header fields, you will get back a 400 status message of bad request. If you forget to include name and age fields, you will also get a 400 status response.

This app will store all created students in the data/student directory, using the Node file system. Files will be titled according to a unique ID given upon creation of a new student.

###GETting a student

Once a student (or multiple students) have been POSTed to the API, you can perform a GET request on a particular ID to get that student's information back by passing in a query of the student's ID. For example: `http localhost:<port#>/api/student?id=<student ID>`. If you want to get a list of all student IDs, you can simply do `http localhost:<port#>/api/student`.

Examples:
* `http localhost:8080/api/student?id=298318db-80dc-4922-9fd2-8c997a43cc9c` (Will look for a student file with the passed in ID)
* `http localhost:8080/api/student` (Will return an array of all IDs found in the data/student folder)

If you pass in an incorrect ID, you will get back a 404 message of not found.

###DELETE-ing a student

If you'd like to DELETE a student from the API, it works just like a GET request. `http DELETE localhost:<port#>/api/student?id=<student ID>` will delete the student with the corresponding ID.

* Example: `http DELETE localhost:8080/api/student?id=298318db-80dc-4922-9fd2-8c997a43cc9c`

Similar to GET requests, if you include the wrong ID, you will get back a 404 not found error. If you don't include an ID, you will get back a 400 bad request error.
