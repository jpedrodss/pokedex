import axios from "axios";

function evolution(especie) {
  if (especie.evolves_from_species) {
    return `de ${especie.evolves_from_species.name}`;
  } else {
    return "Esta é a primeira evolução.";
  }
}

function check_if(is) {
  if (is) {
    return "Sim";
  } else {
    return "Não";
  }
}

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

async function pokemon_data() {
  // Procura o pokemon.data
  const pokemon = await axios.get("https://pokeapi.co/api/v2/pokemon/charizard");
  console.log(pokemon.data.species.url)
  console.log(pokemon.data.id)
  
  // Pega a espécie do pokemon.data
  const especie = await axios.get(pokemon.data.species.url);
  
  // Pega as próximas evoluções
  const evoluindo = await axios.get(especie.data.evolution_chain.url);

  // Define as informações do pokemon
  const pokemon_info = {
    id: pokemon.data.id,
    name: pokemon.data.name,
    especie: pokemon.data.species.name,
    peso: (pokemon.data.weight * 10) / 100,
    altura: (pokemon.data.height * 10) / 100,
    exp_base: pokemon.data.base_experience,
    moves: pokemon.data.moves.map((e) => {
      return `${e.move.name}`;
    }),
    habilidades: pokemon.data.abilities.map((e) => {
      return `${e.ability.name} `;
    }),
    status: pokemon.data.stats.map((e) => {
      return `${e.stat.name}: ${e.base_stat}`;
    }),
    tipos: pokemon.data.types.map((e) => {
      return `${e.type.name}`;
    }),
    sprite_padrao_frente: pokemon.data.sprites.front_default,
    lendario: check_if(especie.data.is_legendary),
    mitico: check_if(especie.data.is_mythical),
    bebe: check_if(especie.data.is_baby),
    evolui: evolution(especie.data),
    evolucao: evolves_to(evoluindo.data.chain.evolves_to[0], pokemon),
  };

  console.log(pokemon_info);
}

pokemon_data();
