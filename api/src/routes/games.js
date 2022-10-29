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
  function mapeo(arr) {
    arr = arr.map((e) => e.name);
    //console.log(arr);
    return arr;
  }

  let games = await allGames();
  let gamesdb = await gamesDb();
  //    gamesdb=gamesdb.map((e)=>(e.Genres=mapeo(e.Genres)))
  //      games=games.map((e)=>(e.genres=mapeo(e.genres)))
  let datos = [...gamesdb, ...games];
  let { name } = req.query;
  if (name) {
    name = name.toLowerCase();
    let filtro = datos.filter((e) => e.name.toLowerCase().includes(name));
    // console.log(filtro)
    return res.send(filtro);
  }
  res.send(datos);
});
router.get("/search", async (req, res) => {
  const {name} = req.query;
  let {data} = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`)
let games=data.results.map((e)=>({"id":e.id,"name":e.name,"background_image":e.background_image,"Genres":e.genres,"rating":e.rating}))
  games= games.filter((e)=>e.background_image!==null)
  
  res.send(games);
});

router.get("/db", async (req, res) => {
  let games = await gamesDb();
  res.send(games);
});
router.get("/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id,typeof id)
  let game=""
  if( id.length<8){
     game = await gameById(id);

  }else{
   game = await gamesDb();
   game = game.filter((e) => e.id === id);
  }
  
  // console.log(filtro)
  return res.send(game);
});


router.post(`/post`, async (req, res) => {
  const {name,description,platforms,released,rating,background_image,genres,} = req.body;
  try {
    const [game, created] = await Videogames.findOrCreate({
      where: {
      name,description,platforms,released,rating,background_image}});
    // console.log("se creó mi game? "+ created )
    // console.log(genres)
    let gens = await Genres.findAll({ where: { name: genres },    });
    // console.log(gens)
    let gens2 = gens.map((e) => e.id);
    await game.addGenres(gens2);

    return res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ mensaje: `Algo salio mal con tu game`, error });
  }
});
router.post(`/post2`, async (req, res) => {
  const { genres } = req.body;
  try {
    let gens = await Genres.findAll({
      where: { name: genres },
    });
    // console.log(gens)
    let gens2 = gens.map((e) => e.id);
    return res.json({ gens, gens2 });
  } catch (error) {
    res.status(500).json({ gens });
  }
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
async function gamesDb() {
  let games = await Videogames.findAll({
    include: Genres,
  });
  // console.log(games)
  return games;
}
async function gameById(id) {
  let games =await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
  // console.log(games)
  games=games.data
  games = {
    id: games.id,
    name: games.name,
    background_image: games.background_image,
    Genres: games.genres,
    rating: games.rating,
    platforms: games.platforms.map((e)=>e.platform.name),
    released: games.released,
    description: games.description_raw,
  }
  return games;
}
async function gamesDb() {
  let games = await Videogames.findAll({
    include: Genres,
  });
  // console.log(games)
  return games;
}
 async function getPlatforms(){
  let games = await allGames()
  let platforms= games.map((e) =>e.platforms)
  platforms= platforms.flat()
  const dataArr = new Set(platforms);

    let result = [...dataArr];
  return result
}

module.exports = router;
