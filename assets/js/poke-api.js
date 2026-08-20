const pokeAPI = {};

// function capitalizeFirstLetter(string) {
//   if (!string) return '';
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }

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

function convertPokeApiDetailToPokemonDetails(pokemon) {
  const pokemonDetails = new PokemonDetails();
  pokemonDetails.number = pokemon.id;
  pokemonDetails.name = pokemon.name;

  const types = pokemon.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;   // Array Destructuring

  pokemonDetails.types = types;
  pokemonDetails.type = type;
  pokemonDetails.photo = pokemon.sprites.other.dream_world.front_default;

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

pokeAPI.getPokemon = (id) => {
  const cacheKey = `pokemon_${id}`;
  const cachedData = sessionStorage.getItem(cacheKey);

  // Se já existir no cache, retorna direto sem gastar rede
  if (cachedData) {
    return Promise.resolve(JSON.parse(cachedData));
  }
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return fetch(url)
    .then((response) => response.json())
    .then((pokemon) => {
      const details = convertPokeApiDetailToPokemonDetails(pokemon);
      // Salva no cache da sessão
      sessionStorage.setItem(cacheKey, JSON.stringify(details));
      return details;
    })
    .catch((error) => console.error(error));
};
