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
    let todos = await Genres.findAll()
    // console.log(todos)
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
        
        
            // console.log(generos)
            return res.send(generos)
        }
        todos= todos.map((e)=>({id:e.id,name:e.name,image_background:e.image_background}))
        todos.sort()
    res.send(todos)
})
router.get('/:id', async (req, res) => {
    let {id} = req.params
    id = Number(id)
    let todos = await Genres.findAll(
        {where: {
            id:id
        }})
    // console.log(todos)
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
        
        
            // console.log(generos)
            return res.send(generos)
        }
        todos= todos.map((e)=>({id:e.id,name:e.name,image_background:e.image_background}))
        todos.sort()
    res.send(todos)
})

module.exports = router;