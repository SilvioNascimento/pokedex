function redirectPageToPokemonData(id) {
  window.location.assign("../assets/page/pokemon.html");
  loadRecordsOfThePokemonById(id);
}

function loadRecordsOfThePokemonById(id) {
  pokeAPI.getPokemon(id).then((pokemon) => {
    console.log(pokemon);
  })
}