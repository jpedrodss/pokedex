const express = require('express');
const router = express.Router();
const pokedex = require('../models/pokemon')

/* GET home page. */
router.get('/pokemon/:name', async function (req, res, next) {
    const pokemon = await pokedex.getPokemon(req.params.name)

    res.json(pokemon)
});

router.get('/pokemon/especie/:id', async function (req, res, next) {
    const especie = await pokedex.getSpecies(req.params.id)

    res.json(especie)
})

router.get('/pokemon/evolution/:id', async function (req, res, next) {
    const especie = await pokedex.getSpecies(req.params.id)
    const url = especie.evolution_chain.url
    const evolucao = await pokedex.getEvolutionChain(url)

    res.json(evolucao)
})

router.get('/pokemon/full/:name', async function (req, res, next) {
    const pokemon = await pokedex.getPokemon(req.params.name)
    const especie = await pokedex.getSpecies(pokemon.id)
    const url = especie.evolution_chain.url
    const evolucao = await pokedex.getEvolutionChain(url)

    const resposta = {
        pokemon,
        especie,
        evolucao
    }

    res.json(resposta)
    // res.json(especie)
    // res.json(evolucao)
})

module.exports = router;
