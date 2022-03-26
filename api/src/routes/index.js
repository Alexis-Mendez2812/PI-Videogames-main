const { Router } = require('express');
const {API_KEY} = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/genres
// GET https://api.rawg.io/api/games/{id}
// https://api.rawg.io/api/platforms?key=b2a83978769f4df79815bf8e356b4711
// GET https://api.rawg.io/api/games?key=b2a83978769f4df79815bf8e356b4711&dates=2019-09-01,2019-09-30&platforms=18,1,7
