const urlPage = new URLSearchParams(window.location.search);
const pokemonId = urlPage.get('id');

if (pokemonId) {
  loadRecordsOfThePokemonById(pokemonId);
} else {
  backForStart();
}

function backForStart() {
  window.location.href = "/";
}

function loadRecordsOfThePokemonById(id) {
  pokeAPI.getPokemon(id).then((pokemon) => {
    console.log(pokemon);
  })
}