const urlPage = new URLSearchParams(window.location.search);
const pokemonId = urlPage.get('id');
const pokemonPerfil = document.getElementById("pokemonPerfil");

if (pokemonId) {
  loadRecordsOfThePokemonById(pokemonId);
} else {
  backForStart();
}

function backForStart() {
  window.location.href = "/";
}

function convertPokemonToItemHtml(pokemonDetails) {
  return `
  <div class="pokemon-initial-data">
    <!-- Pokemon Initial Data -->
    <h2>${pokemonDetails.name}</h2>
    <span>${pokemonDetails.number}</span>

    <div class="detail">
      <ol class="types">
        ${pokemonDetails.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
      </ol>

      <img
        src="${pokemonDetails.photo}"
        alt="${pokemonDetails.name}"
      />
    </div>
  </div>

  <div class="pokemon-other-data">
    <!-- Pokemon Other data -->
  </div>
  `;
}

function loadRecordsOfThePokemonById(id) {
  pokemonPerfil.innerHTML = `<div class="loading">Carregando detalhes do Pokémon...</div>`;
  pokeAPI.getPokemon(id).then((pokemon) => {
    const newHtml = convertPokemonToItemHtml(pokemon);
    pokemonPerfil.innerHTML += newHtml;
  });
}
