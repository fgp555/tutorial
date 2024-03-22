// ========== M210_mongose ==========

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// ./config/dbCon.js
require("dotenv").config();
var MONGO_URI = process.env.MONGO_URI;
// console.log(MONGO_URI1)
var dataBase = "moviesDB";
var dataBase = "test";
const dbCon = async () => {
  await mongoose.connect(MONGO_URI + dataBase);
  console.log("connect to database successful");
};
// dbCon();

// ./models/MoviesModel.js
const moviesSchema = new mongoose.Schema({ _id: Number });
const MoviesModel = mongoose.model("moviescollections", moviesSchema);

const getMovieService = async () => {
  const movieFind = await MoviesModel.find();
  console.log(movieFind);
  return movieFind;
};

const getFindService = async () => {
  const movieFind = await MoviesModel.find({}, { title: 1, year: 1, _id: 0 });

  console.log(movieFind);
  return movieFind;
};
// getMovieService()

app.get("/movies", async (req, res) => {
  const getMovies = await getFindService();
  res.json(getMovies);
});

dbCon().then(() => {
  app.listen(3000, console.log("server start"));
});
