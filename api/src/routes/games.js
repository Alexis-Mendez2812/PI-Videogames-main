const { Router } = require('express');
const { Sequelize, Model } = require('sequelize');
const axios = require('axios');
const { Genres, Videogames } = require(`../db`)
const {API_KEY} = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const {Dog} = require('../models/Dog')
// const {Temperaments } = require('../models/Temperaments')


const router = Router();

router.get('/', async (req, res) => {
   let games = await allGames()
   let gamesdb = await gamesDb()
   let datos =[...gamesdb,...games]
   let {name} = req.query;
   if(name){
    name=name.toLowerCase()
         let filtro =datos.filter((e)=>e.name.toLowerCase().includes(name) )
         // console.log(filtro)
         return res.send(filtro)
 }
   res.send(datos)
})

router.get('/db', async (req, res) => {
   let games = await gamesDb()
   res.send(games)
})
router.get('/:id', async (req, res) => {
    let {id} = req.params
    let games = await allGames()
    let gamesdb = await gamesDb()
    let datos =[...gamesdb,...games]
    let filtro =datos.filter((e)=>e.id == id )
    // console.log(filtro)
    return res.send(filtro)
})

router.post(`/post`, async (req, res) => {
const {name,description,platforms,released,rating,background_image,genres} = req.body;
try {
    const [game,created] = await Videogames.findOrCreate({
    where: {name,description,platforms,released,rating,background_image}});
                // console.log("se creó mi game? "+ created )
                // console.log(genres)
                let gens = await Genres.findAll({
                    where:{name:genres}
                })
                console.log(gens)
                let gens2 = gens.map((e)=>(e.id))
           await game.addGenres(gens2)

           
           return res.status(201).json({"mensaje":"game creado","game":game});
          } catch (error) {
            res.status(500).json({"mensaje":`Algo salio mal con tu game`,error});
          }

          
})
router.post(`/post2`, async (req, res) => {
const {genres} = req.body;
try {
let gens = await Genres.findAll({
    where:{name:genres}
})
console.log(gens)
let gens2 = gens.map((e)=>(e.id))
           return res.json({gens,gens2});
          } catch (error) {
            res.status(500).json({gens});
          }

          
})


async function allGames(){
    let games1 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`)
    let games2 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
    let games3 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
    let games4 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
    let games5 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
    let games = await Promise.all([games1,games2,games3,games4,games5])

    games= games.map((e)=>(
        e.data.results
        ))
        games.flat()
        games = [...games[0],...games[1],...games[2],...games[3],...games[4]]
        games= games.map((e)=>({id:e.id,name:e.name,background_image:e.background_image,
            genres:e.genres,rating:e.rating,platforms:e.parent_platforms,released:e.released
            }))
    // console.log(games)
    return games
}
async function gamesDb(){
    let games = await Videogames.findAll({
        include: Genres
    })
    console.log(games)
 return games
}


module.exports = router;