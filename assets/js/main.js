const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("LoadMoreButton");

let offset = 0;
const limit = 10;
const maxRecords = 151;

function convertPokemonToLi(pokemon) {
  return `
      <li id="pokemon" class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
          <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
          </ol>

          <img
            src="${pokemon.photo}"
            alt="${pokemon.name}"
          />
        </div>
      </li>
  `;
}

function loadPokemonItem(offset, limit) {
  pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;

    //Ou pode substituir a linha 40 por estas linhas de código abaixo (está comentada)
    // const newList = pokemons.map((pokemon) => convertPokemonToLi(pokemon));
    // const newHTML = newList.join('');
    // pokemonList.innerHTML += newHTML;
  });
}

loadPokemonItem(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;

  let qtdRecordNexPage = offset + limit;

  if (qtdRecordNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItem(offset, newLimit);

    loadMoreButton.parentElement.remove(loadMoreButton)
  } else {
    loadPokemonItem(offset, limit);
  }

});
