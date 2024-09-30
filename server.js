const express = require("express");
require('dotenv').config()
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload')
const app = express();
app.use(express.json());
app.use(express.static('static'))
app.use(fileUpload({}))



// API endpoints
app.use('/api/post', require('./routes/post.route'))
app.use('/api/auth', require('./routes/auth.route'))


const PORT = process.env.PORT || 3000;
const bootstrap = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log("Connected DB"));
    app.listen(PORT, () => {
      console.log(`Listening on - ${PORT}`);
    });
  } catch (error) {
    console.log(`Error conecting with DB: ${error}`);
  }
};

bootstrap()