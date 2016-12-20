

# About This Project

This is a simple Express server built as part of the Code Fellows 401 JavaScript class. It can take, save and delete records of cheeses (yes, cheeses).

### To Get Up And Running

Clone this repository. In your terminal run the following commands:

```
cd lab-megan
npm i
```

In your terminal window you can start the server by typing:

``` npm run start ```

To interact with the server open a second terminal window. From here you can create, view and delete records of cheese.

##### To create a cheese enter the following, your cheese and it's unique id will be returned.

``` http POST localhost:3000/data/cheese color=<colorname> pokableness=<some measure of softness> ```

Note: When your server starts up note the port number and use it instead if it's different than the one I use in this example.

##### To view a cheese record type the following, the record will be displayed.

``` http localhost:3000/data/cheese?id=<some long id string you know exists> ```

##### To delete the record of a cheese enter the following, it will be wiped from the data folder.

``` http DELETE localhost:3000/data/cheese?id=<some long id string you know exists> ```

### To Use This API In Your project

Clone this repository and run the following:

```
npm i
npm i -D chai mocha gulp gulp-eslint gulp-mocha
```
