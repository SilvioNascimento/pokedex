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
  const [type] = types;   // Array Destructuring

  pokemon.types = types;
  pokemon.type = type;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
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
