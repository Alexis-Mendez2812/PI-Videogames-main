const { Router } = require('express');
const { Sequelize } = require('sequelize');
const axios = require('axios');
const { Genres, Videosgames } = require(`../db`)
const {API_KEY} = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const {Dog} = require('../models/Dog')
// const {Temperaments } = require('../models/Temperaments')


const router = Router();

router.get('/', async (req, res) => {
   let games = await allGames()
   res.send(games)
})
router.get('/:id', async (req, res) => {
    let {id} = req.params
    id = Number(id)
    let todos = await Genres.findAll(
        {where: {
            id:id
        }})
    console.log(todos)
    if(todos.length==0){
        let generos = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        generos= generos.data
        generos= generos.results.map((e)=>({id:e.id,name:e.name,image_background:e.image_background}))
        generos= generos.sort()
        generos.forEach( async (e)=> await Genres.findOrCreate(
            {where: {
                id:e.id,
                name: e.name,
                image_background: e.image_background,
            }}))
        
        
            console.log(generos)
            return res.send(generos)
        }
        todos= todos.map((e)=>({id:e.id,name:e.name,image_background:e.image_background}))
        todos.sort()
    res.send(todos)
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
    console.log(games)
    return games
}


module.exports = router;