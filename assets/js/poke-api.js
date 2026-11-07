const pokeAPI = {};

function capitalizeFirstLetter(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function gendersPokemon(value) {
  let genders = {};

  const valueGenderFemale = Number(value.gender_rate);
  const percentageGenderFemale = (valueGenderFemale / 8) * 100;

  const genderFemalePokemon =
    valueGenderFemale !== -1 ? percentageGenderFemale + "%" : "Gender Unknown";
  const genderMalePokemon =
    valueGenderFemale !== -1
      ? 100 - percentageGenderFemale + "%"
      : "Gender Unknown";

  genders.female = genderFemalePokemon;
  genders.male = genderMalePokemon;

  return genders;
}

function eggGroupsPokemon(value) {
  let eggGroupsName = [];

  let eggGroups = value.egg_groups;

  eggGroupsName = eggGroups.map((eggGroupsSlot) =>
    capitalizeFirstLetter(eggGroupsSlot.name),
  );

  return eggGroupsName;
}

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types; // Array Destructuring

  pokemon.types = types;
  pokemon.type = type;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

function convertPokeApiDetailToPokemonDetails(pokemon, pokemon_species, evolutionData) {
  const pokemonDetails = new PokemonDetails();
  pokemonDetails.number = pokemon.id;
  pokemonDetails.name = pokemon.name;

  //About tab
  const types = pokemon.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types; // Array Destructuring

  pokemonDetails.types = types;
  pokemonDetails.type = type;
  pokemonDetails.photo = pokemon.sprites.other.dream_world.front_default;

  let specie = pokemon_species.genera[7].genus.split(" ");
  specie.pop();

  pokemonDetails.about.specie = specie.join(" ");
  pokemonDetails.about.height = (pokemon.height / 10).toFixed(2);
  pokemonDetails.about.weight = (pokemon.weight / 10).toFixed(1);
  pokemonDetails.about.abilities = pokemon.abilities.map((abilitySlot) =>
    capitalizeFirstLetter(abilitySlot.ability.name),
  );

  pokemonDetails.about.genders = gendersPokemon(pokemon_species);
  pokemonDetails.about.egg_groups = eggGroupsPokemon(pokemon_species);

  //Base Stats tab
  pokemonDetails.base_stats = [];
  pokemon.stats.map((baseStatSlot) => {
    pokemonDetails.base_stats.push({
      statName: capitalizeFirstLetter(baseStatSlot.stat.name),
      base_stat: baseStatSlot.base_stat,
    });
  });

  const totalPoints = pokemonDetails.base_stats
    .map((baseStatSlot) => baseStatSlot.base_stat)
    .reduce((soma, v) => soma + v, 0);

  pokemonDetails.base_stats.push({
    statName: "Total",
    base_stat: totalPoints,
  });

  // Evolution tab
  pokemonDetails.evolution = [];
  let currentEvolution = evolutionData.chain;

  do {
    pokemonDetails.evolution.push(capitalizeFirstLetter(currentEvolution.species.name));
    
    // Avança para a próxima evolução (se existir)
    currentEvolution = currentEvolution.evolves_to[0];
  } while (currentEvolution && currentEvolution.hasOwnProperty('evolves_to'));

  // Moves tab
  const QTD_MOVIMENTOS = 10;
  const listaMovimentosLimitados = pokemon.moves.slice(0, QTD_MOVIMENTOS);
  pokemonDetails.moves = listaMovimentosLimitados.map((moveSlot) => 
    capitalizeFirstLetter(moveSlot.move.name)
  );

  console.log("Dados completos do PokemonDetails:", pokemonDetails);

  return pokemonDetails;
}

pokeAPI.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeAPI.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json()) // Retorna a resposta da API em formato JSON
    .then((jsonBody) => jsonBody.results) // Retorna apenas os resultados dos dados encontrados no JSON
    .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests)) // Lista de Promises (ou seja, uma lista de operações assíncronas)
    .then((pokemonDetails) => pokemonDetails)
    .catch((error) => console.error(error));
};

pokeAPI.getPokemon = async (id) => {
  const cacheKey = `pokemon_${id}`;
  const cachedData = sessionStorage.getItem(cacheKey);

  // Se já existir no cache, retorna direto sem gastar rede
  if (cachedData) {
    return Promise.resolve(JSON.parse(cachedData));
  }
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return fetch(url)
    .then((response) => response.json())
    .then((pokemon) => Promise.all([pokemon, pokeAPI.getPokemonBySpecies(id), pokeAPI.getEvolutionInPokemon(id)]))
    .then(([pokemon, pokemon_species, pokemon_evolution]) => {
      const details = convertPokeApiDetailToPokemonDetails(
        pokemon,
        pokemon_species,
        pokemon_evolution,
      );
      // Salva no cache da sessão
      sessionStorage.setItem(cacheKey, JSON.stringify(details));
      return details;
    })
    .catch((error) => console.error(error));
};

pokeAPI.getPokemonBySpecies = (id) => {
  const cacheKey = `pokemon-species_${id}`;
  const cachedData = sessionStorage.getItem(cacheKey);

  // Se já existir no cache, retorna direto sem gastar rede
  if (cachedData) {
    return Promise.resolve(JSON.parse(cachedData));
  }

  const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
  return fetch(url)
    .then((response) => response.json())
    .then((pokemon) => {
      sessionStorage.setItem(cacheKey, JSON.stringify(pokemon));
      return pokemon;
    })
    .catch((error) => console.error(error));
};

pokeAPI.getEvolutionInPokemon = (id) => {
  const cacheKey = `evolution-pokemon_${id}`;
  const cachedData = sessionStorage.getItem(cacheKey);

  if (cachedData) {
    return Promise.resolve(JSON.parse(cachedData));
  }

  const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

  return fetch(url)
    .then((response) => response.json())
    .then((speciesData) => {
      // Precisamos buscar a URL da cadeia de evolução que vem dentro da espécie
      return fetch(speciesData.evolution_chain.url);
    })
    .then((response) => response.json())
    .then((evolutionData) => {
      // Aqui você processa a árvore de evolução se quiser, ou guarda o objeto bruto
      sessionStorage.setItem(cacheKey, JSON.stringify(evolutionData));
      return evolutionData;
    })
    .catch((error) => console.error(error));
};
