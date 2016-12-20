'use strict';

const express = require('express');
const parseJSON = require('body-parser').json();
const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
