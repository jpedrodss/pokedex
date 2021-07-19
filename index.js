import axios from "axios";

axios
  .get("https://pokeapi.co/api/v2/pokemon/charizard")
  .then((response) => {
    let pokemon = response.data;

    // Mostra o nome
    console.log(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1))

    // Mostra as habilidades
    console.log('Habilidades: ')
    pokemon.abilities.forEach(e => {
        console.log(`   Nome da habilidade: ${e.ability.name}`)
    })
    
    // Mostra os status
    console.log('Status base: ')
    pokemon.stats.forEach(e => {
        console.log(`   ${e.stat.name}: ${e.base_stat}`)
    })

    // Experiência base
    console.log(`Exp base: ${pokemon.base_experience}`)

    // Mostra o peso
    console.log(`Peso: ${pokemon.weight} gramas`)

    // Mostra a altura
    console.log(`Altura: ${pokemon.height}0 centímetros`)

    // Mostra a espécie
    console.log(`Espécie: ${pokemon.species.name.charAt(0).toUpperCase() + pokemon.species.name.slice(1)}`)

  })
  .catch((error) => console.log(error));
