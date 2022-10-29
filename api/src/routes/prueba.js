const { Router } = require("express");
const { Sequelize, Model } = require("sequelize");
const axios = require("axios");
const { Genres, Videogames } = require(`../db`);
const { API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const {Dog} = require('../models/Dog')
// const {Temperaments } = require('../models/Temperaments')

const router = Router();

router.get("/", async (req, res) => {

  let games = await allGames();

  //    gamesdb=gamesdb.map((e)=>(e.Genres=mapeo(e.Genres)))
  //      games=games.map((e)=>(e.genres=mapeo(e.genres)))

  res.send(games);
});
async function allGames() {
  let games1 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=6`);
  let games2 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=7`);
  let games3 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=8`);
  let games4 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=9`);
  let games5 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=10`);
  let games = await Promise.all([games1, games2, games3, games4, games5]);

  games = games.map((e) => e.data.results);
  games.flat();
  games = [...games[0], ...games[1], ...games[2], ...games[3], ...games[4]];
  games = games.map((e) => ({
    id: e.id,
    name: e.name,
    background_image: e.background_image,
    Genres: e.genres,
    rating: e.rating,
    platforms: e.platforms.map((e)=>e.platform.name),
    released: e.released,
  }));
  // console.log(games)
  return games;
}

module.exports = router;
