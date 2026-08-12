const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("LoadMoreButton");
const limit = 5;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
      <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
          <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type.toLowerCase()}">${type}</li>`).join("")}
          </ol>

          <img
            src="${pokemon.photo}"
            alt="${pokemon.name}"
          />
        </div>
      </li>
  `;
}

/*
O Fetch fornece uma definição genérica de objetos de Request e Response (e outras coisas envolvidas com solicitações de rede). Isso permitirá que eles sejam usados onde quer que sejam necessários no futuro, seja para service workers, Cache API e outras coisas similares que manipulam ou modifiquem pedidos e respostas ou qualquer tipo de caso de uso que possa exigir que você gere suas próprias responses programaticamente.
*/

function loadPokemonItem(offset, limit) {
  pokeAPI.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join("");

    //Ou pode substituir a linha 40 por estas linhas de código abaixo (está comentada)
    // const newList = pokemons.map((pokemon) => convertPokemonToLi(pokemon));
    // const newHTML = newList.join('');
    // pokemonList.innerHTML += newHTML;
  });
}

loadMoreButton.addEventListener('click', () => {
  loadPokemonItem()
})
