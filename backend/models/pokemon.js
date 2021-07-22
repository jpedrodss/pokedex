//const Pokedex = require('pokedex-promise-v2')
//const pokedex = new Pokedex
const axios = require('axios')

function evolves_to(evolves, pokemon) {
    // Se houver próximas evoluções
    if (evolves) {
        if (evolves.species.name !== pokemon.data.name) {
            // Mostra a segunda evolução
            return "Segunda evolução: " + evolves.species.name;
        }
        if (evolves.evolves_to[0]) {
            // Mostra a terceira evolução
            if (evolves.evolves_to[0].species.name !== pokemon.data.name) {
                return "Terceira evolução: " + evolves.evolves_to[0].species.name;
            }
            return "Evolução máxima!";
        }
    }
    return "Evolução máxima!";
}

async function getPokemon(name) {
    // let pokemon = pokedex.getPokemonByName(name)
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon = response.data

    return {
        id: pokemon.id,
        name: pokemon.name,
        especie: pokemon.species.name,
        peso: (pokemon.weight * 10) / 100,
        altura: (pokemon.height * 10) / 100,
        exp_base: pokemon.base_experience,
        moves: pokemon.moves.map((e) => {
            return `${e.move.name}`;
        }),
        habilidades: pokemon.abilities.map((e) => {
            return `${e.ability.name} `;
        }),
        status: pokemon.stats.map((e) => {
            return `${e.stat.name}: ${e.base_stat}`;
        }),
        tipos: pokemon.types.map((e) => {
            return `${e.type.name}`;
        }),
        sprite_padrao_frente: pokemon.sprites.front_default,
    }
}

async function getSpecies(id) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const especie = response.data

    return especie
}

async function getEvolutionChain(url) {
    const response = await axios.get(url)
    const evolutionChain = response.data

    return evolutionChain
}

// getPokemon('charizard')
//     .then(res => console.log(res))

// getSpecies(6)
//     .then(res => {
//         getEvolutionChain(res.evolution_chain.url).then(response => console.log(response))
//     })

// module.exports = router

module.exports = {
    getPokemon,
    getEvolutionChain,
    getSpecies
}