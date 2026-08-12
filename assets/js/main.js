const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

// async function capitalizeFirstLetter(string) {
//   let word = String(string);
//   let capitalize = word.charAt(0).toUpperCase + word.slice(1);
//   let result = await capitalize;
//   return result;
// }

const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("LoadMoreButton");
const limit = 5;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
      <li class="pokemon">
        <span class="number">#001</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
          <ol class="types">
            <li class="type">Glass</li>
            <li class="type">Poison</li>
          </ol>

          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png"
            alt="${pokemon.name}"
          />
        </div>
      </li>
  `;
}

const pokemonList = document.getElementById('pokemonList');

/*
O Fetch fornece uma definição genérica de objetos de Request e Response (e outras coisas envolvidas com solicitações de rede). Isso permitirá que eles sejam usados onde quer que sejam necessários no futuro, seja para service workers, Cache API e outras coisas similares que manipulam ou modifiquem pedidos e respostas ou qualquer tipo de caso de uso que possa exigir que você gere suas próprias responses programaticamente.
*/
pokeAPI.getPokemons().then((pokemons = []) => {
  
  pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');
  
  //Ou pode substituir a linha 40 por estas linhas de código abaixo (está comentada)
  // const newList = pokemons.map((pokemon) => convertPokemonToLi(pokemon));
  // const newHTML = newList.join('');
  // pokemonList.innerHTML += newHTML;
});
