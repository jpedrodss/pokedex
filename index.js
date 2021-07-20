import axios from "axios";

// Procura o pokemon
axios
  .get("https://pokeapi.co/api/v2/pokemon/caterpie")
  .then((response) => {
    const pokemon = response.data;
    // Mostra o nome
    console.log(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1));

    // Id do pokemon
    console.log(`ID do Pokemon: ${pokemon.id}`);

    // Mostra os moves
    console.log("Moves: ");
    pokemon.moves.forEach((e) => {
      console.log(`\tNome do movimento: ${e.move.name}`);
    });

    // Mostra as habilidades
    console.log("Habilidades: ");
    pokemon.abilities.forEach((e) => {
      console.log(`\tNome da habilidade: ${e.ability.name}`);
    });

    // Mostra os status
    console.log("Status base: ");
    pokemon.stats.forEach((e) => {
      console.log(`\t${e.stat.name}: ${e.base_stat}`);
    });

    // Experiência base
    console.log(`Exp base: ${pokemon.base_experience}`);

    // Mostra o peso
    console.log(`Peso: ${(pokemon.weight * 10) / 100}kg`);

    // Mostra a altura
    console.log(`Altura: ${(pokemon.height * 10) / 100}m`);

    // Mostra se é lendário
    console.log("É lendário? ");
    if (pokemon.is_legendary) {
      console.log("\tSim");
    } else {
      console.log("\tNão");
    }

    // Mostra se é mítico
    console.log("É mítico? ");
    if (pokemon.is_mythical) {
      console.log("\tSim");
    } else {
      console.log("\tNão");
    }

    // Mostra se é bebê
    console.log("É bebê? ");
    if (pokemon.is_baby) {
      console.log("\tSim");
    } else {
      console.log("\tNão");
    }

    // Tipos
    console.log("Tipo: ");
    pokemon.types.forEach((e) => {
      console.log(
        `\t${e.type.name.charAt(0).toUpperCase() + e.type.name.slice(1)}`
      );
    });

    // Mostra a espécie
    console.log(
      `Espécie: ${
        pokemon.species.name.charAt(0).toUpperCase() +
        pokemon.species.name.slice(1)
      }`
    );

    // Pega a espécie do pokemon
    axios
      .get(pokemon.species.url)
      .then((response) => {
        const evolucao = response.data;

        // Mostra de quem evolui
        if (evolucao.evolves_from_species) {
          console.log(
            `Evolui de: ${
              evolucao.evolves_from_species.name.charAt(0).toUpperCase() +
              evolucao.evolves_from_species.name.slice(1)
            }`
          );
        } else {
          console.log("Esta é a primeira evolução.");
        }

        // Pega as próximas evoluções
        axios
          .get(evolucao.evolution_chain.url)
          .then((response) => {
            let evoluindo = response.data;

            // Se houver próximas evoluções
            if (evoluindo.chain.evolves_to[0]) {
              if (evoluindo.chain.evolves_to[0].species.name !== pokemon.name) {
                // Mostra a segunda evolução
                console.log("Segunda evolução: ");
                console.log(
                  "\t" +
                  evoluindo.chain.evolves_to[0].species.name
                  .charAt(0)
                  .toUpperCase() +
                  evoluindo.chain.evolves_to[0].species.name.slice(1)
                  );
                }
                if (evoluindo.chain.evolves_to[0].evolves_to[0]) {
                // Mostra a terceira evolução
                if (
                  evoluindo.chain.evolves_to[0].evolves_to[0].species.name !==
                  pokemon.name
                ) {
                  console.log("Terceira evolução: ");
                  console.log(
                    "\t" +
                      evoluindo.chain.evolves_to[0].evolves_to[0].species.name
                        .charAt(0)
                        .toUpperCase() +
                      evoluindo.chain.evolves_to[0].evolves_to[0].species.name.slice(
                        1
                      )
                  );
                } else {
                  console.log("Evolução máxima!");
                }
              }
            } else {
              console.log("Evolução máxima!");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => console.log(error));
  })
  .catch((error) => console.log(error));
